import {AccessRoleType} from "../data/authorization/access.role.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";

export interface AccessRoleTypeRepository {

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType>;

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<Affect>;

  deleteAccessRoleType(accessRoleTypeId: string): Observable<Affect>;

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]>;

  getAccessRoleTypes(number: number, size: number, sort: string): Observable<AccessRoleType[]>;

  getAccessRoleTypeCount(): Observable<number>;

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType>;

  getAccessRoleTypeByIds(accessRoleTypeIds: string[]): Observable<AccessRoleType[]>;

}
