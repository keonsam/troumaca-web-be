import {permissions} from "../../db";
import {PermissionRepository} from "../../repository/permission.repository";
import {Permission} from "../../data/authorization/permission";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

export class PermissionRepositoryDbAdapter implements PermissionRepository {

  private defaultPageSize: number = 10;

  getPermissions(pageNumber: number, pageSize: number, order: string): Observable<Permission[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<Permission[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      permissions.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPermissionCount(assignedArray?: string[]): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      permissions.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addPermission(permission: Permission): Observable<Permission> {
    permission.permissionId = generateUUID();
    return Observable.create(function (observer: Observer<Permission>) {
      permissions.insert(permission, function (err: any, doc: any) {
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
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "permissionId": permissionId
      };
      permissions.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getPermissionById(permissionId: string): Observable<Permission> {
    return Observable.create(function (observer: Observer<Permission>) {
      const query = {
        "permissionId": permissionId
      };
      permissions.findOne(query, function (err: any, doc: any) {
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
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "permissionId": permissionId
      };
      permissions.update(query, permission, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // OTHERS

    getPermissionsByArray(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<Permission[]>) {
            permissions.find({permissionId: {$nin: assignedArray}}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAvailablePermissionsCount(assignedArray: string[]): Observable<number> {
        const query = {permissionId: {$nin: assignedArray}};
        return Observable.create(function (observer: Observer<number>) {
            permissions.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssignablePermissions(pageNumber: number, pageSize: number, order: string, assignedArray: string[]): Observable<Permission[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<Permission[]>) {
            permissions.find({permissionId: {$in: assignedArray}}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssignablePermissionsCount(assignedArray?: string[]): Observable<number> {
        const query = {permissionId: {$in: assignedArray}};
        return Observable.create(function (observer: Observer<number>) {
            permissions.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}




