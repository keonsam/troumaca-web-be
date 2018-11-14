import {resourceTypes} from "../../db";
import {ResourceTypeRepository} from "../../repository/resource.type.repository";
import {ResourceType} from "../../data/authorization/resource.type";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

export class ResourceTypeRepositoryDbAdapter implements ResourceTypeRepository {

  private defaultPageSize: number = 10;

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<ResourceType[]>) {
        resourceTypes.find(query).limit(100).exec(function (err: any, doc: any) {
            if (!err) {
                observer.next(doc);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
  }

  getResourceTypes(pageNumber: number, pageSize: number, order: string): Observable<ResourceType[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<ResourceType[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      resourceTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourceTypeCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      resourceTypes.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    resourceType.resourceTypeId = generateUUID();
    return Observable.create(function (observer: Observer<ResourceType>) {
      resourceTypes.insert(resourceType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(resourceType);
        }
        observer.complete();
      });
    });
  }

  deleteResourceType(resourceTypeId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourceTypeId": resourceTypeId
      };
      resourceTypes.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return Observable.create(function (observer: Observer<ResourceType>) {
      const query = {
        "resourceTypeId": resourceTypeId
      };
      resourceTypes.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getResourceTypeByIds(resourceTypeIds: string[]): Observable<ResourceType[]> {
    return Observable.create(function (observer: Observer<ResourceType[]>) {
      // let query = {
      //   "resourceTypeId":resourceTypeId
      // };
      resourceTypes.find({resourceTypeId: {$in: resourceTypeIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResourceType(resourceTypeId: string, resourceType: ResourceType): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "resourceTypeId": resourceTypeId
      };
      resourceTypes.update(query, resourceType, {}, function (err: any, numReplaced: number) {
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

