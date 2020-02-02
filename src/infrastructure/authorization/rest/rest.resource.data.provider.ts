import {ResourceDataProvider} from "../../../port/resource.data.provider";
import {Resource} from "../../../domain/model/authorization/resource";
import {Observable} from "rxjs";

export class RestResourceDataProvider implements ResourceDataProvider {

    getResources(pageNumber: number, pageSize: number, order: string): Observable<Resource[]> {
        return undefined;
    }

    getResourceCount(): Observable<number> {
        return undefined;
    }

    addResource(resource: Resource): Observable<Resource> {
        return undefined;
    }

    deleteResource(resourceId: string): Observable<number> {
        return undefined;
    }

    getResourceById(resourceId: string): Observable<Resource> {
        return undefined;
    }

    updateResource(resourceId: string, resource: Resource): Observable<number> {
        return undefined;
    }

    // OTHERS

    getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
        return undefined;
    }

    getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
        return undefined;
    }
}


