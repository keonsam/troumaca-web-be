import {createCredentialConfirmationRepositoryFactory} from "./confirmation.repository.factory";
import {ConfirmationRepository} from "./confirmation.repository";
import {Observable} from "rxjs/Observable";
import { Confirmation } from "./confirmation";

export class ConfirmationOrchestrator {

  private confirmationRepository:ConfirmationRepository;

  constructor() {
    this.confirmationRepository = createCredentialConfirmationRepositoryFactory();
  }

  confirmCode(confirmationId:string, credentialId:string, confirmation: Confirmation, options?:any):Observable<Confirmation> {
    return this.confirmationRepository.confirmCode(confirmationId, credentialId, confirmation, options);
  }

  resendConfirmCode(confirmationId:string, credentialId:string, options?:any):Observable<Confirmation> {
    return this.confirmationRepository.resendConfirmCode(confirmationId, credentialId, options);
  }

  // getConfirmationsUsername(credentialConfirmationId:string):Observable<string> {
  //   return this.confirmationRepository.getCredentialConfirmationById(credentialConfirmationId)
  //     .switchMap((credentialConfirmation:CredentialConfirmation) => {
  //       if(!credentialConfirmation) {
  //         return Rx.Observable.throw(this.createNotFoundError("CredentialConfirmation"));
  //       }else {
  //        return this.credentialRepository.getCredentialByCredentialId(credentialConfirmation.credentialId)
  //          .map((credential:Credential) => {
  //            if(!credential) {
  //              return this.createNotFoundError("CredentialConfirmation");
  //            }else {
  //              return credential.username;
  //            }
  //          });
  //       }
  //     });
  // }

  // sessionExpired(credentialConfirmation:CredentialConfirmation): Observable<Result<CredentialConfirmation>> {
  //   credentialConfirmation.credentialStatus = CredentialStatus.EXPIRED;
  //   return this.confirmationRepository.updateCredentialConfirmation(credentialConfirmation)
  //     .switchMap(numReplaced => {
  //       if(numReplaced) {
  //         return this.confirmationRepository.getConfirmedConfirmation(credentialConfirmation.credentialId)
  //           .switchMap(confirmedConfirmation => {
  //             if(!confirmedConfirmation) {
  //               let newCredentialConfirmation:CredentialConfirmation = new CredentialConfirmation();
  //               newCredentialConfirmation.credentialId = credentialConfirmation.credentialId;
  //               return this.confirmationRepository
  //                 .addCredentialConfirmation(newCredentialConfirmation)
  //                 .map((credentialConfirmation:CredentialConfirmation) => {
  //                   return new Result<CredentialConfirmation>(false, "Updated", credentialConfirmation);
  //                 });
  //             }else {
  //               return Rx.Observable.of(new Result<CredentialConfirmation>(false, "Already Confirmed.", confirmedConfirmation));
  //             }
  //           });
  //       }else {
  //         return Rx.Observable.of(new Result<CredentialConfirmation>(true, "Invalid Status", credentialConfirmation));
  //       }
  //     });
  // }

  // createNotFoundError(name:string):Error {
  //   return new Error(JSON.stringify({
  //     "statusCode":404,
  //     "message": name + " not found."
  //   }));
  // }
}
