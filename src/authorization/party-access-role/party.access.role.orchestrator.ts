import { PartyAccessRoleRepository } from "../../repository/party.access.role.repository";
import { createPartyAccessRoleRepositoryFactory } from "../../adapter/authorization/party.access.role.repository.factory";
import { PartyAccessRole } from "../../data/authorization/party.access.role";
import { AccessRoleRepository } from "../../repository/access.role.repository";
import { accessRoles } from "../../db";
// import {shapePartyAccessRolesResponse} from "./party.access.role.response.shaper";
// import {Result} from "../../result.success";
// import {getSortOrderOrDefault} from "../../sort.order.util";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import {createAccessRoleRepositoryFactory} from "../../adapter/authorization/access.role.repository.factory";

export class PartyAccessRoleOrchestrator {

  private partyPartyAccessRoleRepository: PartyAccessRoleRepository;
  private accessRoleRepository: AccessRoleRepository;

  constructor() {
    this.partyPartyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
  }


  getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return this.partyPartyAccessRoleRepository.getPartyAccessRoles()
      .pipe(switchMap( partyAccessRoles => {
        if (partyAccessRoles.length === 0) {
          return of(partyAccessRoles);
        } else {
          const accessRoleIds = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
          if (accessRoleIds.length === 0) return of(partyAccessRoles);
          return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
            .pipe(map( accessRoles => {
              partyAccessRoles.forEach( value => {
                const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
                value.accessRole = accessRoles[index];
              });
              return partyAccessRoles;
            }));
        }
      }));
  }

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

  getPartyAccessRoleById(partyPartyAccessRoleId: string): Observable<PartyAccessRole[]> {
    return this.partyPartyAccessRoleRepository.getPartyAccessRoleById(partyPartyAccessRoleId)
      .pipe(switchMap( partyAccessRoles => {
        if (partyAccessRoles.length === 0) {
          return of(partyAccessRoles);
        } else {
         const accessRoleIds = partyAccessRoles.map(x => { if (x.accessRoleId) return x.accessRoleId; });
         if (accessRoleIds.length === 0) return of(partyAccessRoles);
          return this.accessRoleRepository.getAccessRoleByIds(accessRoleIds)
           .pipe(map( accessRoles => {
             partyAccessRoles.forEach( value => {
               const index = accessRoles.findIndex(x => x.accessRoleId === value.accessRoleId);
               value.accessRole = accessRoles[index];
             });
             return partyAccessRoles;
           }));
        }
      }));
  }

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
