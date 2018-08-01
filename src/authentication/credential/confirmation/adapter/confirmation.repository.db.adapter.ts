import {ConfirmationRepository} from "../confirmation.repository";
import {generateUUID} from "../../../../uuid.generator";
import phoneToken from "generate-sms-verification-code";
import {credentialConfirmations} from "../../../../db";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import { Confirmation } from "../confirmation";

export class ConfirmationRepositoryNeDbAdapter implements ConfirmationRepository {

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation> {
      return this.expireConfirmation(credentialId)
          .switchMap( numReplaced => {
              if (!numReplaced) {
                  return Observable.throw(numReplaced);
              } else {
                  const confirmation: Confirmation = new Confirmation();
                  confirmation.credentialId = credentialId;
                  return this.addConfirmation(confirmation);
              }
          });
  }

  confirmCode(confirmationId:string, credentialId:string, confirmation: Confirmation ,options?:any):Observable<Confirmation> {
      return Observable.create(function (observer:Observer<Confirmation>) {
          const query = {
              "confirmationId": confirmationId,
              "code": confirmation.code
          };

          credentialConfirmations.findOne(query, function (err:any, doc:any) {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  // getCredentialConfirmationById(credentialConfirmationId:string):Observable<CredentialConfirmation> {
  //   return Observable.create(function (observer:Observer<CredentialConfirmation>) {
  //     let query = {
  //       "credentialConfirmationId":credentialConfirmationId
  //     };
  //
  //     credentialConfirmations.findOne(query, function (err:any, doc:any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  // updateCredentialConfirmation(credentialConfirmation:CredentialConfirmation):Observable<number> {
  //   return Observable.create(function (observer:Observer<number>) {
  //     let query = {
  //       "credentialConfirmationId":credentialConfirmation.credentialConfirmationId
  //     };
  //
  //     credentialConfirmation.modifiedOn = new Date();
  //     credentialConfirmations.update(query, credentialConfirmation, {}, function (err:any, numReplaced:number) {
  //       if (!err) {
  //         observer.next(numReplaced);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // };

  // getConfirmedConfirmation(credentialId:string):Observable<CredentialConfirmation> {
  //   return Observable.create(function (observer:Observer<CredentialConfirmation>) {
  //     let query1 = {
  //       "credentialId":credentialId
  //     };
  //     let query2 = {
  //       "credentialStatus": CredentialStatus.CONFIRMED
  //     };
  //
  //     credentialConfirmations.findOne({$and : [query1,query2]}, function (err:any, doc:any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // USED BY OTHER REPO

    addConfirmation(confirmation: Confirmation): Observable<Confirmation> {
        confirmation.confirmationId = generateUUID();
        confirmation.code = phoneToken(6, {type: "string"});
        confirmation.status = "New";
        confirmation.createdOn = new Date();
        confirmation.modifiedOn = new Date();
        return Observable.create(function (observer: Observer<Confirmation>) {
            credentialConfirmations.insert(confirmation.toJson(), function (err:any, doc:any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    };

  getConfirmationByCredentialId(credentialId:string): Observable<Confirmation> {
      return Observable.create( (observer: Observer<Confirmation>) => {
          let query = {
              "credentialId": credentialId,
              "status": "New"
          };

          credentialConfirmations.findOne(query,  (err:any, doc:any) => {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  // HELPERS

  expireConfirmation(credentialId: string): Observable<number> {
    return Observable.create( (observer: Observer<number>) => {
      const query = {
        "credentialId": credentialId
      };
      credentialConfirmations.update(query, {$set: {status: "Expire"}}, {multi: true}, (err:any, numReplaced:number) => {
          if (!err) {
              observer.next(numReplaced);
          } else {
              observer.error(err);
          }
          observer.complete();
      });
    });
  }

}
