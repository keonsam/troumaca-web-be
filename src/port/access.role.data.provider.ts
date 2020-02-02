import {AccessRole} from "../domain/model/authorization/access.role";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import { HeaderBaseOptions } from "../header.base.options";

export interface AccessRoleDataProvider {


  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]>;

  getAccessRoles(number: number, size: number, sort: string): Observable<AccessRole[]>;

  getAccessRoleCount(): Observable<number>;

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]>;

  getAccessRoleById(accessRoleId: string): Observable<AccessRole>;

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]>;

}
