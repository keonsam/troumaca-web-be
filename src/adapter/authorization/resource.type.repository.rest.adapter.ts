import {ResourceTypeRepository} from "../../repository/resource.type.repository";
import {ResourceType} from "../../data/authorization/resource.type";
import {Observable} from "rxjs";

export class ResourceTypeRepositoryRestAdapter implements ResourceTypeRepository {

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return undefined;
  }

  getResourceTypes(pageNumber: number, pageSize: number, order: string): Observable<ResourceType[]> {
    return undefined;
  }

  getResourceTypeCount(): Observable<number> {
    return undefined;
  }

  addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return undefined;
  }

  deleteResourceType(resourceTypeId: string): Observable<number> {
    return undefined;
  }

  getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return undefined;
  }

  getResourceTypeByIds(resourceTypeIds: string[]): Observable<ResourceType[]> {
    return undefined;
  }

  updateResourceType(resourceTypeId: string, resourceType: ResourceType): Observable<number> {
    return undefined;
  }

}
