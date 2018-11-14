import { permissions, resourcePermissions, resources, resourceTypes } from "../../db";
import {ResourceRepository} from "../../repository/resource.repository";
import {Resource} from "../../data/authorization/resource";
import { Observable, Observer, throwError } from "rxjs";
import {RepositoryKind} from "../../repository.kind";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";
import { map, switchMap } from "rxjs/operators";
import { ResourceType } from "../../data/authorization/resource.type";
import { ResourcePermission } from "../../data/authorization/resource.permission";
import { Permission } from "../../data/authorization/permission";

export  class ResourceRepositoryDbAdapter implements ResourceRepository {

    private defaultPageSize: number = 10;

    getResources(pageNumber: number, pageSize: number, order: string): Observable<Resource[]> {
        return this.getResourcesLocal(pageNumber, pageSize, order)
            .pipe(switchMap(resources => {
                const resourceTypeIds = resources.map(x => x.resourceTypeId);
                return this.getResourceTypesByIds(resourceTypeIds)
                    .pipe(switchMap(resourceTypes => {

                        const resourceIds = resources.map(x => x.resourceId);
                        return this.getResourcePermissionsByIds(resourceIds)
                            .pipe(map(resourcePermissions => {
                                resources.forEach(x => {
                                    x.resourceType = resourceTypes.find(v => v.resourceTypeId === x.resourceTypeId);
                                    x.resourcePermissions = resourcePermissions.filter( v => v.resourceId === x.resourceId);
                                });
                                return resources;
                            }));
                    }));
            }));
    }

    getResourceCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            resources.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    addResource(resource: Resource): Observable<Resource> {
        resource.resourceId = generateUUID();
        return Observable.create(function (observer: Observer<Resource>) {
            resources.insert(resource, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(resource);
                }
                observer.complete();
            });
        });
    }

    deleteResource(resourceId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "resourceId": resourceId
            };
            resources.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getResourceById(resourceId: string): Observable<Resource> {
        return this.getResourceByIdLocal(resourceId)
            .pipe( switchMap( resource => {
              if (!resource) {
                return throwError(`No resource found for ${resourceId} ${resource}`);
              } else {
                return this.getResourceTypesById(resource.resourceTypeId)
                    .pipe( switchMap(resourceType => {
                      resource.resourceType = resourceType;
                      return this.getResourcePermissionsById(resource.resourceId)
                          .pipe( map( resourcePermissions => {
                              resource.resourcePermissions = resourcePermissions;
                              return resource;
                          }));
                    }));
              }
            }));
    }

    updateResource(resourceId: string, resource: Resource): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "resourceId": resourceId
            };
            resources.update(query, resource, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // OTHERS
    getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
        return Observable.create(function (observer: Observer<Resource[]>) {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            resources.find({resourceId: {$nin: assignedArray}}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
        return Observable.create(function (observer: Observer<Resource[]>) {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            resources.find({resourceId: {$in: assignedArray}}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // HELPERS

    private getResourcesLocal(pageNumber: number, pageSize: number, order: string): Observable<Resource[]> {
        const localDefaultPageSize = this.defaultPageSize;
        const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
        return Observable.create(function (observer: Observer<Resource[]>) {
            resources.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getResourceTypesByIds(resourceTypeIds: string[]): Observable<ResourceType[]> {
        return Observable.create(function (observer: Observer<ResourceType[]>) {
            const query = {resourceTypeId: {$in: resourceTypeIds}};
            resourceTypes.find(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getResourceByIdLocal(resourceId: string): Observable<Resource> {
        return Observable.create(function (observer: Observer<Resource>) {
            const query = {
                "resourceId": resourceId
            };
            resources.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getResourceTypesById(resourceTypeId: string): Observable<ResourceType> {
        return Observable.create(function (observer: Observer<ResourceType[]>) {
            const query = {resourceTypeId: resourceTypeId};
            resourceTypes.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getResourcePermissionsById(resourceId: string): Observable<ResourcePermission[]> {
        return Observable.create(function (observer: Observer<ResourcePermission[]>) {
            const query = {resourceId: resourceId};
            resourcePermissions.find(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }


    private getResourcePermissionsByIds(resourceIds: string[]): Observable<ResourcePermission[]> {
        return this.getResourcePermissionsByIdsLocal(resourceIds)
            .pipe(switchMap(resourcePer => {
                const permissionIds = resourcePer.map(x => x.permissionId);
                return this.getPermissionsByIds(permissionIds)
                    .pipe(map(permissions => {
                        resourcePer.forEach( x => {
                            x.permission = permissions.find(v => v.permissionId === x.permissionId);
                        });
                        return resourcePer;
                    }));
            }));
    }

    private getResourcePermissionsByIdsLocal(resourceIds: string[]): Observable<ResourcePermission[]> {
        return Observable.create(function (observer: Observer<ResourcePermission[]>) {
            const query = {resourceId: {$in: resourceIds}};
            resourcePermissions.find(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getPermissionsByIds(permissionIds: string[]): Observable<Permission[]> {
        return Observable.create(function (observer: Observer<Permission[]>) {
            const query = {permissionId: {$in: permissionIds}};
            permissions.find(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}



