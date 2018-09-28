import { AccessRoleRepository } from "../../repository/access.role.repository";
import { createAccessRoleRepository} from "../../adapter/authorization/access.role.repository.factory";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { shapeAccessRolesResponse } from "./access.role.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { Grant } from "../../data/authorization/grant";
import { GrantRepository } from "../../repository/grant.repository";
import { createGrantRepositoryFactory } from "../../adapter/authorization/grant.repository.factory";
import { PartyAccessRoleRepository } from "../../repository/party.access.role.repository";
import { createPartyAccessRoleRepositoryFactory } from "../../adapter/authorization/party.access.role.repository.factory";
import { AccessRoleTypeRepository } from "../../repository/access.role.type.repository";
import { createAccessRoleTypeRepositoryFactory } from "../../adapter/authorization/access.role.type.repository.factory";
import { AccessRoleType } from "../../data/authorization/access.role.type";
import { AccessRoleResponse } from "../../data/authorization/access.role.response";
import {AccessRole} from "../../data/authorization/access.role";

export class AccessRoleOrchestrator {

  private accessRoleRepository: AccessRoleRepository;
  private grantRepository: GrantRepository;
  private partyAccessRoleRepository: PartyAccessRoleRepository;
  private accessRoleTypeRepository: AccessRoleTypeRepository;

  constructor() {
    this.accessRoleRepository = createAccessRoleRepository();
    this.grantRepository = createGrantRepositoryFactory();
    this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
    this.accessRoleTypeRepository = createAccessRoleTypeRepositoryFactory();
  }

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.accessRoleRepository.findAccessRoles(searchStr, pageSize);
  }

  getAccessRoles(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    // return this.accessRoleRepository.getAccessRoles(number, size, sort)
    //   .pipe(switchMap((accessRoles: AccessRole[]) => {
    //     if (accessRoles.length === 0) {
    //       const shapeAccessRolesResp: any = shapeAccessRolesResponse(accessRoles, 0, 0, 0, 0, sort);
    //       return of(new Result<any>(false, "no data found", shapeAccessRolesResp));
    //     } else {
    //       const accessRoleTypeIds: string[] = accessRoles.map(x => {if (x.accessRoleTypeId) return x.accessRoleTypeId; });
    //       return this.accessRoleTypeRepository.getAccessRoleTypeByIds(accessRoleTypeIds)
    //         .pipe(switchMap((accessRoleTypes: AccessRoleType[]) => {
    //           accessRoles.forEach(value => {
    //             const index = accessRoleTypes.findIndex(x => x.accessRoleTypeId === value.accessRoleTypeId);
    //             value.accessRoleType = index !== -1 ? accessRoleTypes[index] : new AccessRoleType();
    //           });
    //           return this.accessRoleRepository
    //             .getAccessRoleCount()
    //             .pipe(map(count => {
    //               // const shapeAccessRolesResp: any = shapeAccessRolesResponse(accessRoles, number, size, accessRoles.length, count, sort);
    //               // return new Result<any>(false, "accessRoles", shapeAccessRolesResp);
    //             }));
    //         }));
    //     }
    //   }));
    return null;
  }

    getAccessRoleById(accessRoleId: string): Observable<AccessRoleResponse> {
        return this.accessRoleRepository.getAccessRoleById(accessRoleId)
            .pipe(switchMap((accessRole: AccessRole) => {
                if (!accessRole) return of(undefined);
                return this.accessRoleTypeRepository.getAccessRoleTypeById(accessRole.accessRoleTypeId)
                    .pipe(switchMap(accessRoleType => {
                        accessRole.accessRoleType = new AccessRoleType();
                        // if (accessRoleType) accessRole.accessRoleType = accessRoleType;
                        return this.grantRepository.getGrantsByAccessRoleId(accessRoleId)
                            .pipe(map(grants => {
                              // return  new AccessRoleResponse(accessRole, grants);
                            }));
                    }));
            }));
    }

  addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole)
      .pipe(switchMap(accessRole => {
          if (!accessRole || grants.length == 0) return of(accessRole);
          // const accessRoleId = accessRole.accessRoleId;
          grants.forEach(value => {
            // value.accessRoleId = accessRoleId;
          });
          return this.grantRepository.addGrant(grants)
            .pipe(map(grants => {
              if ( !grants) return new AccessRole();
              return accessRole;
            }));
      }));
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, grants: Grant[]): Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole)
      .pipe(switchMap(numUpdated => {
          if (!numUpdated || grants.length === 0) return of(numUpdated);
          return this.grantRepository.deleteGrant(accessRoleId)
            .pipe(switchMap(numReplaced => {
                return this.grantRepository.addGrant(grants)
                  .pipe(map(grants => {
                    if (!grants) return 0;
                    return numUpdated;
                  }));
            }));
      }));
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return this.accessRoleRepository.deleteAccessRole(accessRoleId)
      .pipe(switchMap(numReplaced => {
        if (numReplaced) {
          return this.grantRepository.deleteGrant(accessRoleId)
            .pipe(switchMap(numReplaced2 => {
                return this.partyAccessRoleRepository.deletePartyAccessRoleByAccessRoleId(accessRoleId)
                  .pipe(map( numReplaced3 => {
                    return numReplaced;
                  }));
            }));
        }
        }));
  }

}
