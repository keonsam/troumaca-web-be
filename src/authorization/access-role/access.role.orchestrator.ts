import {AccessRoleRepository} from "./access.role.repository";
import {createAccessRoleRepositoryFactory} from "./access.role.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRole} from "./access.role";
import {shapeAccessRolesResponse} from "./access.role.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Grant} from "../grant/grant";
import {GrantRepository} from "../grant/grant.repository";
import {createGrantRepositoryFactory} from "../grant/grant.repository.factory";
import {PartyAccessRoleRepository} from "../party-access-role/party.access.role.repository";
import {createPartyAccessRoleRepositoryFactory} from "../party-access-role/party.access.role.repository.factory";
import {AccessRoleTypeRepository} from "../access-role-type/access.role.type.repository";
import {createAccessRoleTypeRepositoryFactory} from "../access-role-type/access.role.type.repository.factory";
import {AccessRoleType} from "../access-role-type/access.role.type";
import {AccessRoleResponse} from "./access.role.response";

export class AccessRoleOrchestrator {

  private accessRoleRepository:AccessRoleRepository;
  private grantRepository: GrantRepository;
  private partyAccessRoleRepository: PartyAccessRoleRepository;
  private accessRoleTypeRepository:AccessRoleTypeRepository;

  constructor() {
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
    this.grantRepository = createGrantRepositoryFactory();
    this.partyAccessRoleRepository = createPartyAccessRoleRepositoryFactory();
    this.accessRoleTypeRepository = createAccessRoleTypeRepositoryFactory();
  }

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.accessRoleRepository.findAccessRoles(searchStr, pageSize);
  };

  getAccessRoles(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort: string = getSortOrderOrDefault(field, direction);
    return this.accessRoleRepository.getAccessRoles(number, size, sort)
      .switchMap((accessRoles: AccessRole[]) => {
        if(accessRoles.length === 0) {
          let shapeAccessRolesResp:any = shapeAccessRolesResponse(accessRoles, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "no data found", shapeAccessRolesResp));
        }else {
          let accessRoleTypeIds:string[] = accessRoles.map(x => {if(x.accessRoleTypeId) return x.accessRoleTypeId});
          return this.accessRoleTypeRepository.getAccessRoleTypeByIds(accessRoleTypeIds)
            .switchMap((accessRoleTypes:AccessRoleType[]) => {
              accessRoles.forEach(value => {
                let index = accessRoleTypes.findIndex(x => x.accessRoleTypeId === value.accessRoleTypeId);
                value.accessRoleType = accessRoleTypes[index];
              });
              return this.accessRoleRepository
                .getAccessRoleCount()
                .map(count => {
                  let shapeAccessRolesResp:any = shapeAccessRolesResponse(accessRoles, number, size, accessRoles.length, count, sort);
                  return new Result<any>(false, "accessRoles", shapeAccessRolesResp);
                });
            });
        }
      });
  };

    getAccessRoleById(accessRoleId:string):Observable<AccessRoleResponse> {
        return this.accessRoleRepository.getAccessRoleById(accessRoleId)
            .switchMap((accessRole:AccessRole) => {
                if (!accessRole) return Observable.of(undefined);
                return this.accessRoleTypeRepository.getAccessRoleTypeById(accessRole.accessRoleTypeId)
                    .switchMap(accessRoleType => {
                        accessRole.accessRoleType = new AccessRoleType();
                        if (accessRoleType) accessRole.accessRoleType = accessRoleType;
                        return this.grantRepository.getGrantsByAccessRoleId(accessRoleId)
                            .map(grants => {
                              return  new AccessRoleResponse(accessRole, grants);
                            });
                    });
            });
    };

  addAccessRole(accessRole:AccessRole, grants: Grant[]):Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole)
      .switchMap(doc => {
        if(grants.length === 0) {
          return Observable.of(doc);
        }
        if(doc) {
          let accessRoleId = doc.accessRoleId;
          grants.forEach(value => {
            value.accessRoleId = accessRoleId;
          });
          return this.grantRepository.addGrant(grants)
            .map(docs => {
              if(docs) {
                return doc;
              }
            });
        }
      });
  };

  updateAccessRole(accessRoleId:string, accessRole:AccessRole, grants: Grant[]):Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole)
      .switchMap(numUpdated => {
        if(numUpdated) {
          return this.grantRepository.deleteGrant(accessRoleId)
            .switchMap(numReplaced => {
              if(grants.length === 0) {
                return Observable.of(numUpdated);
              }
              if(numUpdated) {
                return this.grantRepository.addGrant(grants)
                  .map(docs => {
                    if(docs) {
                     return numUpdated;
                    }
                  });
              }
            });
        }
      });
  };

  deleteAccessRole(accessRoleId:string):Observable<number>{
    return this.accessRoleRepository.deleteAccessRole(accessRoleId)
      .switchMap(numReplaced => {
        if(numReplaced){
          return this.grantRepository.deleteGrant(accessRoleId)
            .switchMap(numReplaced2 => {
              if(numReplaced) {
                return this.partyAccessRoleRepository.deletePartyAccessRoleByAccessRoleId(accessRoleId)
                  .map( numReplaced3 => {
                    return numReplaced;
                  });
              }
            });
        }
        });
  };

}
