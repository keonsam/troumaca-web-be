import {AssetIdentifierTypeRepository} from "../../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetIdentifierTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetIdentifierTypeRepositoryNeDbAdapter implements AssetIdentifierTypeRepository {
  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<AssetIdentifierType> {
    assetIdentifierType.assetIdentifierTypeId = generateUUID();
    assetIdentifierType.version = generateUUID();
    assetIdentifierType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      assetIdentifierTypes.insert(assetIdentifierType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<Affect> {
    assetIdentifierType.version = generateUUID();
    assetIdentifierType.dateModified = new Date();
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierTypes.update(
        {assetIdentifierTypeId: assetIdentifierTypeId},
          {$set: assetIdentifierType},
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

  deleteAssetIdentifierType(assetIdentifierTypeId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierTypes.remove(
        {assetIdentifierTypeId: assetIdentifierTypeId},
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

  findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetIdentifierTypes.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetIdentifierTypes.find({ name: new RegExp(searchStr) })
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

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifierType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      // , ownerPartyId:ownerPartyId
      assetIdentifierTypes.find(
        {assetIdentifierTypeId: assetIdentifierTypeId},
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

  getAssetIdentifierTypeCount(headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetIdentifierTypes.count(
        { },
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

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetIdentifierType[]>>) {
      assetIdentifierTypes.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetIdentifierTypes.find({})
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
