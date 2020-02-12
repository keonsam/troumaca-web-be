import {AccessRoleDataProvider} from "../../../port/access.role.data.provider";
import {createAccessRoleDataProvider} from "../../../infrastructure/authorization/access.role.data.provider.factory";
import { Observable, of, throwError } from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {shapeAccessRolesResponse} from "./access.role.response.shaper";
import {Result} from "../../../result.success";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {Grant} from "../../../domain/model/authorization/grant";
import {GrantDataProvider} from "../../../port/grant.data.provider";
import {createGrantDataProvider} from "../../../infrastructure/authorization/grant.data.provider.factory";
import {PartyAccessRoleDataProvider} from "../../../port/party.access.role.data.provider";
import {createPartyAccessRoleDataProvider} from "../../../infrastructure/authorization/party.access.role.data.provider.factory";
import {AccessRoleTypeDataProvider} from "../../../port/access.role.type.data.provider";
import {createAccessRoleTypeDataProvider} from "../../../infrastructure/authorization/access.role.type.data.provider.factory";
import {AccessRole} from "../../../domain/model/authorization/access.role";
import { HeaderBaseOptions } from "../../../header.base.options";

export class AccessRoleOrchestrator {

  private accessRoleRepository: AccessRoleDataProvider;
  private grantRepository: GrantDataProvider;
  private partyAccessRoleRepository: PartyAccessRoleDataProvider;
  private accessRoleTypeRepository: AccessRoleTypeDataProvider;

  constructor() {
    this.accessRoleRepository = createAccessRoleDataProvider();
    this.grantRepository = createGrantDataProvider();
    this.partyAccessRoleRepository = createPartyAccessRoleDataProvider();
    this.accessRoleTypeRepository = createAccessRoleTypeDataProvider();
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

  getAccessRoleById(accessRoleId: string, options: HeaderBaseOptions): Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId, options);
  }

  addAccessRole(accessRole: AccessRole, options: HeaderBaseOptions): Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole, options);
      // .pipe(switchMap(accessRole => {
      //   if (!accessRole) {
      //       return throwError(`Failed to save access role ${accessRole}`);
      //   }
      //   const accessRoleId = accessRole.accessRoleId;
      //   grants.forEach(value => {
      //     value.accessRoleId = accessRoleId;
      //   });
      //   return this.grantRepository.addGrant(grants)
      //     .pipe(map(grants => {
      //       if (!grants) return new AccessRole();
      //       return accessRole;
      //     }));
      // }));
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, options: HeaderBaseOptions): Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole, options);
      // .pipe(switchMap(numUpdated => {
      //   if (!numUpdated) {
      //       return throwError(`Failed to update access role ${accessRoleId} ${numUpdated}`);
      //   }
      //   return this.grantRepository.deleteGrant(accessRoleId)
      //     .pipe(switchMap(numReplaced => {
      //       return this.grantRepository.addGrant(grants)
      //         .pipe(map(grants => {
      //           if (!grants) return 0;
      //           return numUpdated;
      //         }));
      //     }));
      // }));
  }

  deleteAccessRole(accessRoleId: string, options: HeaderBaseOptions): Observable<number> {
    return this.accessRoleRepository.deleteAccessRole(accessRoleId, options);
      // .pipe(switchMap(numReplaced => {
      //   if (numReplaced) {
      //     return this.grantRepository.deleteGrant(accessRoleId)
      //       .pipe(switchMap(numReplaced2 => {
      //         return this.partyAccessRoleRepository.deletePartyAccessRoleByAccessRoleId(accessRoleId)
      //           .pipe(map(numReplaced3 => {
      //             return numReplaced;
      //           }));
      //       }));
      //   }
      // }));
  }

}
