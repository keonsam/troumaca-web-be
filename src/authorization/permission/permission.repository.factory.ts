import Rx from "rxjs";
import {permissions} from "../../db";
import {PermissionRepository} from "./permission.repository";
import {Permission} from "./permission";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";
import {Observer} from "rxjs/Observer";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

class PermissionDBRepository implements PermissionRepository {

  private defaultPageSize:number = 10;


  getPermissionsByArray(pageNumber:number, pageSize:number, order:string, assignedArray:string[]):Observable<Permission[]> {
    return Rx.Observable.create(function (observer:Observer<Permission[]>) {
      let skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      permissions.find({ permissionId: { $nin: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getResourcePermissionsByArray(pageNumber:number, pageSize:number, order:string, assignedArray:string[]):Observable<Permission[]> {
    return Rx.Observable.create(function (observer:Observer<Permission[]>) {
      let skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      permissions.find({ permissionId: { $in: assignedArray }}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getPermissions(pageNumber:number, pageSize:number, order:string):Observable<Permission[]> {
    let localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer:Observer<Permission[]>) {
      let skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      permissions.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getPermissionCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      permissions.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  addPermission(permission: Permission): Observable<Permission> {
    permission.permissionId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Permission>) {
      permissions.insert(permission, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(permission);
        }
        observer.complete();
      });
    });
  }

  deletePermission(permissionId: string): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  }

  getPermissionById(permissionId: string): Observable<Permission> {
    return Rx.Observable.create(function (observer:Observer<Permission>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updatePermission(permissionId: string, permission: Permission): Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "permissionId":permissionId
      };
      permissions.update(query, permission, {}, function (err:any, numReplaced:number) {
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


class PermissionRestRepository implements PermissionRepository {

  getPermissionsByArray(pageNumber:number, pageSize:number, order:string, assignedArray:string[]):Observable<Permission[]> {
    return undefined;
  }

  getResourcePermissionsByArray(pageNumber:number, pageSize:number, order:string, assignedArray:string[]):Observable<Permission[]> {
    return undefined;
  }

  getAllPermissions():Observable<Permission[]> {
    return undefined;
  }

  getPermissions(pageNumber:number, pageSize:number, order:string):Observable<Permission[]> {
    return undefined;
  }

  getPermissionCount(): Observable<number> {
    return undefined;
  }

  addPermission(permission: Permission): Observable<Permission> {
    return undefined;
  }

  deletePermission(permissionId: string): Observable<number> {
    return undefined;
  }

  getPermissionById(permissionId: string): Observable<Permission> {
    return undefined;
  }

  updatePermission(permissionId: string, permission: Permission): Observable<number> {
    return undefined;
  }

}

export function createPermissionRepositoryFactory(kind?:RepositoryKind):PermissionRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PermissionDBRepository();
    case RepositoryKind.Rest:
      return new PermissionRestRepository();
    default:
      return new PermissionDBRepository();
  }
}



