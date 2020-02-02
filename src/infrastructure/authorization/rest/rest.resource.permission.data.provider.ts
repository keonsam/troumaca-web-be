import {ResourcePermissionDataProvider} from "../../../port/resource.permission.data.provider";
import {ResourcePermission} from "../../../domain/model/authorization/resource.permission";
import {permissions, resourcePermissions} from "../../../db";
import {Observable, Observer, of} from "rxjs";
import {RepositoryKind} from "../../../repository.kind";
import {generateUUID} from "../../../uuid.generator";
import {map, switchMap} from "rxjs/operators";
import {Permission} from "../../../domain/model/authorization/permission";

export class RestResourcePermissionDataProvider implements ResourcePermissionDataProvider {

  // getAllResourcePermissions(): Observable<ResourcePermission[]> {
  //   return undefined;
  // }

  getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]> {
    return undefined;
  }

  getResourcePermissionsByResourceIds(resourceIds: string[]): Observable<ResourcePermission[]> {
    return undefined;
  }

  addResourcePermission(resourcePermission: ResourcePermission[]): Observable<ResourcePermission[]> {
    return undefined;
  }

  deleteResourcePermission(resourceId: string): Observable<number> {
    return undefined;
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return undefined;
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return undefined;
  }

}


