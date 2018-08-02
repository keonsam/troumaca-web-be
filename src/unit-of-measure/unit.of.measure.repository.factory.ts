import * as Rx from "rxjs";
import { Observable } from "rxjs/Observable";
import { UnitOfMeasure } from "./unit.of.measure";
import { UnitOfMeasureRepository } from "./unit.of.measure.repository";
import { RepositoryKind } from "../repository.kind";
import { unitOfMeasures } from "../db";
import { Observer } from "rxjs/Observer";

class UnitOfMeasureDBRepository implements UnitOfMeasureRepository {
  findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    const searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<UnitOfMeasure[]>) {
      if (!searchStr) {
        unitOfMeasures.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        unitOfMeasures.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  }

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
    const query = {
      "unitOfMeasureId": unitOfMeasureId
    };
    return Rx.Observable.create(function (observer: Observer<UnitOfMeasure>) {
      unitOfMeasures.findOne(query, function (err: any, doc: any) {
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

class UnitOfMeasureRestRepository implements UnitOfMeasureRepository {
  findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return null;
  }

  getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
    return null;
  }

}

export function createUnitOfMeasureRepository(kind?: RepositoryKind): UnitOfMeasureRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasureDBRepository();
    case RepositoryKind.Rest:
      return new UnitOfMeasureRestRepository();
    default:
      return new UnitOfMeasureDBRepository();
  }
}
