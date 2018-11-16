import {ConfirmationRepository} from "../../repository/confirmation.repository";
import {generateUUID} from "../../uuid.generator";
import phoneToken from "generate-sms-verification-code";
import {credentialConfirmations, credentials} from "../../db";
import {Confirmation} from "../../data/authentication/confirmation";
import {Observable, Observer, of, throwError} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {factory} from "../../ConfigLog4j";

const log = factory.getLogger("authentication.ConfirmationRepositoryNeDbAdapter");

export class ConfirmationRepositoryNeDbAdapter implements ConfirmationRepository {

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

  confirmCode(confirmationId: string, credentialId: string, confirmation: Confirmation, options?: any): Observable<Confirmation> {
    return this.verifyCode(confirmationId, confirmation.code)
      .pipe(switchMap((confirmationRes: Confirmation) => {
        log.debug("Confirmation: " + confirmationRes);
        if (!confirmationRes || confirmationRes.status === "Expired" || confirmationRes.status === "Confirmed") {
          return of(confirmation);
        } else if (new Date(confirmationRes.createdOn.getTime() + (20 * 60000)) < new Date()) {
          return this.updateConfirmationStatus(credentialId, "Expired")
            .pipe(map(numRep => {
              if (!numRep) {
                throw new Error(`ConfirmCode Error. Failed to update confirmation status ${numRep}`);
              } else {
                confirmationRes.status = "Expired";
                return confirmationRes;
              }
            }));
        } else {
          return this.updateConfirmationStatus(credentialId, "Confirmed")
            .pipe(switchMap(numReplaced => {
              log.debug("Number update: " + numReplaced);
              if (!numReplaced) {
                return throwError(undefined);
              } else {
                return this.updateCredentialStatusById(credentialId, "Confirmed")
                  .pipe(map(numReplaced1 => {
                    log.debug("Number update: " + numReplaced);
                    if (!numReplaced1) {
                      throw new Error("credential not updated");
                    } else {
                      confirmationRes.status = "Confirmed";
                      return confirmationRes;
                    }
                  }));
              }
            }));
        }
      }));
  }

  resendConfirmCodeByUsername(username: string, options?: any): Observable<Confirmation> {
    throw new Error();
  }

  // USED BY OTHER REPO

  addConfirmation(confirmation: Confirmation): Observable<Confirmation> {
    confirmation.confirmationId = generateUUID();
    confirmation.code = phoneToken(6, {type: "string"});
    confirmation.status = "New";
    confirmation.createdOn = new Date();
    confirmation.modifiedOn = new Date();
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

  getConfirmationByCredentialId(credentialId: string, status: string): Observable<Confirmation> {
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

  // HELPERS

  updateConfirmationStatus(credentialId: string, status: string): Observable<number> {
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

  verifyCode(confirmationId: string, code: string): Observable<Confirmation> {
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

  updateCredentialStatusById(credentialId: string, status: string): Observable<number> {
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

}
