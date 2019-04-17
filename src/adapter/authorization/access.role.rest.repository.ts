import {AccessRoleRepository} from "../../repository/access.role.repository";
import {AccessRole} from "../../data/authorization/access.role";
import {Observable} from "rxjs";
import { HeaderBaseOptions } from "../../header.base.options";

export class AccessRoleRestRepository implements AccessRoleRepository {

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    return undefined;
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return undefined;
  }

  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]> {
    return undefined;
  }

  getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
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

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return undefined;
  }

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]> {
    return undefined;
  }

}
