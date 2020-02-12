import {PermissionDataProvider} from "../../../port/permission.data.provider";
import {createPermissionDataProvider} from "../../../infrastructure/authorization/permission.data.provider.factory";
import {Permission} from "../../../domain/model/authorization/permission";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {Result} from "../../../result.success";
import {shapePermissionsResponse} from "./permission.response.shaper";

export class PermissionOrchestrator {

    private permissionRepository: PermissionDataProvider;

    constructor() {
        this.permissionRepository = createPermissionDataProvider();
    }

    getPermissions(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.permissionRepository
            .getPermissions(number, size, sort)
            .pipe(flatMap(value => {
                return this.permissionRepository
                    .getPermissionCount()
                    .pipe(map(count => {
                        const shapePermissionsResp: any = shapePermissionsResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "permissions", shapePermissionsResp);
                    }));
            }));
    }

    getPermissionById(permissionId: string): Observable<Permission> {
        return this.permissionRepository.getPermissionById(permissionId);
    }

    addPermission(permission: Permission): Observable<Permission> {
        return this.permissionRepository.addPermission(permission);
    }

    updatePermission(permissionId: string, permission: Permission): Observable<number> {
        return this.permissionRepository.updatePermission(permissionId, permission);
    }

    deletePermission(permissionId: string): Observable<number> {
        return this.permissionRepository.deletePermission(permissionId);
    }

    // OTHERS

    getPermissionsByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.permissionRepository
            .getPermissionsByArray(number, size, sort, assignedArray)
            .pipe(flatMap(value => {
                return this.permissionRepository
                    .getAvailablePermissionsCount(assignedArray)
                    .pipe(map(count => {
                        const shapePermissionsResp = shapePermissionsResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "", shapePermissionsResp);
                    }));
            }));
    }

    getAssignablePermissions(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.permissionRepository
            .getAssignablePermissions(number, size, sort, assignedArray)
            .pipe(flatMap(value => {
                return this.permissionRepository
                    .getAssignablePermissionsCount(assignedArray)
                    .pipe(map(count => {
                        const shapePermissionsResp = shapePermissionsResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "", shapePermissionsResp);
                    }));
            }));
    }

}





