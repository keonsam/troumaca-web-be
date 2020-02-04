import {ResourceDataProvider} from "../../../port/resource.data.provider";
import {createResourceDataProvider} from "../../../infrastructure/authorization/resource.data.provider.factory";
import {Resource} from "../../../domain/model/authorization/resource";
import { Observable, of, throwError } from "rxjs";
import {flatMap, map, switchMap} from "rxjs/operators";
import {shapeResourcesResponse} from "./resource.response.shaper";
import {Result} from "../../../result.success";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {ResourcePermission} from "../../../domain/model/authorization/resource.permission";
import {ResourcePermissionDataProvider} from "../../../port/resource.permission.data.provider";
import {createResourcePermissionDataProvider} from "../../../infrastructure/authorization/resource.permission.data.provider.factory";
import {ResourceTypeDataProvider} from "../../../port/resource.type.data.provider";
import {createResourceTypeDataProvider} from "../../../infrastructure/authorization/resource.type.data.provider.factory";

export class ResourceOrchestrator {

    private resourceRepository: ResourceDataProvider;
    private resourcePermissionRepository: ResourcePermissionDataProvider;
    private resourceTypeRepository: ResourceTypeDataProvider;

    constructor() {
        this.resourceRepository = createResourceDataProvider();
        this.resourcePermissionRepository = createResourcePermissionDataProvider();
        this.resourceTypeRepository = createResourceTypeDataProvider();
    }

    getResources(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.resourceRepository.getResources(number, size, sort)
            .pipe(switchMap((resources: Resource[]) => {
                return this.resourceRepository
                    .getResourceCount()
                    .pipe(map(count => {
                        const shapeResourcesResp: any = shapeResourcesResponse(resources, number, size, resources.length, count, sort);
                        return new Result<any>(false, "resources", shapeResourcesResp);
                    }));
            }));
    }

    addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
        return this.resourceRepository.addResource(resource)
            .pipe(switchMap(value => {
                if (!value) {
                    return throwError(`$Failed to save resource ${value}`);
                }
                const resourceId = value.resourceId;
                resourcePermissions.forEach(val => {
                    val.resourceId = resourceId;
                });
                return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
                    .pipe(map(resourcePermissions => {
                        if (!resourcePermissions) {
                            throw new Error(`Failed to save ${resourcePermissions}`);
                        } else {
                            return value;
                        }
                    }));
            }));
    }

    getResourceById(resourceId: string): Observable<Resource> {
        return this.resourceRepository.getResourceById(resourceId);
    }

    updateResource(resourceId: string, resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
        return this.resourceRepository.updateResource(resourceId, resource)
        .pipe(switchMap(numReplaced => {
          if (!numReplaced) {
              return throwError(`Failed to update ${resourceId} ${numReplaced}`);
          } else {
              return this.resourcePermissionRepository.deleteResourcePermission(resourceId)
                  .pipe(switchMap(numReplaced2 => {
                      return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
                          .pipe(map(docs => {
                              if (!docs) return 0;
                              return numReplaced;
                          }));
                  }));
          }
        }));
    }

    deleteResource(resourceId: string): Observable<number> {
        return this.resourceRepository.deleteResource(resourceId);
    }

    // OTHERS

    getResourcesByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.resourceRepository
            .getResourcesByArray(number, size, sort, assignedArray)
            .pipe(flatMap(value => {
                return this.resourceRepository
                    .getResourceCount()
                    .pipe(map(count => {
                        const shapeResourcesResp = shapeResourcesResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "", shapeResourcesResp);
                    }));
            }));
    }

    getAssignedResourcesByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.resourceRepository
            .getAssignedResourcesByArray(number, size, sort, assignedArray)
            .pipe(flatMap(value => {
                return this.resourceRepository
                    .getResourceCount()
                    .pipe(map(count => {
                        const shapeResourcesResp = shapeResourcesResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "", shapeResourcesResp);
                    }));
            }));
    }
}



