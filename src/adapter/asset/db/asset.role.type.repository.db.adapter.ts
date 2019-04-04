import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {assetRoleTypes} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { Page } from "../../../data/page/page";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetRoleTypes } from "../../../data/asset/asset.role.types";

export class AssetRoleTypeRepositoryNeDbAdapter implements AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType> {
    assetRoleType.assetRoleTypeId = generateUUID();
    assetRoleType.version = generateUUID();
    assetRoleType.dateModified = new Date();
    assetRoleType.ownerPartyId = headerOptions.ownerPartyId;

    return Observable.create(function (observer: Observer<AssetRoleType>) {
      assetRoleTypes.insert(assetRoleType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    assetRoleType.version = generateUUID();
    assetRoleType.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      assetRoleTypes.update(
        {assetRoleTypeId: assetRoleTypeId},
          {$set : assetRoleType},
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

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetRoleTypes.remove(
        {assetRoleTypeId: assetRoleTypeId},
        { multi: true },
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

  findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetRoleTypes.count({ ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetRoleTypes.find({ ownerPartyId: headerOptions.ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetRoleTypeById(assetRoleTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetRoleType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      assetRoleTypes.find(
        {assetRoleTypeId: assetRoleTypeId},
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

  // getAssetRoleTypeCount(headerOptions?: HeaderBaseOptions): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     assetRoleTypes.count(
  //       {},
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

  getAssetRoleTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetRoleTypes> {
    return Observable.create(function (observer: Observer<AssetRoleTypes>) {
      assetRoleTypes.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetRoleTypes.find({ ownerPartyId: headerOptions.ownerPartyId })
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: AssetRoleType[]) => {
            if (!err) {
              observer.next(new AssetRoleTypes(docs, new Page(pageNumber, pageSize, docs.length, count)));
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

}
