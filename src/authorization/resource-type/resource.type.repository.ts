import {Observable} from "rxjs/Observable";
import {ResourceType} from "./resource.type";

export interface ResourceTypeRepository {

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]>;

  getResourceTypes(number: number, size: number, sort:string):Observable<ResourceType[]>;

  getResourceTypeCount():Observable<number>;

  addResourceType(resourceType:ResourceType):Observable<ResourceType>;

  getResourceTypeById(resourceTypeId:string):Observable<ResourceType>;

  getResourceTypeByIds(resourceTypeIds:string[]):Observable<ResourceType[]>;


  updateResourceType(resourceTypeId:string, resourceType:ResourceType):Observable<number>;

  deleteResourceType(resourceTypeId:string):Observable<number>;

}

