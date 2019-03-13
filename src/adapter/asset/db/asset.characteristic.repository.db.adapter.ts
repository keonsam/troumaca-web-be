import {AssetCharacteristicRepository} from "../../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../../data/asset/asset.characteristic";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristics} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {SortGenerator} from "../../util/sort.generator";

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

  deleteAssetCharacteristic(assetCharacteristicId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristics.remove(
        {assetCharacteristicId: assetCharacteristicId, ownerPartyId: ownerPartyId},
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

  findAssetCharacteristics(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristic[]> {
    return Observable.create(function (observer: Observer<AssetCharacteristic[]>) {
      assetCharacteristics.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCharacteristics.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetCharacteristicById(assetCharacteristicId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristic> {
    return Observable.create(function (observer: Observer<AssetCharacteristic>) {
      // , ownerPartyId:ownerPartyId
      assetCharacteristics.find(
        {assetCharacteristicId:assetCharacteristicId},
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

  getAssetCharacteristicCount(ownerPartyId: string, headerOptions?:any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCharacteristics.count(
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

  getAssetCharacteristics(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristic[]>> {
    return Observable.create(function (observer: Observer<Page<AssetCharacteristic[]>>) {
      assetCharacteristics.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetCharacteristics.find({ownerPartyId:ownerPartyId})
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

  updateAssetCharacteristic(assetCharacteristic: AssetCharacteristic, headerOptions?: any): Observable<Affect> {
    assetCharacteristic.version = generateUUID();
    assetCharacteristic.dateModified = new Date();
    //ownerPartyId:assetCharacteristic.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristics.update(
        {assetCharacteristicId:assetCharacteristic.assetCharacteristicId},
        assetCharacteristic,
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