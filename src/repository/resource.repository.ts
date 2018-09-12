import { Observable } from "rxjs/Observable";
import { Resource } from "../data/authorization/resource";

export interface ResourceRepository {

  getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]>;

  getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]>;

  getResources(number: number, size: number, sort: string): Observable<Resource[]>;

  getResourceCount(): Observable<number>;

  addResource(resource: Resource): Observable<Resource>;

  getResourceById(resourceId: string): Observable<Resource>;

  updateResource(resourceId: string, resource: Resource): Observable<number>;

  deleteResource(resourceId: string): Observable<number>;

}

