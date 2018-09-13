import { ConfirmationRepository } from "../../repository/confirmation.repository";
import { generateUUID } from "../../uuid.generator";
import phoneToken from "generate-sms-verification-code";
import { credentialConfirmations, credentials } from "../../db";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Confirmation } from "../../data/authentication/confirmation";

export class ConfirmationRepositoryNeDbAdapter implements ConfirmationRepository {

  constructor() {
  }

  resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation> {
      return this.getConfirmationByCredentialId(credentialId, "Confirmed")
          .switchMap( confirmation => {
             if (confirmation) {
                 return Observable.of(undefined);
             } else {
                 return this.updateConfirmationStatus(credentialId, "Expired")
                     .switchMap( numReplaced => {
                         if (!numReplaced) {
                             return Observable.of(undefined);
                         } else {
                             const confirmation: Confirmation = new Confirmation();
                             confirmation.credentialId = credentialId;
                             return this.addConfirmation(confirmation);
                         }
                     });
             }
          });
  }

  confirmCode(confirmationId: string, credentialId: string, confirmation: Confirmation , options?: any): Observable<Confirmation> {
      return this.verifyCode(confirmationId, confirmation.code)
          .switchMap(confirmation => {
              console.log(confirmation);
              if (!confirmation) {
                  return Observable.of(confirmation);
              } else {
                  return this.updateConfirmationStatus(credentialId, "Confirmed")
                      .switchMap( numReplaced => {
                          console.log(numReplaced);
                         if (!numReplaced) {
                             return Observable.of(undefined);
                         } else {
                             return this.updateCredentialStatusById(credentialId, "Confirmed")
                                 .map( numReplaced1 => {
                                     console.log(numReplaced1);
                                     if (!numReplaced1) {
                                       return undefined;
                                     } else {
                                       return confirmation;
                                     }
                                 });
                         }
                      });
              }
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
            credentialConfirmations.insert(confirmation.toJson(), function (err: any, doc: any) {
                if (!err) {
                    console.log(doc);
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

  getConfirmationByCredentialId(credentialId: string, status: string): Observable<Confirmation> {
      return Observable.create( (observer: Observer<Confirmation>) => {
          const query = {
              "credentialId": credentialId,
              "status": status
          };

          credentialConfirmations.findOne(query,  (err: any, doc: any) => {
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

    updateConfirmationStatus(credentialId: string , status: string): Observable<number> {
    return Observable.create( (observer: Observer<number>) => {
      const query = {
        "credentialId": credentialId
      };
      credentialConfirmations.update(query, {$set: {status: status}}, {multi: true}, (err: any, numReplaced: number) => {
          if (!err) {
              observer.next(numReplaced);
          } else {
              observer.error(err);
          }
          observer.complete();
      });
    });
  }

  verifyCode(confirmationId: string , code: string): Observable<Confirmation> {
      return Observable.create(function (observer: Observer<Confirmation>) {
          const query = {
              "confirmationId": confirmationId,
              "code": code
          };

          credentialConfirmations.findOne(query, function (err: any, doc: any) {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
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

}
