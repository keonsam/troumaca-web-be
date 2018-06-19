import Rx from "rxjs";
import validator from 'validator';
import libphonenumberjs from 'libphonenumber-js';
import PasswordValidator from 'password-validator';
import {generateUUID} from "../../../uuid.generator";
import {Credential} from "../credential";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {CredentialStatus} from "../credential.status"
import {credentialConfirmations, credentials} from "../../../db";
import {CredentialRepository} from "../credential.repository";
import {Result} from "../../../result.success";
import {CredentialConfirmation} from "../confirmation/credential.confirmation";
import phoneToken from "generate-sms-verification-code";
import {ValidatedUsername} from "../confirmation/validated.username";

export class CredentialRepositoryNeDbAdapter implements CredentialRepository {

  isValidUsername(username:string):Observable<boolean> {
    if (!username) {
      return Rx.Observable.of(false);
    }


    // the user name is valid if:
    let validUsername:boolean = false;
    // 1. is username and email
    let validEmail:boolean = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      let parsedObj:any = libphonenumberjs.parse(username, 'US');
      if (parsedObj && parsedObj.phone) {
        // 2. or username is a phone number
        validUsername = libphonenumberjs.isValidNumber(parsedObj);
      }
    }

    if (!validUsername) {
      // 3. and is not taken
      return Rx.Observable.of(false);
    } else {
      return this.getCredentialByUsername(username)
        .map(credential => {
          if (!credential) {
            return false;
          } else {
            return !credential.username;
          }
        });
    }
  };

  isValidEditUsername(partyId: string,username:string):Observable<boolean> {
    if (!username) {
      return Rx.Observable.of(false);
    }


    // the user name is valid if:
    let validUsername:boolean = false;
    // 1. is username and email
    let validEmail:boolean = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      let parsedObj:any = libphonenumberjs.parse(username, 'US');
      if (parsedObj && parsedObj.phone) {
        // 2. or username is a phone number
        validUsername = libphonenumberjs.isValidNumber(parsedObj);
      }
    }

    if (!validUsername) {
      // 3. and is not taken
      return Rx.Observable.of(false);
    } else {
      return this.checkUsernameValid(partyId, username)
        .switchMap(value => {
          if (value) {
            return Rx.Observable.of(true);
          } else {
            return this.getCredentialByUsername(username)
              .map(credential => {
                if (!credential) {
                  return true;
                } else if (!credential.username) {
                  return true;
                } else {
                  return false;
                }
              });
          }
        });
    }
  };

  isValidPassword(password:string):Observable<boolean> {
    if (!password) {

      return Rx.Observable.of(false);

    } else {
      // Create a schema
      let schema:any = new PasswordValidator();

      // Add properties to it
      schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

      return Rx.Observable.of(schema.validate(password));
    }

  };

  getCredentialByUsername(username:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "username":username
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getSanitizeCredentialByUsername(username:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "username":username
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          delete doc.password;
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  authenticate(credential: Credential): Observable<Result<Credential>> {
    return this.getCredentialByUsername(credential.username)
      .map((resultCred:Credential) => {
        if (!resultCred) {
          return new Result(true, );
        } else if (resultCred.password === credential.password) {
          return new Result(false, "", resultCred);
        } else {
          return new Result(true, "", resultCred);
        }
      });
  }

  getCredentialByCredentialId(credentialId:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query = {
        "credentialId":credentialId
      };

      credentials.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };


  checkUsernameValid(partyId:string, username:string):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query1 = {
        "partyId":partyId
      };

      let query2 = {
        "username":username
      };


      credentials.findOne({$and : [query1,query2]}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addCredentialLocal(credential:Credential):Observable<Credential> {
    credential.credentialId = generateUUID();
    if(!credential.credentialStatus){
      credential.credentialStatus = CredentialStatus.NEW;
    }
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      credentials.insert(credential, function (err:any, doc:any) {
        if (!err) {
          observer.next(credential);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addCredential(credential:Credential, options?:any):Observable<CredentialConfirmation> {
    return this.addCredentialLocal(credential)
      .switchMap(credential => {
        let credentialConfirmation:CredentialConfirmation = new CredentialConfirmation();

        credentialConfirmation.credentialId = credential.credentialId;
        credentialConfirmation.createdOn = new Date();
        credentialConfirmation.modifiedOn = new Date();

        return this.addCredentialConfirmationLocal(credentialConfirmation);
      });
  };

  addCredentialConfirmationLocal(credentialConfirmation:CredentialConfirmation):Observable<CredentialConfirmation> {
    credentialConfirmation.credentialConfirmationId = generateUUID();
    credentialConfirmation.confirmationCode = phoneToken(6, {type: 'string'});
    credentialConfirmation.credentialStatus = CredentialStatus.NEW;

    let newCredentialConfirmation = credentialConfirmation.toJson();
    console.log(newCredentialConfirmation);
    return Rx.Observable.create(function (observer:Observer<CredentialConfirmation>) {
      credentialConfirmations.insert(newCredentialConfirmation, function (err:any, doc:any) {
        if (!err) {
          //delete doc._id;
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addUserCredential(credential:Credential):Observable<Credential> {
    // done for the toJson().
    credential.credentialId = generateUUID();
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      credentials.insert(credential.toJson(), function (err:any, doc:any) {
        if (!err) {
          observer.next(credential);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  authenticateCredential(credential:Credential):Observable<Credential> {
    return Rx.Observable.create(function (observer:Observer<Credential>) {
      let query1 = {
        "username":credential.username
      };
      let query2 = {
        "password":credential.password
      };

      credentials.findOne({$and : [query1, query2]}, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateCredential(partyId: string, credential: Credential): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      if(!credential.password) {
        delete credential.password;
      }
      let query:any = {
        "partyId":partyId
      };

      credentials.update(query, {$set : credential}, {}, function (err, numReplaced) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }


  updateCredentialStatusById(credentialId:string, credentialStatus:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialId":credentialId
      };

      credentials.update(query, {$set: {credentialStatus}}, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateCredentialPartyId(credentialId: string, partyId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "credentialId":credentialId
      };
      credentials.update(query, {$set : {partyId}}, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  deleteCredentialByPartyId(partyId:string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        partyId
      };

      credentials.remove(query, {multi:true}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });

  }

}
