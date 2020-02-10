import {AssetTypeDataProvider} from "../../../../port/asset.type.data.provider";
import {Observable, Observer} from "rxjs";
import {AssetType} from "../../../../domain/model/asset/asset.type";
import {assetTypes} from "../../../../db";
import {generateUUID} from "../../../../uuid.generator";
import {Affect} from "../../../../domain/model/affect";
import {SkipGenerator} from "../../../util/skip.generator";
import { AssetTypes } from "../../../../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { AssetTypeRequest } from "../../../../domain/model/asset/request/asset.type.request";
import { mapObjectProps } from "../../../mapper/object.property.mapper";

export class NedbAssetTypeDataProvider implements AssetTypeDataProvider {

  constructor() {
  }

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    return undefined;
  }

  addAssetType(assetTypeRequest: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
      const assetType = mapObjectProps(assetTypeRequest, new AssetType());
      assetType.assetTypeId = generateUUID();
      assetType.ownerPartyId = headerOptions.ownerPartyId;
      assetType.version = generateUUID();
      assetType.dateModified = new Date();

      return new Observable(observer => {
          assetTypes.insert(assetType, function (err: any, doc: any) {
              if (err) {
                  observer.error(err);
              } else {
                  observer.next(doc);
              }
              observer.complete();
          });
      });
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
      // assetType.version = generateUUID();
      // assetType.dateModified = new Date();

      return new Observable(observer => {
          assetTypes.update(
              {assetTypeId: assetTypeId},
              {$set : assetType},
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

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
      return new Observable(observer => {
          assetTypes.remove(
              {assetTypeId: assetTypeId},
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

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return this.findAssetTypesInternal(searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
      return new Observable(observer => {
          assetTypes.find(
              {assetTypeId: assetTypeId},
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

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
      return new Observable(observer => {
          assetTypes.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
              const skipAmount = pageNumber ? pageNumber * pageSize : 0;
              assetTypes.find({
                  ownerPartyId: headerOptions.ownerPartyId,
                  name: new RegExp("search"),
              })
                  .skip(skipAmount)
                  .limit(pageSize)
                  .exec((err: any, docs: any) => {
                      if (!err) {
                          observer.next(new Array<AssetType>());
                      } else {
                          observer.error(err);
                      }
                      observer.complete();
                  });
          });
      });
  }

  findAssetTypesInternal(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return new Observable(observer => {
      assetTypes.count({ }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetTypes.find({ name: new RegExp(searchStr) })
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
}
