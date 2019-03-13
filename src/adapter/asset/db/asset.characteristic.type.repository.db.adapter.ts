import {AssetCharacteristicTypeRepository} from "../../../repository/asset.characteristic.type.repository";
import {AssetCharacteristicType} from "../../../data/asset/asset.characteristic.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristicTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetCharacteristicTypeRepositoryNeDbAdapter implements AssetCharacteristicTypeRepository {
  addAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<AssetCharacteristicType> {
    assetCharacteristicType.assetCharacteristicTypeId = generateUUID();
    assetCharacteristicType.version = generateUUID();
    assetCharacteristicType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetCharacteristicType>) {
      assetCharacteristicTypes.insert(assetCharacteristicType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicTypes.remove(
        {assetCharacteristicTypeId: assetCharacteristicTypeId, ownerPartyId: ownerPartyId},
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

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicType[]> {
    return Observable.create(function (observer: Observer<AssetCharacteristicType[]>) {
      assetCharacteristicTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCharacteristicTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicType> {
    return Observable.create(function (observer: Observer<AssetCharacteristicType>) {
      // , ownerPartyId:ownerPartyId
      assetCharacteristicTypes.find(
        {assetCharacteristicTypeId:assetCharacteristicTypeId},
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

  getAssetCharacteristicTypeCount(ownerPartyId: string, headerOptions?:any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCharacteristicTypes.count(
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

  getAssetCharacteristicTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristicType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetCharacteristicType[]>>) {
      assetCharacteristicTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetCharacteristicTypes.find({ownerPartyId:ownerPartyId})
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

  updateAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<Affect> {
    assetCharacteristicType.version = generateUUID();
    assetCharacteristicType.dateModified = new Date();
    //ownerPartyId:assetCharacteristicType.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicTypes.update(
        {assetCharacteristicTypeId:assetCharacteristicType.assetCharacteristicTypeId},
        assetCharacteristicType,
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