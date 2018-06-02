import Rx from "rxjs";
import {resourcePermissions} from "../../db";
import {ResourcePermissionRepository} from "./resource.permission.repository";
import {ResourcePermission} from "./resource.permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";

class ResourcePermissionDBRepository implements ResourcePermissionRepository {

  getAllResourcePermissions(): Observable<ResourcePermission[]> {
    return Rx.Observable.create(function(observer:Observer<ResourcePermission[]>) {
      resourcePermissions.find({}, function (err:any, docs:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(docs);
        }
        observer.complete();
      });
    });
  };

  getResourcePermissionsByResourceId(resourceId:string):Observable<ResourcePermission[]> {
    return Rx.Observable.create(function(observer:Observer<ResourcePermission[]>) {
      resourcePermissions.find({resourceId}, function (err:any, docs:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(docs);
        }
        observer.complete();
      });
    });
  };

  addResourcePermission(resourcePermission: ResourcePermission[]): Observable<ResourcePermission[]> {
    // more than one here
    resourcePermission.forEach(value => {
      if(!value.resourcePermissionId) {
        value.resourcePermissionId = generateUUID();
      }
    });
    return Rx.Observable.create(function(observer:Observer<ResourcePermission[]>) {
      resourcePermissions.insert(resourcePermission, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteResourcePermission(resourceId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourceId":resourceId
      };
      resourcePermissions.remove(query, {multi: true}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return Rx.Observable.create(function (observer:Observer<ResourcePermission>) {
      let query = {
        "resourcePermissionId":resourcePermissionId
      };
      resourcePermissions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "resourcePermissionId":resourcePermissionId
      };
      resourcePermissions.update(query, resourcePermission, {}, function (err:any, numReplaced:number) {
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


class ResourcePermissionRestRepository implements ResourcePermissionRepository {

  getAllResourcePermissions(): Observable<ResourcePermission[]> {
    return undefined;
  }

  getResourcePermissionsByResourceId(resourceId:string):Observable<ResourcePermission[]> {
    return undefined;
  }

  addResourcePermission(resourcePermission: ResourcePermission[]): Observable<ResourcePermission[]> {
    return undefined;
  }

  deleteResourcePermission(resourceId: string): Observable<number> {
    return undefined;
  }

  getResourcePermissionById(resourcePermissionId: string, ownerPartyId: string): Observable<ResourcePermission> {
    return undefined;
  }

  updateResourcePermission(resourcePermissionId: string, resourcePermission: ResourcePermission): Observable<number> {
    return undefined;
  }

}

export function createResourcePermissionRepositoryFactory(kind?:RepositoryKind):ResourcePermissionRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ResourcePermissionDBRepository();
    case RepositoryKind.Rest:
      return new ResourcePermissionRestRepository();
    default:
      return new ResourcePermissionDBRepository();
  }
}



