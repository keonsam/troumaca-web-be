import {UnitOfMeasurementDimensionRepository} from "../../../repository/unit.of.measurement.dimension.repository";
import {UnitOfMeasurementDimension} from "../../../data/unit-of-measurement/unit.of.measurement.dimension";
import {Observable, Observer} from "rxjs";
import {unitOfMeasurementDimensions} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class UnitOfMeasurementDimensionRepositoryNeDbAdapter implements UnitOfMeasurementDimensionRepository {
  addUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    unitOfMeasurementDimension.unitOfMeasurementDimensionId = generateUUID();
    unitOfMeasurementDimension.version = generateUUID();
    unitOfMeasurementDimension.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetBrand>) {
      unitOfMeasurementDimensions.insert(unitOfMeasurementDimension, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });

  }

  deleteUnitOfMeasurementDimension(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementDimensions.remove(
        {unitOfMeasurementDimensionId:unitOfMeasurementDimensionId, ownerPartyId:ownerPartyId},
        {},
        function (err:any, numRemoved:number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numRemoved));
          }
          observer.complete();
        });
    });
  }

  findUnitOfMeasurementDimensions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementDimension[]> {
    return Observable.create(function (observer: Observer<AssetBrand[]>) {
      unitOfMeasurementDimensions.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        unitOfMeasurementDimensions.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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
            })
      });
    });
  }

  getUnitOfMeasurementDimensionById(unitOfMeasurementDimensionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementDimension> {
    return Observable.create(function (observer: Observer<AssetBrand>) {
      // , ownerPartyId:ownerPartyId
      unitOfMeasurementDimensions.find(
        {unitOfMeasurementDimensionId:unitOfMeasurementDimensionId},
        (err: any, docs: any) => {
          if (!err) {
            observer.next(docs[0]);
          } else {
            observer.error(err);
          }
          observer.complete();
        })
    });
  }

  getUnitOfMeasurementDimensionCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      unitOfMeasurementDimensions.count(
        {ownerPartyId:ownerPartyId},
        (err: any, count: any) => {
          if (!err) {
            observer.next(count);
          } else {
            observer.error(err);
          }
          observer.complete();
        })
    });
  }

  getUnitOfMeasurementDimensions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementDimension[]>> {
    return Observable.create(function (observer: Observer<Page<AssetBrand[]>>) {
      unitOfMeasurementDimensions.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        unitOfMeasurementDimensions.find({ownerPartyId:ownerPartyId})
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
      })
    });
  }

  updateUnitOfMeasurementDimension(unitOfMeasurementDimension: UnitOfMeasurementDimension, headerOptions?: any): Observable<Affect> {
    unitOfMeasurementDimension.version = generateUUID();
    unitOfMeasurementDimension.dateModified = new Date();
    //ownerPartyId:unitOfMeasurementDimension.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementDimensions.update(
        {unitOfMeasurementDimensionId:unitOfMeasurementDimension.unitOfMeasurementDimensionId},
        unitOfMeasurementDimension,
        { upsert: true },
        function (err:any, numReplaced:number, upsert:any) {
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