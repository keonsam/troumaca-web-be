import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {Observable, Observer} from "rxjs";
import {AssetType} from "../../../data/asset/asset.type";
import {assetTypes} from "../../../db";
import {generateUUID} from "../../../uuid.generator";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import { AssetTypes } from "../../../data/asset/asset.types";
import { Page } from "../../../data/page/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetTypeInput } from "../../../graphql/asset/dto/asset.type.input";
import { mapObjectProps } from "../../../graphql/object.property.mapper";

export class AssetTypeRepositoryNeDbAdapter implements AssetTypeRepository {

  constructor() {
  }

  addAssetType(assetTypeInput: AssetTypeInput, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
      const assetType = mapObjectProps(assetTypeInput, new AssetType());
      assetType.assetTypeId = generateUUID();
      assetType.ownerPartyId = headerOptions.ownerPartyId;
      assetType.version = generateUUID();
      assetType.dateModified = new Date();

      return Observable.create(function (observer: Observer<AssetType>) {
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

  updateAssetType(assetTypeId: string, assetType: AssetTypeInput, headerOptions?: HeaderBaseOptions): Observable<Affect> {
      // assetType.version = generateUUID();
      // assetType.dateModified = new Date();

      return Observable.create(function (observer: Observer<Affect>) {
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

  deleteAssetType(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
      return Observable.create(function (observer: Observer<Affect>) {
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
      return Observable.create(function (observer: Observer<AssetType>) {
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

  getAssetTypes(tab: string, type: string, search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetTypes> {
      return Observable.create(function (observer: Observer<AssetTypes>) {
          assetTypes.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
              const skipAmount = pageNumber ? pageNumber * pageSize : 0;
              assetTypes.find({
                  ownerPartyId: headerOptions.ownerPartyId,
                  name: new RegExp(search),
              })
                  .skip(skipAmount)
                  .limit(pageSize)
                  .exec((err: any, docs: any) => {
                      if (!err) {
                          observer.next(new AssetTypes(docs));
                      } else {
                          observer.error(err);
                      }
                      observer.complete();
                  });
          });
      });
  }

  findAssetTypesInternal(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    return Observable.create(function (observer: Observer<AssetType[]>) {
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
