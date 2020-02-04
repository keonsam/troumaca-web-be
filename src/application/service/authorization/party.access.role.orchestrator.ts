import {PartyAccessRoleDataProvider} from "../../../port/party.access.role.data.provider";
import {createPartyAccessRoleDataProvider} from "../../../infrastructure/authorization/party.access.role.data.provider.factory";
import {AccessRoleDataProvider} from "../../../port/access.role.data.provider";
import {createAccessRoleDataProvider} from "../../../infrastructure/authorization/access.role.data.provider.factory";

export class PartyAccessRoleOrchestrator {

  private partyPartyAccessRoleRepository: PartyAccessRoleDataProvider;
  private accessRoleRepository: AccessRoleDataProvider;

  constructor() {
    this.partyPartyAccessRoleRepository = createPartyAccessRoleDataProvider();
    this.accessRoleRepository = createAccessRoleDataProvider();
  }


  // getPartyAccessRoles(): Observable<PartyAccessRole[]> {
  //   return this.partyPartyAccessRoleRepository.getPartyAccessRoles()
  //     .pipe(switchMap( partyAccessRoles => {
  //       if (partyAccessRoles.length === 0) {
  //         return of(partyAccessRoles);
  //       } else {
  //         const accessRoleIds = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
  //         if (accessRoleIds.length === 0) return of(partyAccessRoles);
  //         return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
  //           .pipe(map( accessRoles => {
  //             partyAccessRoles.forEach( value => {
  //               const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
  //               value.accessRole = accessRoles[index];
  //             });
  //             return partyAccessRoles;
  //           }));
  //       }
  //     }));
  // }

  //
  // addPartyAccessRole(partyPartyAccessRole:PartyAccessRole, grants: Grant[]):Observable<PartyAccessRole> {
  //   return this.partyPartyAccessRoleRepository.addPartyAccessRole(partyPartyAccessRole)
  //     .pipe(switchMap(doc => {
  //       if(doc) {
  //         let partyPartyAccessRoleId = doc.partyPartyAccessRoleId;
  //         grants.forEach(value => {
  //           value.partyPartyAccessRoleId = partyPartyAccessRoleId;
  //         });
  //         return this.grantRepository.addGrant(grants)
  //           .map(docs => {
  //             if(docs) {
  //               return doc;
  //             }
  //           });
  //       }
  //     });
  // };

  // getPartyAccessRoleById(partyPartyAccessRoleId: string): Observable<PartyAccessRole[]> {
  //   return this.partyPartyAccessRoleRepository.getPartyAccessRoleById(partyPartyAccessRoleId)
  //     .pipe(switchMap( partyAccessRoles => {
  //       if (partyAccessRoles.length === 0) {
  //         return of(partyAccessRoles);
  //       } else {
  //        const accessRoleIds = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
  //        if (accessRoleIds.length === 0) return of(partyAccessRoles);
  //         return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
  //          .pipe(map( accessRoles => {
  //            partyAccessRoles.forEach( value => {
  //              const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
  //              value.accessRole = accessRoles[index];
  //            });
  //            return partyAccessRoles;
  //          }));
  //       }
  //     }));
  // }

  // updatePartyAccessRole(partyPartyAccessRoleId:string, partyPartyAccessRole:PartyAccessRole, grants: Grant[]):Observable<number> {
  //   return this.partyPartyAccessRoleRepository.updatePartyAccessRole(partyPartyAccessRoleId, partyPartyAccessRole)
  //     .pipe(switchMap(numUpdated => {
  //       if(numUpdated) {
  //         return this.grantRepository.deleteGrant(partyPartyAccessRoleId)
  //           .pipe(switchMap(numReplaced => {
  //             if(numReplaced) {
  //               return this.grantRepository.addGrant(grants)
  //                 .map(docs => {
  //                   if(docs) {
  //                    return numUpdated;
  //                   }
  //                 });
  //             }
  //           });
  //       }
  //     });
  // };

  // deletePartyAccessRole(partyPartyAccessRoleId:string):Observable<number>{
  //   return this.partyPartyAccessRoleRepository.deletePartyAccessRole(partyPartyAccessRoleId)
  //     .pipe(switchMap(numReplaced => {
  //       if(numReplaced){
  //         return this.grantRepository.deleteGrant(partyPartyAccessRoleId);
  //       }
  //       });
  // };

}
