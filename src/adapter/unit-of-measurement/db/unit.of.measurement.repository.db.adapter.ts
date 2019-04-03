import {UnitOfMeasurementRepository} from "../../../repository/unit.of.measurement.repository";
import {UnitOfMeasurement} from "../../../data/unit-of-measurement/unit.of.measurement";
import {Observable, Observer} from "rxjs";
import {unitOfMeasurements} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { Page } from "../../../data/page/page";
import {generateUUID} from "../../../uuid.generator";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import { UnitOfMeasurements } from "../../../data/unit-of-measurement/unit.of.measurements";

export class UnitOfMeasurementRepositoryNeDbAdapter implements UnitOfMeasurementRepository {
  addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<UnitOfMeasurement> {
    unitOfMeasurement.unitOfMeasurementId = generateUUID();
    unitOfMeasurement.version = generateUUID();
    unitOfMeasurement.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetBrand>) {
      unitOfMeasurements.insert(unitOfMeasurement, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });

  }

  deleteUnitOfMeasurement(unitOfMeasurementId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurements.remove(
        {unitOfMeasurementId: unitOfMeasurementId},
        {},
        function (err: any, numRemoved: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numRemoved));
          }
          observer.complete();
        });
    });
  }

  findUnitOfMeasurements(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurement[]> {
    return Observable.create(function (observer: Observer<AssetBrand[]>) {
      unitOfMeasurements.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        unitOfMeasurements.find({ name: new RegExp(searchStr) })
          .skip(skipAmount)
          .limit(pageSize)
          .exec(
            (err: any, docs: any) => {
              if (!err) {
                observer.next(docs);
              } else {
                observer.error(err);
              }
              observer.complete();
            });
      });
    });
  }

  getUnitOfMeasurementById(unitOfMeasurementId: string, headerOptions?: any): Observable<UnitOfMeasurement> {
    return Observable.create(function (observer: Observer<AssetBrand>) {
      // , ownerPartyId:ownerPartyId
      unitOfMeasurements.find(
        {unitOfMeasurementId: unitOfMeasurementId},
        (err: any, docs: any) => {
          if (!err) {
            observer.next(docs[0]);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
    });
  }

  getUnitOfMeasurementCount(headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      unitOfMeasurements.count(
        { },
        (err: any, count: any) => {
          if (!err) {
            observer.next(count);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
    });
  }

  getUnitOfMeasurements(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<UnitOfMeasurements> {
    return Observable.create(function (observer: Observer<UnitOfMeasurements>) {
      unitOfMeasurements.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        unitOfMeasurements.find({})
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: UnitOfMeasurement[]) => {
            if (!err) {
              observer.next(new UnitOfMeasurements(docs, new Page(pageNumber, pageSize, docs.length, count)));
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

  updateUnitOfMeasurement(unitOfMeasureId: string, unitOfMeasurement: UnitOfMeasurement, headerOptions?: any): Observable<Affect> {
    unitOfMeasurement.version = generateUUID();
    unitOfMeasurement.dateModified = new Date();
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurements.update(
        {unitOfMeasurementId: unitOfMeasureId},
          {$set: unitOfMeasurement },
        { },
        function (err: any, numReplaced: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numReplaced));
          }
          observer.complete();
        });
    });
  }

}
