import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetNameTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";

export class AssetNameTypeRepositoryNeDbAdapter implements AssetNameTypeRepository {
  addAssetNameType(assetNameType: AssetNameType, headerOptions?: any): Observable<AssetNameType> {
    assetNameType.assetNameTypeId = generateUUID();
    assetNameType.version = generateUUID();
    assetNameType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetNameType>) {
      assetNameTypes.insert(assetNameType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: any): Observable<number> {
    assetNameType.version = generateUUID();
    assetNameType.dateModified = new Date();
    const query = {assetNameTypeId: assetNameTypeId};
    return Observable.create(function (observer: Observer<number>) {
      assetNameTypes.update(query, {$set: {assetNameType}}, { }, function (err: any, numReplaced: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(numReplaced);
          }
          observer.complete();
        });
    });
  }

  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetNameTypes.remove(
        {assetNameTypeId: assetNameTypeId},
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

  findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetNameTypes.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetNameTypes.find({name: new RegExp(searchStr) })
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

  getAssetNameTypeById(assetNameTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetNameType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
    // , ownerPartyId:ownerPartyId
      assetNameTypes.find(
        {assetNameTypeId: assetNameTypeId},
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

  getAssetNameTypeCount(headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetNameTypes.count(
        {},
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

  getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetNameType[]>>) {
      assetNameTypes.count({}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetNameTypes.find({})
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

}
