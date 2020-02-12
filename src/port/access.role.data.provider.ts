import {AccessRole} from "../domain/model/authorization/access.role";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import { HeaderBaseOptions } from "../header.base.options";

export interface AccessRoleDataProvider {


  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]>;

  getAccessRoles(number: number, size: number, sort: string): Observable<AccessRole[]>;

  getAccessRoleCount(): Observable<number>;

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]>;

  addAccessRole(accessRole: AccessRole, options: HeaderBaseOptions): Observable<AccessRole>;

  getAccessRoleById(accessRoleId: string, options: HeaderBaseOptions): Observable<AccessRole>;

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]>;

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, options: HeaderBaseOptions): Observable<number>;

  deleteAccessRole(accessRoleId: string, options: HeaderBaseOptions): Observable<number>;

}
