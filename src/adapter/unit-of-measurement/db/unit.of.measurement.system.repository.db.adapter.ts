import {UnitOfMeasurementSystemRepository} from "../../../repository/unit.of.measurement.system.repository";
import {UnitOfMeasurementSystem} from "../../../data/unit-of-measurement/unit.of.measurement.system";
import {Observable, Observer} from "rxjs";
import {unitOfMeasurementSystems} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class UnitOfMeasurementSystemRepositoryNeDbAdapter implements UnitOfMeasurementSystemRepository {
  addUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    unitOfMeasurementSystem.unitOfMeasurementSystemId = generateUUID();
    unitOfMeasurementSystem.version = generateUUID();
    unitOfMeasurementSystem.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetBrand>) {
      unitOfMeasurementSystems.insert(unitOfMeasurementSystem, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });

  }

  deleteUnitOfMeasurementSystem(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementSystems.remove(
        {unitOfMeasurementSystemId: unitOfMeasurementSystemId, ownerPartyId: ownerPartyId},
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

  findUnitOfMeasurementSystems(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementSystem[]> {
    return Observable.create(function (observer: Observer<AssetBrand[]>) {
      unitOfMeasurementSystems.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        unitOfMeasurementSystems.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getUnitOfMeasurementSystemById(unitOfMeasurementSystemId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementSystem> {
    return Observable.create(function (observer: Observer<AssetBrand>) {
      // , ownerPartyId:ownerPartyId
      unitOfMeasurementSystems.find(
        {unitOfMeasurementSystemId: unitOfMeasurementSystemId},
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

  getUnitOfMeasurementSystemCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      unitOfMeasurementSystems.count(
        {ownerPartyId: ownerPartyId},
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

  getUnitOfMeasurementSystems(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementSystem[]>> {
    return Observable.create(function (observer: Observer<Page<AssetBrand[]>>) {
      unitOfMeasurementSystems.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        unitOfMeasurementSystems.find({ownerPartyId: ownerPartyId})
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: any) => {
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

  updateUnitOfMeasurementSystem(unitOfMeasurementSystem: UnitOfMeasurementSystem, headerOptions?: any): Observable<Affect> {
    unitOfMeasurementSystem.version = generateUUID();
    unitOfMeasurementSystem.dateModified = new Date();
    // ownerPartyId:unitOfMeasurementSystem.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementSystems.update(
        {unitOfMeasurementSystemId: unitOfMeasurementSystem.unitOfMeasurementSystemId},
        unitOfMeasurementSystem,
        { upsert: true },
        function (err: any, numReplaced: number, upsert: any) {
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
