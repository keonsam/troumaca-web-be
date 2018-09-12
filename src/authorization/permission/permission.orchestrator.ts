import { PermissionRepository } from "../../repository/permission.repository";
import { createPermissionRepositoryFactory } from "./permission.repository.factory";
import { Observable } from "rxjs/Observable";
import { Permission } from "../../data/authorization/permission";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { Result } from "../../result.success";
import { shapePermissionsResponse } from "./permission.response.shaper";

export class PermissionOrchestrator {

  private permissionRepository: PermissionRepository;

  constructor() {
    this.permissionRepository = createPermissionRepositoryFactory();
  }

  getPermissionsByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.permissionRepository
      .getPermissionsByArray(number, size, sort, assignedArray)
      .flatMap(value => {
        return this.permissionRepository
          .getPermissionCount()
          .map(count => {
            const shapePermissionsResp = shapePermissionsResponse( value, number, size, value.length, count, sort);
            return new Result<any>(false, "", shapePermissionsResp);
          });
      });
  }

  getResourcePermissionsByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.permissionRepository
      .getResourcePermissionsByArray(number, size, sort, assignedArray)
      .flatMap(value => {
        return this.permissionRepository
          .getPermissionCount()
          .map(count => {
            const shapePermissionsResp = shapePermissionsResponse( value, number, size, value.length, count, sort);
            return new Result<any>(false, "", shapePermissionsResp);
          });
      });
  }

  getPermissions(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.permissionRepository
      .getPermissions(number, size, sort)
      .flatMap(value => {
        return this.permissionRepository
          .getPermissionCount()
          .map(count => {
            const shapePermissionsResp: any = shapePermissionsResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "permissions", shapePermissionsResp);
          });
      });
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

}





