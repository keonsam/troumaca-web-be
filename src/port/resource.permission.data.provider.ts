import {ResourcePermission} from "../domain/model/authorization/resource.permission";
import {Observable} from "rxjs";

export interface ResourcePermissionDataProvider {

  // getAllResourcePermissions(): Observable<ResourcePermission[]>;

  getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]>;

  getResourcePermissionsByResourceIds(resourceIds: string[]): Observable<ResourcePermission[]>;

  addResourcePermission(resourcePermissions: ResourcePermission[]): Observable<ResourcePermission[]>;

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission>;

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number>;

  deleteResourcePermission(resourceId: string): Observable<number>;

}
