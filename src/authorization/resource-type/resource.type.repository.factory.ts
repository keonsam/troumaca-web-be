import Rx from "rxjs";
import {resourceTypes} from "../../db";
import {ResourceTypeRepository} from "./resource.type.repository";
import {ResourceType} from "./resource.type";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

class ResourceTypeDBRepository implements ResourceTypeRepository {

  private defaultPageSize:number = 10;

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<ResourceType[]>) {
      if (!searchStr) {
        resourceTypes.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        resourceTypes.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
      ;
    });
  }

  getResourceTypes(pageNumber:number, pageSize:number, order:string):Observable<ResourceType[]> {
    let localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<ResourceType[]>) {
      let skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      resourceTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getResourceTypeCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      resourceTypes.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    resourceType.resourceTypeId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<ResourceType>) {
      resourceTypes.insert(resourceType, function(err:any, doc:any) {
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
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourceTypeId":resourceTypeId
      };
      resourceTypes.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    return Rx.Observable.create(function (observer:Observer<ResourceType>) {
      let query = {
        "resourceTypeId":resourceTypeId
      };
      resourceTypes.findOne(query, function (err:any, doc:any) {
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
    return Rx.Observable.create(function (observer:Observer<ResourceType[]>) {
      // let query = {
      //   "resourceTypeId":resourceTypeId
      // };
      resourceTypes.find({resourceTypeId:{$in:resourceTypeIds}}, function (err:any, docs:any) {
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
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourceTypeId":resourceTypeId
      };
      resourceTypes.update(query, resourceType, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

}

class ResourceTypeRestRepository implements ResourceTypeRepository {

  findResourceTypes(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    return undefined;
  }

  getResourceTypes(pageNumber:number, pageSize:number, order:string):Observable<ResourceType[]> {
    return undefined;
  }

  getResourceTypeCount():Observable<number> {
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

export function createResourceTypeRepositoryFactory(kind?:RepositoryKind):ResourceTypeRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ResourceTypeDBRepository();
    case RepositoryKind.Rest:
      return new ResourceTypeRestRepository();
    default:
      return new ResourceTypeDBRepository();
  }
}

