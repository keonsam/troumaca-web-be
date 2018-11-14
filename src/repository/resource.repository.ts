import {Resource} from "../data/authorization/resource";
import {Observable} from "rxjs";

export interface ResourceRepository {

    getResources(number: number, size: number, sort: string): Observable<Resource[]>;

    getResourceCount(): Observable<number>;

    addResource(resource: Resource): Observable<Resource>;

    getResourceById(resourceId: string): Observable<Resource>;

    updateResource(resourceId: string, resource: Resource): Observable<number>;

    deleteResource(resourceId: string): Observable<number>;

    // OTHERS

    getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]>;

    getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]>;

}

