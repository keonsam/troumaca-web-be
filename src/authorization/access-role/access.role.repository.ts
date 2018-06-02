import {AccessRole} from "./access.role";
import {Observable} from "rxjs/Observable";

export interface AccessRoleRepository {

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]>;

  getAccessRoles(number: number, size: number, sort:string):Observable<AccessRole[]>;

  getAccessRoleCount():Observable<number>;

  addAccessRole(accessRole:AccessRole):Observable<AccessRole>;

  getAccessRoleById(accessRoleId:string):Observable<AccessRole>;

  getAccessRoleByIds(accessRoleIds:string[]):Observable<AccessRole[]>;

  updateAccessRole(accessRoleId:string, accessRole:AccessRole):Observable<number>;

  deleteAccessRole(accessRoleId:string):Observable<number>;

}
