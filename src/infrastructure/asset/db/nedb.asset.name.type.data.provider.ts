import {AssetNameTypeDataProvider} from "../../../port/asset.name.type.data.provider";
import {AssetNameType} from "../../../domain/model/asset/asset.name.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import { Page } from "../../../domain/model/page/page";
import {generateUUID} from "../../../uuid.generator";
import {assetNameTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierType} from "../../../domain/model/asset/asset.identifier.type";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetNameTypes } from "../../../domain/model/asset/asset.name.types";

export class NedbAssetNameTypeDataProvider implements AssetNameTypeDataProvider {

  addAssetNameType(assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<AssetNameType> {
      assetNameType.assetNameTypeId = generateUUID();
      assetNameType.version = generateUUID();
      assetNameType.dateModified = new Date();
      assetNameType.ownerPartyId = headerOptions.ownerPartyId;

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

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<number> {
    assetNameType.version = generateUUID();
    assetNameType.dateModified = new Date();
    const query = {assetNameTypeId: assetNameTypeId};
    return Observable.create(function (observer: Observer<number>) {
      assetNameTypes.update(query, {$set: assetNameType}, { }, function (err: any, numReplaced: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(numReplaced);
          }
          observer.complete();
        });
    });
  }

  deleteAssetNameType(assetNameTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
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

  findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetNameType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetNameTypes.count({ ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetNameTypes.find({ownerPartyId: headerOptions.ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetNameTypeById(assetNameTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetNameType> {
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

  getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetNameTypes> {
    return Observable.create(function (observer: Observer<AssetNameTypes>) {
      assetNameTypes.count({ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetNameTypes.find({ownerPartyId: headerOptions.ownerPartyId})
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: AssetNameType[]) => {
            if (!err) {
              observer.next(new AssetNameTypes(docs, new Page(pageNumber, pageSize, docs.length, count)));
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

}
