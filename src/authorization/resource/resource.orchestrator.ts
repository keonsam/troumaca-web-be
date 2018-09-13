import { ResourceRepository } from "../../repository/resource.repository";
import { createResourceRepositoryFactory } from "../../adapter/authorization/resource.repository.factory";
import { Observable } from "rxjs/Observable";
import { Resource } from "../../data/authorization/resource";
import { shapeResourcesResponse } from "./resource.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { ResourcePermission } from "../../data/authorization/resource.permission";
import { ResourcePermissionRepository } from "../../repository/resource.permission.repository";
import { createResourcePermissionRepositoryFactory } from "../../adapter/authorization/resource.permission.repository.factory";
import { ResourceTypeRepository } from "../../repository/resource.type.repository";
import { createResourceTypeRepositoryFactory } from "../../adapter/authorization/resource.type.repository.factory";
import { ResourceType } from "../../data/authorization/resource.type";

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
      .flatMap(value => {
        return this.resourceRepository
          .getResourceCount()
          .map(count => {
            const shapeResourcesResp = shapeResourcesResponse( value, number, size, value.length, count, sort);
            return new Result<any>(false, "", shapeResourcesResp);
          });
      });
  }

  getAssignedResourcesByArray(number: number, size: number, field: string, direction: string, assignedArray: string[]): Observable<Result<any>> {
    const sort = getSortOrderOrDefault(field, direction);
    return this.resourceRepository
      .getAssignedResourcesByArray(number, size, sort, assignedArray)
      .flatMap(value => {
        return this.resourceRepository
          .getResourceCount()
          .map(count => {
            const shapeResourcesResp = shapeResourcesResponse( value, number, size, value.length, count, sort);
            return new Result<any>(false, "", shapeResourcesResp);
          });
      });
  }
  getResources(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.resourceRepository.getResources(number, size, sort)
      .switchMap((resources: Resource[]) => {
        if (resources.length === 0) {
          const shapeResourcesResp: any = shapeResourcesResponse(resources, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "no data found", shapeResourcesResp));
        } else {
          const resourceTypeIds: string[] = resources.map(x => { if (x.resourceTypeId) return x.resourceTypeId; });
          return this.resourceTypeRepository.getResourceTypeByIds(resourceTypeIds)
            .switchMap((resourceTypes: ResourceType[]) => {
              resources.forEach(value => {
                const index = resourceTypes.findIndex(x => x.resourceTypeId === value.resourceTypeId);
                value.resourceType = index !== -1 ? resourceTypes[index] : new ResourceType();
              });
              return this.resourceRepository
                .getResourceCount()
                .map(count => {
                  const shapeResourcesResp: any = shapeResourcesResponse(resources, number, size, resources.length, count, sort);
                  return new Result<any>(false, "resources", shapeResourcesResp);
                });
          });
        }
      });
  }

  addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
    return this.resourceRepository.addResource(resource)
      .switchMap( value => {
        if (!value || resourcePermissions.length === 0) return Observable.of(value);
        const resourceId = value.resourceId;
        resourcePermissions.forEach(val => {
            val.resourceId = resourceId;
        });
          return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
            .map( resourcePermissions => {
              if (!resourcePermissions) return new Resource();
                return value;
            });
      });
  }

  getResourceById(resourceId: string): Observable<Resource> {
    return this.resourceRepository.getResourceById(resourceId)
      .switchMap((resource: Resource) => {
        return this.resourceTypeRepository.getResourceTypeById(resource.resourceTypeId)
          .map(resourceType => {
              resource.resourceType = resourceType ? resourceType : new ResourceType();
              return resource;
        });
      });
  }

  updateResource(resourceId: string, resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
    return this.resourceRepository.updateResource(resourceId, resource)
      .switchMap( numReplaced => {
        if (!numReplaced || resourcePermissions.length === 0) return Observable.of(numReplaced);
        return this.resourcePermissionRepository.deleteResourcePermission(resourceId)
            .switchMap(numReplaced2 => {
                return this.resourcePermissionRepository.addResourcePermission(resourcePermissions)
                  .map( docs => {
                      if (!docs) return 0;
                      return numReplaced;
                  });
            });
      });
  }

  deleteResource(resourceId: string): Observable<number> {
    return this.resourceRepository.deleteResource(resourceId);
  }

}



