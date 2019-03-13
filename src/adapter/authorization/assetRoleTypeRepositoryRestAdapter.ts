import {AccessRoleTypeRepository} from "../../repository/access.role.type.repository";
import {AccessRoleType} from "../../data/authorization/access.role.type";
import {Observable} from "rxjs";
import {Affect} from "../../data/affect";

export class AssetRoleTypeRepositoryRestAdapter implements AccessRoleTypeRepository {

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return undefined;
  }

  getAccessRoleTypes(pageNumber: number, pageSize: number, order: string): Observable<AccessRoleType[]> {
    return undefined;
  }

  getAccessRoleTypeCount(): Observable<number> {
    return undefined;
  }

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return undefined;
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<Affect> {
    return undefined;
  }

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return undefined;
  }

  getAccessRoleTypeByIds(accessRoleTypeIds: string[]): Observable<AccessRoleType[]> {
    return undefined;
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<Affect> {
    return undefined;
  }

}

