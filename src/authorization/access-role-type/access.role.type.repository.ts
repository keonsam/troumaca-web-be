import { AccessRoleType } from "./access.role.type";
import { Observable } from "rxjs";

export interface AccessRoleTypeRepository {

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]>;

  getAccessRoleTypes(number: number, size: number, sort: string): Observable<AccessRoleType[]>;

  getAccessRoleTypeCount(): Observable<number>;

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType>;

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType>;

  getAccessRoleTypeByIds(accessRoleTypeIds: string[]): Observable<AccessRoleType[]>;


  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<number>;

  deleteAccessRoleType(accessRoleTypeId: string): Observable<number>;
}
