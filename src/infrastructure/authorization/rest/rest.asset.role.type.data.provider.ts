import {AccessRoleTypeDataProvider} from "../../../port/access.role.type.data.provider";
import {AccessRoleType} from "../../../domain/model/authorization/access.role.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";

export class RestAssetRoleTypeDataProvider implements AccessRoleTypeDataProvider {

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

