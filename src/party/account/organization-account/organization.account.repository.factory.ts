// import * as Rx from 'rxjs';
// import {OrganizationAccountRepository} from "./organization.account.repository";
// import {Observable} from "rxjs/Observable";
// import {Observer} from "rxjs/Observer";
// import {RepositoryKind} from "../../../repository.kind";
// import {OrganizationAccount} from "./organization.account";
// import {organizationsInformation} from "../../../db";
// import {OrganizationAccount} from "./";
// import {organizationsInformation} from "../../../db";
// //import {calcSkip} from "../../db.util";
// //import {generateUUID} from "../../uuid.generator";
//
// class OrganizationAccountDBRepository implements OrganizationAccountRepository {
//   saveOrganizationAccount(organizationAccount: OrganizationAccount): Observable<OrganizationAccount> {
//     return Rx.Observable.create(function (observer:Observer<OrganizationAccount>) {
//       organizationsInformation.insert(organizationAccount, function (err:any, doc:any) {
//         if (!err) {
//           observer.next(doc);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
// }
//
// class OrganizationAccountRestRepository implements OrganizationAccountRepository {
//   saveOrganizationAccount(organizationAccount: OrganizationAccount): Observable<OrganizationAccount> {
//     return null;
//   }
// }
//
// export function createOrganizationAccountRepository(kind?:RepositoryKind):OrganizationAccountRepository {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new OrganizationAccountDBRepository();
//     case RepositoryKind.Rest:
//       return new OrganizationAccountRestRepository();
//     default:
//       return new OrganizationAccountDBRepository();
//   }
// }
