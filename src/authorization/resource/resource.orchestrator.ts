import { ResourceRepository } from "./resource.repository";
import { createResourceRepositoryFactory } from "./resource.repository.factory";
import { Observable, of } from "rxjs";
import { flatMap, map, switchMap } from "rxjs/operators";
import { Resource } from "./resource";
import { shapeResourcesResponse } from "./resource.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { ResourcePermission } from "../resource-permission/resource.permission";
import { ResourcePermissionRepository } from "../resource-permission/resource.permission.repository";
import { createResourcePermissionRepositoryFactory } from "../resource-permission/resource.permission.repository.factory";
import { ResourceTypeRepository } from "../resource-type/resource.type.repository";
import { createResourceTypeRepositoryFactory } from "../resource-type/resource.type.repository.factory";
import { ResourceType } from "../resource-type/resource.type";

export class ResourceOrchestrator {

  private resourceRepository: ResourceRepository;
  private resourcePermissionRepository: ResourcePermissionRepository;
  private resourceTypeRepository: ResourceTypeRepository;

  constructor() {
    this.resourceRepository = createResourceRepositoryFactory();
    this.resourcePermissionRepository = createResourcePermissionRepositoryFactory();
    this.resourceTypeRepository = createResourceTypeRepositoryFactory();
  }

  getResourcesByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.resourceRepository
      .getResourcesByArray(number, size, sort, assignedArray)
      .pipe(flatMap(value => {
        return this.resourceRepository
          .getResourceCount()
          .pipe(map(count => {
            const shapeResourcesResp = shapeResourcesResponse( value, number, size, value.length, count, sort);
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
            const shapeResourcesResp = shapeResourcesResponse( value, number, size, value.length, count, sort);
            return new Result<any>(false, "", shapeResourcesResp);
          }));
      }));
  }
  
  getResources(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.resourceRepository.getResources(number, size, sort)
      .pipe(switchMap((resources: Resource[]) => {
        if (resources.length === 0) {
          const shapeResourcesResp: any = shapeResourcesResponse(resources, 0, 0, 0, 0, sort);
          return of(new Result<any>(false, "no data found", shapeResourcesResp));
        } else {
          const resourceTypeIds: string[] = resources.map(x => { if (x.resourceTypeId) return x.resourceTypeId; });
          return this.resourceTypeRepository.getResourceTypeByIds(resourceTypeIds)
            .pipe(switchMap((resourceTypes: ResourceType[]) => {
              resources.forEach(value => {
                const index = resourceTypes.findIndex(x => x.resourceTypeId === value.resourceTypeId);
                value.resourceType = index !== -1 ? resourceTypes[index] : new ResourceType();
              });
              return this.resourceRepository
                .getResourceCount()
                .pipe(map(count => {
                  const shapeResourcesResp: any = shapeResourcesResponse(resources, number, size, resources.length, count, sort);
                  return new Result<any>(false, "resources", shapeResourcesResp);
                }));
          }));
        }
      }));
  }

  addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
    return this.resourceRepository.addResource(resource)
      .pipe(switchMap( value => {
        if (!value || resourcePermissions.length === 0) return of(value);
        const resourceId = value.resourceId;
        resourcePermissions.forEach(val => {
            val.resourceId = resourceId;
        });
          return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
            .pipe(map( resourcePermissions => {
              if (!resourcePermissions) return new Resource();
                return value;
            }));
      }));
  }

  getResourceById(resourceId: string): Observable<Resource> {
    return this.resourceRepository.getResourceById(resourceId)
      .pipe(switchMap((resource: Resource) => {
        return this.resourceTypeRepository.getResourceTypeById(resource.resourceTypeId)
          .pipe(map(resourceType => {
              resource.resourceType = resourceType ? resourceType : new ResourceType();
              return resource;
        }));
      }));
  }

  updateResource(resourceId: string, resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
    return this.resourceRepository.updateResource(resourceId, resource)
      .pipe(switchMap( numReplaced => {
        if (!numReplaced || resourcePermissions.length === 0) return of(numReplaced);
        return this.resourcePermissionRepository.deleteResourcePermission(resourceId)
            .pipe(switchMap(numReplaced2 => {
                return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
                  .pipe(map( docs => {
                      if (!docs) return 0;
                      return numReplaced;
                  }));
            }));
      }));
  }

  deleteResource(resourceId: string): Observable<number> {
    return this.resourceRepository.deleteResource(resourceId);
  }

}



