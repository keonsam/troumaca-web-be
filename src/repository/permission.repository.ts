import {Permission} from "../data/authorization/permission";
import {Observable} from "rxjs";

export interface PermissionRepository {

    getPermissions(number: number, size: number, sort: string): Observable<Permission[]>;

    getPermissionCount(): Observable<number>;

    addPermission(permission: Permission): Observable<Permission>;

    getPermissionById(permissionId: string): Observable<Permission>;

    updatePermission(permissionId: string, permission: Permission): Observable<number>;

    deletePermission(permissionId: string): Observable<number>;

    // OTHERS

    getPermissionsByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]>;

    getAvailablePermissionsCount(assignedArray: string[]): Observable<number>;

    getAssignablePermissions(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]>;

    getAssignablePermissionsCount(assignedArray?: string[]): Observable<number>;



}

