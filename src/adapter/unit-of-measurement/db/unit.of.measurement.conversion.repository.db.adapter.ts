import {UnitOfMeasurementConversionRepository} from "../../../repository/unit.of.measurement.conversion.repository";
import {UnitOfMeasurementConversion} from "../../../data/unit-of-measurement/unit.of.measurement.conversion";
import {Observable, Observer} from "rxjs";
import {unitOfMeasurementConversions} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class UnitOfMeasurementConversionRepositoryNeDbAdapter implements UnitOfMeasurementConversionRepository {
  addUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    unitOfMeasurementConversion.unitOfMeasurementConversionId = generateUUID();
    unitOfMeasurementConversion.version = generateUUID();
    unitOfMeasurementConversion.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetBrand>) {
      unitOfMeasurementConversions.insert(unitOfMeasurementConversion, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });

  }

  deleteUnitOfMeasurementConversion(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementConversions.remove(
        {unitOfMeasurementConversionId: unitOfMeasurementConversionId, ownerPartyId: ownerPartyId},
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

  findUnitOfMeasurementConversions(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<UnitOfMeasurementConversion[]> {
    return Observable.create(function (observer: Observer<AssetBrand[]>) {
      unitOfMeasurementConversions.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        unitOfMeasurementConversions.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getUnitOfMeasurementConversionById(unitOfMeasurementConversionId: string, ownerPartyId: string, headerOptions?: any): Observable<UnitOfMeasurementConversion> {
    return Observable.create(function (observer: Observer<AssetBrand>) {
      // , ownerPartyId:ownerPartyId
      unitOfMeasurementConversions.find(
        {unitOfMeasurementConversionId: unitOfMeasurementConversionId},
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

  getUnitOfMeasurementConversionCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      unitOfMeasurementConversions.count(
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

  getUnitOfMeasurementConversions(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<UnitOfMeasurementConversion[]>> {
    return Observable.create(function (observer: Observer<Page<AssetBrand[]>>) {
      unitOfMeasurementConversions.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        unitOfMeasurementConversions.find({ownerPartyId: ownerPartyId})
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

  updateUnitOfMeasurementConversion(unitOfMeasurementConversion: UnitOfMeasurementConversion, headerOptions?: any): Observable<Affect> {
    unitOfMeasurementConversion.version = generateUUID();
    unitOfMeasurementConversion.dateModified = new Date();
    // ownerPartyId:unitOfMeasurementConversion.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      unitOfMeasurementConversions.update(
        {unitOfMeasurementConversionId: unitOfMeasurementConversion.unitOfMeasurementConversionId},
        unitOfMeasurementConversion,
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
