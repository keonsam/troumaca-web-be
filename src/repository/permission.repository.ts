import {Permission} from "../data/authorization/permission";
import {Observable} from "rxjs";

export interface PermissionRepository {

  getPermissionsByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]>;

  getPermissions(number: number, size: number, sort: string): Observable<Permission[]>;

  getPermissionCount(assignedArray?: string[]): Observable<number>;

  addPermission(permission: Permission): Observable<Permission>;

  getPermissionById(permissionId: string): Observable<Permission>;

  updatePermission(permissionId: string, permission: Permission): Observable<number>;

  deletePermission(permissionId: string): Observable<number>;

}

