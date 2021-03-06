import {ResourcePermissionDataProvider} from "../../../port/resource.permission.data.provider";
import {ResourcePermission} from "../../../domain/model/authorization/resource.permission";
import {permissions, resourcePermissions} from "../../../db";
import {Observable, Observer, of} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {map, switchMap} from "rxjs/operators";
import {Permission} from "../../../domain/model/authorization/permission";

export class NedbResourcePermissionDataProvider implements ResourcePermissionDataProvider {

  // getAllResourcePermissions(): Observable<ResourcePermission[]> {
  //   return Observable.create(function (observer: Observer<ResourcePermission[]>) {
  //     resourcePermissions.find({}, function (err: any, docs: any) {
  //       if (err) {
  //         observer.error(err);
  //       } else {
  //         observer.next(docs);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]> {
    return this.getResourcePermissionsByResourceIdLocal(resourceId)
      .pipe(switchMap(resourcePermissions => {
        if (!resourcePermissions) return of(resourcePermissions);
        const permissionIds: string[] = resourcePermissions.map(x => x.permissionId);
        return this.getPermissionsLocalByIds(permissionIds)
          .pipe(map(permissions => {
              if (!permissions) return resourcePermissions;
              resourcePermissions.forEach(value => {
                value.permission  = permissions.find(x => x.permissionId === value.permissionId);
              });
              return resourcePermissions;
            }
          ));
      }));
  }

  getResourcePermissionsByResourceIds(resourceIds: string[]): Observable<ResourcePermission[]> {
    return this.getResourcePermissionsByResourceIdsLocal(resourceIds)
      .pipe(switchMap(resourcePermissions => {
        if (!resourcePermissions) return of(resourcePermissions);
        const permissionIds: string[] = resourcePermissions.map(x => x.permissionId);
        return this.getPermissionsLocalByIds(permissionIds)
          .pipe(map(permissions => {
              if (!permissions) return resourcePermissions;
              resourcePermissions.forEach(value => {
                value.permission = permissions.find(x => x.permissionId === value.permissionId);
              });
              return resourcePermissions;
            }
          ));
      }));
  }

  addResourcePermission(resourcePermission: ResourcePermission[]): Observable<ResourcePermission[]> {
    // more than one here
    resourcePermission.forEach(value => {
      if (!value.resourcePermissionId) {
        value.resourcePermissionId = generateUUID();
      }
    });
    return Observable.create(function (observer: Observer<ResourcePermission[]>) {
      resourcePermissions.insert(resourcePermission, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteResourcePermission(resourceId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourceId": resourceId
      };
      resourcePermissions.remove(query, {multi: true}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return Observable.create(function (observer: Observer<ResourcePermission>) {
      const query = {
        "resourcePermissionId": resourcePermissionId
      };
      resourcePermissions.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourcePermissionId": resourcePermissionId
      };
      resourcePermissions.update(query, resourcePermission, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  private getResourcePermissionsByResourceIdLocal(resourceId: string): Observable<ResourcePermission[]> {
    return Observable.create(function (observer: Observer<ResourcePermission[]>) {
      resourcePermissions.find({resourceId}, function (err: any, docs: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(docs);
        }
        observer.complete();
      });
    });
  }

  private getResourcePermissionsByResourceIdsLocal(resourceIds: string[]): Observable<ResourcePermission[]> {
    return Observable.create(function (observer: Observer<ResourcePermission[]>) {
      resourcePermissions.find({resourceId: {$in: resourceIds}}, function (err: any, docs: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(docs);
        }
        observer.complete();
      });
    });
  }

  private getPermissionsLocalByIds(permissionIds: string[]): Observable<Permission[]> {
    return Observable.create((observer: Observer<Permission[]>) => {
      permissions.find({permissionId: {$in: permissionIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}


