import {AccessRole} from "../data/authorization/access.role";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";

export interface AccessRoleRepository {


  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]>;

  getAccessRoles(number: number, size: number, sort: string): Observable<AccessRole[]>;

  getAccessRoleCount(): Observable<number>;

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]>;

  getAccessRoleById(accessRoleId: string): Observable<AccessRole>;

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]>;

}
