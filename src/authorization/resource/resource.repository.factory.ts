import Rx from "rxjs";
import { resources } from "../../db";
import { ResourceRepository } from "./resource.repository";
import { Resource } from "./resource";
import { Observable ,  Observer } from "rxjs";
import { RepositoryKind } from "../../repository.kind";
import { generateUUID } from "../../uuid.generator";
import { calcSkip } from "../../db.util";

class ResourceDBRepository implements ResourceRepository {

  private defaultPageSize: number = 10;

  getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
    return Rx.Observable.create(function (observer: Observer<Resource[]>) {
      const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      resources.find({ resourceId: { $nin: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
    return Rx.Observable.create(function (observer: Observer<Resource[]>) {
      const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      resources.find({ resourceId: { $in: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResources(pageNumber: number, pageSize: number, order: string): Observable<Resource[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer: Observer<Resource[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      resources.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourceCount(): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      resources.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addResource(resource: Resource): Observable<Resource> {
    resource.resourceId = generateUUID();
    return Rx.Observable.create(function(observer: Observer<Resource>) {
      resources.insert(resource, function(err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resource);
        }
        observer.complete();
      });
    });
  }

  deleteResource(resourceId: string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourceId": resourceId
      };
      resources.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourceById(resourceId: string): Observable<Resource> {
    return Rx.Observable.create(function (observer: Observer<Resource>) {
      const query = {
        "resourceId": resourceId
      };
      resources.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResource(resourceId: string, resource: Resource): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourceId": resourceId
      };
      resources.update(query, resource, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}


class ResourceRestRepository implements ResourceRepository {


  getResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
    return undefined;
  }

  getAssignedResourcesByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Resource[]> {
    return undefined;
  }

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

}

export function createResourceRepositoryFactory(kind?: RepositoryKind): ResourceRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ResourceDBRepository();
    case RepositoryKind.Rest:
      return new ResourceRestRepository();
    default:
      return new ResourceDBRepository();
  }
}

