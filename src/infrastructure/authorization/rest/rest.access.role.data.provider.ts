import {AccessRoleDataProvider} from "../../../port/access.role.data.provider";
import {AccessRole} from "../../../domain/model/authorization/access.role";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../../header.base.options";

export class RestAccessRoleDataProvider implements AccessRoleDataProvider {

  deleteAccessRole(accessRoleId: string, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]> {
    return undefined;
  }

  getAccessRoleById(accessRoleId: string, options: HeaderBaseOptions): Observable<AccessRole> {
    return undefined;
  }

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]> {
    return undefined;
  }

  getAccessRoleCount(): Observable<number> {
    return undefined;
  }

  getAccessRoles(number: number, size: number, sort: string): Observable<AccessRole[]> {
    return undefined;
  }

  addAccessRole(accessRole: AccessRole, options: HeaderBaseOptions): Observable<AccessRole> {
    return undefined;
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, options: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]> {
    return undefined;
  }

}
