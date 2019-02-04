import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {assetRoleTypes} from "../../../db";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";

export class AssetRoleTypeRepositoryNeDbAdapter implements AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType> {
    assetRoleType.assetRoleTypeId = generateUUID();
    assetRoleType.version = generateUUID();
    assetRoleType.dateModified = new Date();

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

  updateAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<Affect> {
    assetRoleType.version = generateUUID();
    assetRoleType.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      assetRoleTypes.update(
        {assetRoleTypeId:assetRoleType.assetRoleTypeId, ownerPartyId:assetRoleType.ownerPartyId},
        assetRoleType,
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

  deleteAssetRoleType(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetRoleTypes.remove(
        {assetRoleTypeId:assetRoleTypeId, ownerPartyId:ownerPartyId},
        { multi: true },
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

  findAssetRoleTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetRoleTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetRoleTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetRoleTypeById(assetRoleTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRoleType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      assetRoleTypes.find(
        {assetRoleTypeId:assetRoleTypeId, ownerPartyId:ownerPartyId},
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

  getAssetRoleTypeCount(ownerPartyId:string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetRoleTypes.count(
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

  getAssetRoleTypes(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRoleType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetRoleType[]>>) {
      assetRoleTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetRoleTypes.find({ownerPartyId:ownerPartyId})
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

}