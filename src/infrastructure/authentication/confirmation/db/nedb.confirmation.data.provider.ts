import {ConfirmationDataProvider} from "../../../../port/confirmation.data.provider";
import {generateUUID} from "../../../../uuid.generator";
import phoneToken from "generate-sms-verification-code";
import {credentialConfirmations, credentials} from "../../../../db";
import {Confirmation} from "../../../../domain/model/authentication/confirmation";
import {Observable, Observer, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {factory} from "../../../../ConfigLog4j";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { ConfirmationRequest } from "../../../../domain/model/authentication/request/confirmation.request";

const log = factory.getLogger("authentication.NedbConfirmationDataProvider");

export class NedbConfirmationDataProvider implements ConfirmationDataProvider {

    constructor() {
    }

    resendConfirmCode(confirmationId: string, credentialId: string, options?: any): Observable<Confirmation> {
      return this.getConfirmationByCredentialId(credentialId, "Confirmed")
        .pipe(switchMap(confirmation => {
          if (confirmation) {
            return of(confirmation);
          } else {
            return this.updateConfirmationStatus(credentialId, "Expired")
              .pipe(switchMap(numReplaced => {
                if (!numReplaced) {
                  return throwError(undefined);
                } else {
                  const confirmation: Confirmation = new Confirmation();
                  confirmation.credentialId = credentialId;
                  return this.addConfirmation(confirmation);
                }
              }));
          }
        }));
    }

    confirmCode(confirmationRequest: ConfirmationRequest, options?: HeaderBaseOptions): Observable<string> {
        return this.verifyCode(confirmationRequest.confirmationId, confirmationRequest.code)
            .pipe(switchMap((confirmationRes: Confirmation) => {
                log.debug("Confirmation: " + confirmationRes);
                return of("");
                // if (!confirmationRes || confirmationRes.status === "Expired" || confirmationRes.status === "Confirmed") {
                //     return of(confirmationRes.status);
                // } else if (new Date(confirmationRes.createdOn.getTime() + (20 * 60000)) < new Date()) {
                //     return this.updateConfirmationStatus(confirmationRequest.credentialId, "Expired")
                //         .pipe(map(numRep => {
                //             if (!numRep) {
                //                 throw new Error(`ConfirmCode Error. Failed to update confirmation status ${numRep}`);
                //             } else {
                //                 confirmationRes.status = "Expired";
                //                 return confirmationRes.status;
                //             }
                //         }));
                // } else {
                //     return this.updateConfirmationStatus(confirmationRequest.credentialId, "Confirmed")
                //         .pipe(switchMap(numReplaced => {
                //             log.debug("Number update: " + numReplaced);
                //             if (!numReplaced) {
                //                 return throwError(undefined);
                //             } else {
                //                 return this.updateCredentialStatusById(confirmationRequest.credentialId, "Confirmed")
                //                     .pipe(map(numReplaced1 => {
                //                         log.debug("Number update: " + numReplaced);
                //                         if (!numReplaced1) {
                //                             throw new Error("credential not updated");
                //                         } else {
                //                             confirmationRes.status = "Confirmed";
                //                             return confirmationRes.status;
                //                         }
                //                     }));
                //             }
                //         }));
                // }
            }));
    }

    private updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "credentialId": credentialId
            };

            credentials.update(query, {
                $set: {
                    status: status,
                    modifiedOn: new Date()
                }
            }, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private verifyCode(confirmationId: string, code: string): Observable<Confirmation> {
        return Observable.create(function (observer: Observer<Confirmation>) {
            const query = {
                "confirmationId": confirmationId,
                "code": code
            };

            credentialConfirmations.findOne(query, function (err: any, doc: Confirmation) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private updateConfirmationStatus(credentialId: string, status: string): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            const query = {
                "credentialId": credentialId
            };
            credentialConfirmations.update(query, {
                $set: {
                    status: status,
                    modifiedOn: new Date()
                }
            }, {multi: true}, (err: any, numReplaced: number) => {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private addConfirmation(confirmation: Confirmation): Observable<Confirmation> {
        confirmation.confirmationId = generateUUID();
        confirmation.code = phoneToken(6, {type: "string"});
        // confirmation.status = "New";
        // confirmation.createdOn = new Date();
        // confirmation.modifiedOn = new Date();
        return Observable.create(function (observer: Observer<Confirmation>) {
            credentialConfirmations.insert(confirmation, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getConfirmationByCredentialId(credentialId: string, status: string): Observable<Confirmation> {
        return Observable.create((observer: Observer<Confirmation>) => {
            const query = {
                "credentialId": credentialId,
                "status": status
            };

            credentialConfirmations.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation> {
    //     return this.getCredentialByUsername(username)
    //         .pipe( switchMap( credential => {
    //             if (!credential) {
    //                 return throwError(`No credential found. ${credential}`);
    //             } else {
    //                 const confirmation: Confirmation = new Confirmation();
    //                 confirmation.credentialId = credential.credentialId;
    //                 return this.addConfirmation(confirmation)
    //                     .pipe(map(confirmation => {
    //                         if (!confirmation) {
    //                             throw new Error("Confirmation failed to be created.");
    //                         } else {
    //                             return confirmation;
    //                         }
    //                     }));
    //             }
    //         }));
    // }

    // USED BY OTHER REPO

    // HELPERS

    // private getCredentialByUsername(username: string): Observable<Credential> {
    //     return Observable.create(function (observer: Observer<Credential>) {
    //         const query = {
    //             "username": username
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

    // validateCode(credentialId: string, code: string, options?: any): Observable<boolean> {
    //     return undefined;
    // }

}
