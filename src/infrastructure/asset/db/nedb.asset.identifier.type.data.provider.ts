import {AssetIdentifierTypeDataProvider} from "../../../port/asset.identifier.type.data.provider";
import {AssetIdentifierType} from "../../../domain/model/asset/asset.identifier.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import { Page} from "../../../domain/model/page/page";
import {generateUUID} from "../../../uuid.generator";
import {assetIdentifierTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetIdentifierTypes } from "../../../domain/model/asset/asset.identifier.types";

export class NebdAssetIdentifierTypeDataProvider implements AssetIdentifierTypeDataProvider {

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType> {
    assetIdentifierType.assetIdentifierTypeId = generateUUID();
    assetIdentifierType.version = generateUUID();
    assetIdentifierType.dateModified = new Date();
    assetIdentifierType.ownerPartyId = headerOptions.ownerPartyId;

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

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<Affect> {
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

  deleteAssetIdentifierType(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
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

  findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetIdentifierTypes.count({ ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetIdentifierTypes.find({ ownerPartyId: headerOptions.ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType> {
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

  // getAssetIdentifierTypeCount(headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     assetIdentifierTypes.count(
  //       { },
  //       (err: any, count: any) => {
  //         if (!err) {
  //           observer.next(count);
  //         } else {
  //           observer.error(err);
  //         }
  //         observer.complete();
  //       });
  //   });
  // }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierTypes> {
    return Observable.create(function (observer: Observer<AssetIdentifierTypes>) {
      assetIdentifierTypes.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetIdentifierTypes.find({ ownerPartyId: headerOptions.ownerPartyId })
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: AssetIdentifierType[]) => {
            if (!err) {
              observer.next(new AssetIdentifierTypes(docs, new Page(pageNumber, pageSize, docs.length, count)));
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

}
