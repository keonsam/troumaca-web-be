import {accessRoleTypes} from "../../../db";
import {AccessRoleTypeDataProvider} from "../../../port/access.role.type.data.provider";
import {AccessRoleType} from "../../../domain/model/authorization/access.role.type";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {calcSkip} from "../../../db.util";
import {Affect} from "../../../domain/model/affect";

export class NedbAccessRoleTypeDataProvider implements AccessRoleTypeDataProvider {

  private defaultPageSize: number = 10;

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<AccessRoleType[]>) {
        accessRoleTypes.find(query).limit(100).exec(function (err: any, doc: any) {
            if (!err) {
                observer.next(doc);
            } else {
                observer.error(err);
            }
            observer.complete();
        });
    });
  }

  getAccessRoleTypes(pageNumber: number, pageSize: number, order: string): Observable<AccessRoleType[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<AccessRoleType[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      accessRoleTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleTypeCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      accessRoleTypes.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    accessRoleType.accessRoleTypeId = generateUUID();
    return Observable.create(function (observer: Observer<AccessRoleType>) {
      accessRoleTypes.insert(accessRoleType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(accessRoleType);
        }
        observer.complete();
      });
    });
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      const query = {
        "accessRoleTypeId": accessRoleTypeId
      };
      accessRoleTypes.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(new Affect(numRemoved));
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return Observable.create(function (observer: Observer<AccessRoleType>) {
      const query = {
        "accessRoleTypeId": accessRoleTypeId
      };
      accessRoleTypes.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAccessRoleTypeByIds(accessRoleTypeIds: string[]): Observable<AccessRoleType[]> {
    return Observable.create(function (observer: Observer<AccessRoleType[]>) {
      // let query = {
      //   "accessRoleTypeId":accessRoleTypeId
      // };
      accessRoleTypes.find({accessRoleTypeId: {$in: accessRoleTypeIds}}, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      const query = {
        "accessRoleTypeId": accessRoleTypeId
      };
      accessRoleTypes.update(query, accessRoleType, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(new Affect(numReplaced));
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}

