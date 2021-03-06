import {AccessRoleDataProvider} from "../../../port/access.role.data.provider";
import {AccessRole} from "../../../domain/model/authorization/access.role";
import { Observable, Observer, of } from "rxjs";
import { accessRoles, accessRoleTypes, grants } from "../../../db";
import {calcSkip} from "../../../db.util";
import {generateUUID} from "../../../uuid.generator";
import { map, switchMap } from "rxjs/operators";
import { AccessRoleType } from "../../../domain/model/authorization/access.role.type";
import { Grant } from "../../../domain/model/authorization/grant";
import { HeaderBaseOptions } from "../../../header.base.options";

export class NedbAccessRoleDataProvider implements AccessRoleDataProvider {

  private defaultPageSize: number = 10;

  findAccessRoles(searchStr: string, pageSize: number, options: HeaderBaseOptions): Observable<AccessRole[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<AccessRole[]>) {
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
    return Observable.create(function (observer: Observer<AccessRole[]>) {
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
    return Observable.create(function (observer: Observer<number>) {
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

  addAccessRole(accessRole: AccessRole, options: HeaderBaseOptions): Observable<AccessRole> {
    accessRole.accessRoleId = generateUUID();
    return Observable.create(function (observer: Observer<AccessRole>) {
      accessRoles.insert(accessRole, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAccessRole(accessRoleId: string, options: HeaderBaseOptions): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
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

  getAccessRoleById(accessRoleId: string, options: HeaderBaseOptions): Observable<AccessRole> {
    return this.getAccessRoleByIdLocal(accessRoleId)
        .pipe(switchMap( accessRole => {
          return this.getAccessRoleTypeById(accessRole.accessRoleTypeId)
              .pipe( switchMap(accessRoleType => {
                accessRole.accessRoleType = accessRoleType;
                return this.getGrantsByAccessRoleId(accessRole.accessRoleId)
                    .pipe( map(grants => {
                      accessRole.grants = grants;
                      return accessRole;
                    }));
              }));
        }));
  }

  getAccessRoleByIds(accessRoleIds: string[]): Observable<AccessRole[]> {
    return Observable.create(function (observer: Observer<AccessRole[]>) {
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

  updateAccessRole(accessRoleId: string, accessRole: AccessRole, options: HeaderBaseOptions): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
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

  addAccessRoles(accessRoles: AccessRole[]): Observable<AccessRole[]> {
    return undefined;
  }

  // HELPERS
    private getAccessRoleByIdLocal(accessRoleId: string): Observable<AccessRole> {
        return Observable.create(function (observer: Observer<AccessRole>) {
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

    private getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
        return Observable.create(function (observer: Observer<AccessRoleType>) {
            accessRoleTypes.findOne({accessRoleTypeId}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    private getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]> {
        return Observable.create(function (observer: Observer<Grant[]>) {
            grants.find({accessRoleId}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}
