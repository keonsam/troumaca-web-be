import validator from "validator";
import libphonenumberjs from "libphonenumber-js";
import PasswordValidator from "password-validator";
import { generateUUID } from "../../uuid.generator";
import { Credential } from "../../data/credential";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { credentials } from "../../db";
import { CredentialRepository } from "../../repository/credential.repository";
import { AuthenticatedCredential } from "../../data/authenticated.credential";
import "rxjs/add/observable/of";
import { Confirmation } from "../../data/confirmation";
import { ConfirmationRepositoryNeDbAdapter } from "../confirmation/confirmation.repository.db.adapter";
import { CreatedCredential } from "../../data/created.credential";

export class CredentialRepositoryNeDbAdapter implements CredentialRepository {

  private confirmationRepositoryNeDbAdapter: ConfirmationRepositoryNeDbAdapter = new ConfirmationRepositoryNeDbAdapter();

  isValidUsername(username: string, partyId: string): Observable<boolean> {
    if (!username) {
      return Observable.of(false);
    }

    // the user name is valid if:
    let validUsername: boolean = false;
    // 1. is username and email
    const validEmail: boolean = validator.isEmail(username);

    if (validEmail) {
      validUsername = true;
    } else {
      const parsedObj: any = libphonenumberjs.parse(username, "US");
      if (parsedObj && parsedObj.phone) {
        // 2. or username is a phone number
        validUsername = libphonenumberjs.isValidNumber(parsedObj);
      }
    }

    if (!validUsername) {
      // 3. and is not taken
      return Observable.of(false);
    } else {
      return this.getCredentialByUsername(username)
        .map(credential => {
          if (!credential) {
            return true;
          } else if (credential.partyId === partyId) {
            return true;
          } else {
              return false;
          }
        });
    }
  }

  isValidPassword(password: string): Observable<boolean> {
    if (!password) {

      return Observable.of(false);

    } else {
      // Create a schema
      const schema: any = new PasswordValidator();

      // Add properties to it
      schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits()                                 // Must have digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist these values

      return Observable.of(schema.validate(password));
    }

  }

  addCredential(credential: Credential, options?: any): Observable<CreatedCredential> {
      return this.addCredentialLocal(credential)
          .switchMap(credential => {
              const confirmation: Confirmation = new Confirmation();

              confirmation.credentialId = credential.credentialId;

              return this.confirmationRepositoryNeDbAdapter.addConfirmation(confirmation)
                  .map(confirmation => {
                     return {credential, confirmation};
                  });
          });
  }

  authenticate(credential: Credential, options?: any): Observable<AuthenticatedCredential> {
    return this.verifyCredential(credential.username, credential.password)
    .switchMap((credential: Credential) => {
      if (!credential) {
        return Observable.of(undefined);
      } else {
          const authenticatedCredential: AuthenticatedCredential = new AuthenticatedCredential();
          const credentialId = credential.credentialId;
          authenticatedCredential.username = credential.username;
          authenticatedCredential.credentialId = credentialId;
          authenticatedCredential.partyId = credential.partyId;
          if (credential.status === "Active") {
              authenticatedCredential.authenticateStatus = "AccountActive";
              return Observable.of(authenticatedCredential);
          } else if (credential.status === "Confirmed") {
              authenticatedCredential.authenticateStatus = "AccountConfirmed";
              return Observable.of(authenticatedCredential);
          } else if (credential.status === "New") {
              return this.confirmationRepositoryNeDbAdapter.getConfirmationByCredentialId(credentialId, "New")
                  .map((confirmation: Confirmation) => {
                      // TODO: ADD ERROR HANDLING THIS SHOULD TEST AND GENERATE A NEW CONFIRMATION IF NECESSARY
                      authenticatedCredential.confirmationId = confirmation.confirmationId;
                      authenticatedCredential.authenticateStatus = "AccountUsernameNotConfirmed";
                      return authenticatedCredential;
                  });
          }
      }
    });
  }

  updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
      return Observable.create(function (observer: Observer<number>) {
          const query = {
              "credentialId": credentialId
          };

          credentials.update(query, {$set: {status: status}}, {}, function (err: any, numReplaced: number) {
              if (!err) {
                  observer.next(numReplaced);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  // checkUsernameValid(partyId:string, username:string):Observable<Credential> {
  //   return Observable.create(function (observer:Observer<Credential>) {
  //     let query1 = {
  //       "partyId":partyId
  //     };
  //
  //     let query2 = {
  //       "username":username
  //     };
  //
  //
  //     credentials.findOne({$and : [query1,query2]}, function (err:any, doc:any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  // authenticateCredential(credential:Credential):Observable<Credential> {
  //   return Observable.create(function (observer:Observer<Credential>) {
  //     let query1 = {
  //       "username":credential.username
  //     };
  //     let query2 = {
  //       "password":credential.password
  //     };
  //
  //     credentials.findOne({$and : [query1, query2]}, function (err:any, doc:any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  // USED BY OTHER REPO

    getCredentialByPartyIds(partyIds: string[]): Observable<Credential[]> {
      return Observable.create( (observer: Observer<Credential[]>) => {
          const query = {partyId: {$in: partyIds} };
          credentials.find(query, (err: any, docs: any) => {
              if (!err) {
                  observer.next(docs);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
    }

    getCredentialByPartyId(partyId: string): Observable<Credential> {
        return Observable.create( (observer: Observer<Credential>) => {
            const query = {partyId: partyId };
            credentials.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

  // getCredentialByCredentialId(credentialId: string): Observable<Credential> {
  //     return Observable.create(function (observer: Observer<Credential>) {
  //         const query = {
  //             "credentialId": credentialId
  //         };
  //
  //         credentials.findOne(query, function (err: any, doc: any) {
  //             if (!err) {
  //                 observer.next(doc);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }
  //
  // addUserCredential(credential: Credential): Observable<Credential> {
  //     // done for the toJson().
  //     credential.credentialId = generateUUID();
  //     return Observable.create(function (observer: Observer<Credential>) {
  //         credentials.insert(credential.toJson(), function (err: any, doc: any) {
  //             if (!err) {
  //                 observer.next(credential);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }

  // updateCredential(partyId: string, credential: Credential): Observable<number> {
  //     return Observable.create(function (observer: Observer<number>) {
  //         if (!credential.password) {
  //             delete credential.password;
  //         }
  //         const query: any = {
  //             "partyId": partyId
  //         };
  //
  //         credentials.update(query, {$set : credential}, {}, function (err, numReplaced) {
  //             if (!err) {
  //                 observer.next(numReplaced);
  //             } else {
  //                 observer.error(err);
  //             }
  //             observer.complete();
  //         });
  //     });
  // }

  // updateCredentialPartyId(credentialId: string, partyId: string): Observable<number> {
  //       return Observable.create(function (observer: Observer<number>) {
  //           const query = {
  //               "credentialId": credentialId
  //           };
  //           credentials.update(query, {$set : {partyId}}, {}, function (err: any, numReplaced: number) {
  //               if (!err) {
  //                   observer.next(numReplaced);
  //               } else {
  //                   observer.error(err);
  //               }
  //               observer.complete();
  //           });
  //       });
  //   }
  //
  // deleteCredentialByPartyId(partyId: string): Observable<number> {
  //       return Observable.create(function (observer: Observer<number>) {
  //           const query = {
  //               partyId
  //           };
  //
  //           credentials.remove(query, {multi: true}, function (err: any, numRemoved: number) {
  //               if (!err) {
  //                   observer.next(numRemoved);
  //               } else {
  //                   observer.error(err);
  //               }
  //               observer.complete();
  //           });
  //       });
  //   }
  //
  // deleteCredentialById(credentialId: string, options?: any): Observable<number> {
  //       return Observable.create(function (observer: Observer<AuthenticatedCredential>) {
  //           observer.error(new Error(""));
  //           observer.complete();
  //       });
  //   }

  // HELPERS

  getCredentialByUsername(username: string): Observable<Credential> {
      return Observable.create(function (observer: Observer<Credential>) {
          const query = {
              "username": username
          };

          credentials.findOne(query, function (err: any, doc: any) {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  verifyCredential(username: string, password: string): Observable<Credential> {
      return Observable.create( (observer: Observer<Credential> ) => {
          const query = {
              "username": username,
              "password": password
          };
          credentials.findOne(query, (err: any, doc: any) => {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  addCredentialLocal(credential: Credential): Observable<Credential> {
      credential.credentialId = generateUUID();
      credential.partyId = generateUUID();
      if (!credential.status) {
          credential.status = "New";
      }
      return Observable.create(function (observer: Observer<Credential>) {
          credentials.insert(credential, function (err: any, doc: any) {
              if (!err) {
                  observer.next(credential);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

}
