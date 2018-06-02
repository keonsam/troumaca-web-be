// import {createAccountRepository} from './account.repository.factory';
// import {AccountRepository} from "./account.repository";
// import {Observable} from "rxjs/Observable";
// import {Account} from "./account";
// //import {shapeAccountsResponse} from "./account.response.shaper";
// import {generateUUID} from "../../uuid.generator";
// import {SessionRepository} from "../../session/session.repository";
// import {CredentialRepository} from "../../authentication/credential/credential.repository";
// import {createSessionRepositoryFactory} from "../../session/session.repository.factory";
// import {createCredentialRepositoryFactory} from "../../authentication/credential/credential.repository.factory";
// import {PersonalAccountRepository} from "./personal-account/personal.account.repository";
// import {createPersonalAccountRepository} from "./personal-account/personal.account.repository.factory";
// import {OrganizationAccountRepository} from "./organization-account/organization.account.repository";
// import {createOrganizationAccountRepository} from "./organization-account/organization.account.repository.factory";
//
// export class AccountOrchestrator {
//
//   private accountRepository: AccountRepository;
//   private sessionRepository: SessionRepository;
//   private credentialRepository: CredentialRepository;
//   private personalAccountRepository: PersonalAccountRepository;
//   private organizationAccountRepository: OrganizationAccountRepository;
//
//   constructor() {
//     this.accountRepository = createAccountRepository();
//     this.sessionRepository = createSessionRepositoryFactory();
//     this.credentialRepository = createCredentialRepositoryFactory();
//     this.personalAccountRepository = createPersonalAccountRepository();
//     this.organizationAccountRepository = createOrganizationAccountRepository();
//   }
//
//     saveAccount (account:Account, sessionId:string):Observable<Account>{
//       return this.sessionRepository
//         .getSessionById(sessionId)
//         .switchMap(session => {
//           let partyId = generateUUID();
//           session["partyId"] = partyId;
//           account["partyId"] = partyId;
//           return this.sessionRepository.updateSession(sessionId, session)
//             .switchMap(numReplaced => {
//               return this.credentialRepository
//                 .updateCredentialPartyId(partyId, session.credentialId)
//                 .switchMap(numReplaced => {
//                   if(account.accountType === "personal") {
//                     return this.personalAccountRepository.savePersonalAccount(account);
//                   }else if(account.accountType === "organization") {
//                     return this.organizationAccountRepository.saveOrganizationAccount(account);
//                   }else {
//                     return this.personalAccountRepository.savePersonalAccount(account)
//                       .switchMap(doc => {
//                         if (doc) {
//                           return this.organizationAccountRepository.saveOrganizationAccount(account);
//                         }else {
//                           return Rx.Observable.of(doc);
//                         }
//                       });
//                   }
//                 });
//             });
//         });
//     };
//
// }
