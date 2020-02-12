import {grants} from "../../../db";
import {GrantDataProvider} from "../../../port/grant.data.provider";
import {Grant} from "../../../domain/model/authorization/grant";
import {Observable, Observer} from "rxjs";
// import {RepositoryKind} from "../../../repository.kind";
import {generateUUID} from "../../../uuid.generator";

export class NedbGrantDataProvider implements GrantDataProvider {

  getGrantsByAccessRoleId(accessRoleId: string): Observable<Grant[]> {
    const query = {
      "accessRoleId": accessRoleId
    };
    return Observable.create(function (observer: Observer<Grant[]>) {
      grants.find(query, function (err: any, docs: any[]) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  addGrant(grant: Grant[]): Observable<Grant[]> {
    grant.forEach(value => {
      if (!value.grantId) {
        value.grantId = generateUUID();
      }
    });
    return Observable.create(function (observer: Observer<Grant[]>) {
      grants.insert(grant, function (err: any, docs: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(grant);
        }
        observer.complete();
      });
    });
  }

  deleteGrant(accessRoleId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "accessRoleId": accessRoleId
      };
      grants.remove(query, {multi: true}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getGrantById(grantId: string, ownerParyId: string): Observable<Grant> {
    return Observable.create(function (observer: Observer<Grant>) {
      const query = {
        "grantId": grantId
      };
      grants.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateGrant(grantId: string, grant: Grant): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "grantId": grantId
      };
      grants.update(query, grant, {}, function (err: any, numReplaced: number) {
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