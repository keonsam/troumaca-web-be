import {AssetRoleTypeRepository} from "../../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../../data/asset/asset.role.type";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {assetRoleTypes} from "../../../db";
import {Affect} from "../../../data/affect";

export class AssetRoleTypeRepositoryNeDbAdapter implements AssetRoleTypeRepository {

  addAssetRoleType(assetRoleType: AssetRoleType, headerOptions?: any): Observable<AssetRoleType> {
    assetRoleType.assetRoleTypeId = generateUUID();
    assetRoleType.version = generateUUID();
    assetRoleType.ownerPartyId = generateUUID();
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
        {assetRoleTypeId:assetRoleType.assetRoleTypeId},
        assetRoleType,
        { upsert: true },
        function (err:any, numReplaced:number, upsert) {
        if (err) {
          observer.error(err);
        } else {

          observer.next(new Affect(numReplaced));
        }
        observer.complete();
      });
    });
  }

  deleteAssetRoleType(assetRoleTypeId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetRoleTypes.remove(
        {assetRoleTypeId:assetRoleTypeId},
        { multi: true },
        function (err:any, numReplaced:number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numReplaced));
          }
          observer.complete();
        });
    });
  }

  findAssetRoleTypes(searchStr: string, pageSize: number, headerOptions?: any): Observable<AssetRoleType[]> {
    return undefined;
  }

  getAssetRoleTypeById(assetId: string, headerOptions?: any): Observable<AssetRoleType> {
    return undefined;
  }

  getAssetRoleTypeCount(headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, headerOptions?: any): Observable<AssetRoleType[]> {
    return undefined;
  }

}