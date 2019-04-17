import {AccessRoleRepository} from "../../repository/access.role.repository";
import {createAccessRoleRepository} from "../../adapter/authorization/access.role.repository.factory";
import { Observable, of, throwError } from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {shapeAccessRolesResponse} from "./access.role.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Grant} from "../../data/authorization/grant";
import {GrantRepository} from "../../repository/grant.repository";
import {createGrantRepositoryFactory} from "../../adapter/authorization/grant.repository.factory";
import {PartyAccessRoleRepository} from "../../repository/party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "../../adapter/authorization/party.access.role.repository.factory";
import {AccessRoleTypeRepository} from "../../repository/access.role.type.repository";
import {createAccessRoleTypeRepositoryFactory} from "../../adapter/authorization/access.role.type.repository.factory";
import {AccessRole} from "../../data/authorization/access.role";
import { HeaderBaseOptions } from "../../header.base.options";

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

  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]> {
    return this.accessRoleRepository.findAccessRoles(searchStr, pageSize, options);
  }

  getAccessRoles(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.accessRoleRepository.getAccessRoles(number, size, sort)
      .pipe(switchMap((accessRoles: AccessRole[]) => {
          return this.accessRoleRepository
              .getAccessRoleCount()
              .pipe(map(count => {
                  const shapeAccessRolesResp: any = shapeAccessRolesResponse(accessRoles, number, size, accessRoles.length, count, sort);
                  return new Result<any>(false, "accessRoles", shapeAccessRolesResp);
              }));
      }));
  }

  getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId);
  }

  addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
    // return this.accessRoleRepository.addAccessRole(accessRole)
    //   .pipe(switchMap(accessRole => {
    //     if (!accessRole) {
    //         return throwError(`Failed to save access role ${accessRole}`);
    //     }
    //     const accessRoleId = accessRole.accessRoleId;
    //     grants.forEach(value => {
    //       value.accessRoleId = accessRoleId;
    //     });
    //     return this.grantRepository.addGrant(grants)
    //       .pipe(map(grants => {
    //         if (!grants) return new AccessRole();
    //         return accessRole;
    //       }));
    //   }));

    return undefined;
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, grants: Grant[]): Observable<number> {
    // return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole)
    //   .pipe(switchMap(numUpdated => {
    //     if (!numUpdated) {
    //         return throwError(`Failed to update access role ${accessRoleId} ${numUpdated}`);
    //     }
    //     return this.grantRepository.deleteGrant(accessRoleId)
    //       .pipe(switchMap(numReplaced => {
    //         return this.grantRepository.addGrant(grants)
    //           .pipe(map(grants => {
    //             if (!grants) return 0;
    //             return numUpdated;
    //           }));
    //       }));
    //   }));

    return undefined;
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    // return this.accessRoleRepository.deleteAccessRole(accessRoleId)
    //   .pipe(switchMap(numReplaced => {
    //     if (numReplaced) {
    //       return this.grantRepository.deleteGrant(accessRoleId)
    //         .pipe(switchMap(numReplaced2 => {
    //           return this.partyAccessRoleRepository.deletePartyAccessRoleByAccessRoleId(accessRoleId)
    //             .pipe(map(numReplaced3 => {
    //               return numReplaced;
    //             }));
    //         }));
    //     }
    //   }));
    return undefined;
  }

}
