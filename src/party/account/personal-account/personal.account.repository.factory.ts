// import * as Rx from 'rxjs';
// import {PersonalAccountRepository} from "./personal.account.repository";
// import {Observable} from "rxjs/Observable";
// import {Observer} from "rxjs/Observer";
// import {RepositoryKind} from "../../../repository.kind";
// import {PersonalAccount} from "./personal.account";
// import {personalsInformation} from "../../../db";
// //import {generateUUID} from "../../../uuid.generator";
// //import {calcSkip} from "../../db.util";
// //import {generateUUID} from "../../uuid.generator";
//
// class PersonalAccountDBRepository implements PersonalAccountRepository {
//   savePersonalAccount(personalAccount: PersonalAccount): Observable<PersonalAccount> {
//     return Rx.Observable.create(function (observer:Observer<PersonalAccount>) {
//       personalsInformation.insert(personalAccount, function (err:any, doc:any) {
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
// class PersonalAccountRestRepository implements PersonalAccountRepository {
//   savePersonalAccount(personalAccount: PersonalAccount): Observable<PersonalAccount> {
//     return null;
//   }
// }
//
// export function createPersonalAccountRepository(kind?:RepositoryKind):PersonalAccountRepository {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new PersonalAccountDBRepository();
//     case RepositoryKind.Rest:
//       return new PersonalAccountRestRepository();
//     default:
//       return new PersonalAccountDBRepository();
//   }
// }
