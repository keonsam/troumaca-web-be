import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import { Observable, Observer, of } from "rxjs";
import {Affect} from "../../../data/affect";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristics} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {SortGenerator} from "../../util/sort.generator";
import { AssetCharacteristicType } from "../../../data/asset/asset.characteristic.type";

const continuous = new AssetCharacteristicType("054b50c2-9e8a-4cfb-8bac-54af9ac53613", "Continuous Asset Characteristic");
const category = new AssetCharacteristicType("2f062d58-f464-40a6-921a-a49528f205f6", "Asset Category");
const types: AssetCharacteristicType[] = [continuous, category];
export class AssetCharacteristicRepositoryNeDbAdapter implements AssetCharacteristicRepository {
  addAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<AssetCharacteristic> {
    assetCharacteristic.assetCharacteristicId = generateUUID();
    assetCharacteristic.version = generateUUID();
    assetCharacteristic.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetCharacteristic>) {
      assetCharacteristics.insert(assetCharacteristic, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAssetCharacteristic(assetCharacteristicId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristics.remove(
        {assetCharacteristicId: assetCharacteristicId},
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

  findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristic[]> {
    return Observable.create(function (observer: Observer<AssetCharacteristic[]>) {
      assetCharacteristics.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCharacteristics.find({ name: new RegExp(searchStr) })
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

  getAssetCharacteristicById(assetCharacteristicId: string, headerOptions?: any): Observable<AssetCharacteristic> {
    return Observable.create(function (observer: Observer<AssetCharacteristic>) {
      // , ownerPartyId:ownerPartyId
      assetCharacteristics.find(
        {assetCharacteristicId: assetCharacteristicId},
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

  getAssetCharacteristicCount(headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCharacteristics.count(
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

  getAssetCharacteristics(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>> {
    return Observable.create(function (observer: Observer<Page<AssetCharacteristic[]>>) {
      assetCharacteristics.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetCharacteristics.find({ })
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

  updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<Affect> {
    assetCharacteristic.version = generateUUID();
    assetCharacteristic.dateModified = new Date();
    // ownerPartyId:assetCharacteristic.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristics.update(
        {assetCharacteristicId: assetCharacteristicId},
          {$set: assetCharacteristic},
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

    getAssetCharacteristicTypes(options?: any): Observable<AssetCharacteristicType[]> {
      // not generated values
        return of(types);
    }

    getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: any): Observable<AssetCharacteristicType> {
        return of(types.find(x => x.assetCharacteristicTypeId === assetCharacteristicTypeId));
    }

}
