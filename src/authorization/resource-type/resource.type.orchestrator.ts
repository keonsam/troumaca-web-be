import { ResourceTypeRepository } from "./resource.type.repository";
import { createResourceTypeRepositoryFactory } from "./resource.type.repository.factory";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { ResourceType } from "./resource.type";
import { shapeResourceTypesResponse } from "./resource.type.response.shaper";
import { Result } from "../../result.success";
import { getSortOrderOrDefault } from "../../sort.order.util";

export class ResourceTypeOrchestrator {

  private resourceTypeRepository: ResourceTypeRepository;

  constructor() {
    this.resourceTypeRepository = createResourceTypeRepositoryFactory();
  }


  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return this.resourceTypeRepository.findResourceTypes(searchStr, pageSize);
  }

  getResourceTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.resourceTypeRepository
      .getResourceTypes(number, size, sort)
      .pipe(flatMap(value => {
        return this.resourceTypeRepository
          .getResourceTypeCount()
          .pipe(map(count => {
            const shapeResourceTypesResp: any = shapeResourceTypesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "resourceTypes", shapeResourceTypesResp);
          }));
      }));
  }

  addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return this.resourceTypeRepository.addResourceType(resourceType);
  }

  getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return this.resourceTypeRepository.getResourceTypeById(resourceTypeId);
  }

  updateResourceType(resourceTypeId: string, resourceType: ResourceType): Observable<number> {
    return this.resourceTypeRepository.updateResourceType(resourceTypeId, resourceType);
  }

  deleteResourceType(resourceTypeId: string): Observable<number> {
    return this.resourceTypeRepository.deleteResourceType(resourceTypeId);
  }

}



