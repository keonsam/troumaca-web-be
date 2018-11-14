import {PermissionRepository} from "../../repository/permission.repository";
import {Permission} from "../../data/authorization/permission";
import {Observable} from "rxjs";

export class PermissionRepositoryRestAdapter implements PermissionRepository {

    getPermissions(pageNumber: number, pageSize: number, order: string): Observable<Permission[]> {
        return undefined;
    }

    getPermissionCount(): Observable<number> {
        return undefined;
    }

    addPermission(permission: Permission): Observable<Permission> {
        return undefined;
    }

    deletePermission(permissionId: string): Observable<number> {
        return undefined;
    }

    getPermissionById(permissionId: string): Observable<Permission> {
        return undefined;
    }

    updatePermission(permissionId: string, permission: Permission): Observable<number> {
        return undefined;
    }

    // OTHERS

    getPermissionsByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]> {
        return undefined;
    }

    getAvailablePermissionsCount(assignedArray: string[]): Observable<number> {
        return undefined;
    }

    getAssignablePermissions(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]> {
        return undefined;
    }

    getAssignablePermissionsCount(assignedArray?: string[]): Observable<number> {
        return undefined;
    }

}




