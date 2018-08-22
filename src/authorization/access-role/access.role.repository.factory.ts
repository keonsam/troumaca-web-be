import Rx from "rxjs";
import { accessRoles } from "../../db";
import { AccessRoleRepository } from "./access.role.repository";
import { AccessRole } from "./access.role";
import { Observable ,  Observer } from "rxjs";
import { RepositoryKind } from "../../repository.kind";
import { generateUUID } from "../../uuid.generator";
import { calcSkip } from "../../db.util";

class AccessRoleDBRepository implements AccessRoleRepository {

  private defaultPageSize: number = 10;

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Rx.Observable.create(function(observer: Observer<AccessRole[]>) {
        accessRoles.find(query).limit(100).exec(function (err: any, doc: any) {
            if (!err) {
                observer.next(doc);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
  }

  getAccessRoles(pageNumber: number, pageSize: number, order: string): Observable<AccessRole[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer: Observer<AccessRole[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      accessRoles.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleCount(): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      accessRoles.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    accessRole.accessRoleId = generateUUID();
    return Rx.Observable.create(function(observer: Observer<AccessRole>) {
      accessRoles.insert(accessRole, function(err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "accessRoleId": accessRoleId
      };
      accessRoles.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    return Rx.Observable.create(function (observer: Observer<AccessRole>) {
      const query = {
        "accessRoleId": accessRoleId
      };
      accessRoles.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]> {
    return Rx.Observable.create(function (observer: Observer<AccessRole[]>) {
      // let query = {
      //   "accessRoleId":accessRoleId
      // };
      accessRoles.find({accessRoleId: {$in: accessRoleIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "accessRoleId": accessRoleId
      };
      accessRoles.update(query, accessRole, {}, function (err: any, numReplaced: number) {
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


class AccessRoleRestRepository implements AccessRoleRepository {

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return undefined;
  }

  getAccessRoles(pageNumber: number, pageSize: number, order: string): Observable<AccessRole[]> {
    return undefined;
  }

  getAccessRoleCount(): Observable<number> {
    return undefined;
  }

  addAccessRole(accessRole: AccessRole): Observable<AccessRole> {
    return undefined;
  }

  deleteAccessRole(accessRoleId: string): Observable<number> {
    return undefined;
  }

  getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    return undefined;
  }

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]> {
    return undefined;
  }

  updateAccessRole(accessRoleId: string, accessRole: AccessRole): Observable<number> {
    return undefined;
  }

}

export function createAccessRoleRepositoryFactory(kind?: RepositoryKind): AccessRoleRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AccessRoleDBRepository();
    case RepositoryKind.Rest:
      return new AccessRoleRestRepository();
    default:
      return new AccessRoleDBRepository();
  }
}
