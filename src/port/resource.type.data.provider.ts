import {ResourceType} from "../domain/model/authorization/resource.type";
import {Observable} from "rxjs";

export interface ResourceTypeDataProvider {

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]>;

  getResourceTypes(number: number, size: number, sort: string): Observable<ResourceType[]>;

  getResourceTypeCount(): Observable<number>;

  addResourceType(resourceType: ResourceType): Observable<ResourceType>;

  getResourceTypeById(resourceTypeId: string): Observable<ResourceType>;

  getResourceTypeByIds(resourceTypeIds: string[]): Observable<ResourceType[]>;


  updateResourceType(resourceTypeId: string, resourceType: ResourceType): Observable<number>;

  deleteResourceType(resourceTypeId: string): Observable<number>;

}

