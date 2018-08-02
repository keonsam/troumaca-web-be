import * as Rx from "rxjs";
import { AssetTypeRepository } from "./asset.type.repository";
import { Observable } from "rxjs/Observable";
import { AssetType } from "./asset.type";
import { Observer } from "rxjs/Observer";
import { RepositoryKind } from "../repository.kind";
import { assetTypes } from "../db";
import { calcSkip } from "../db.util";
import { generateUUID } from "../uuid.generator";

class AssetTypeDBRepository implements AssetTypeRepository {

  private _defaultPageSize: number = 10;

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const searchStrLocal = new RegExp(searchStr);

    return Rx.Observable.create(function (observer: Observer<AssetType[]>) {
      if (!searchStr) {
        assetTypes.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        assetTypes.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  }

  saveAssetType(assetType: AssetType): Observable<AssetType> {
    assetType.assetTypeId = generateUUID();
    return Rx.Observable.create(function (observer: Observer<AssetType>) {
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

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return Rx.Observable.create(function (observer: Observer<AssetType[]>) {
      const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      assetTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetTypeCount(): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      assetTypes.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetType> {
    return Rx.Observable.create(function (observer: Observer<AssetType>) {
      const query = {
        "assetTypeId": assetTypeId
      };
      assetTypes.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }


  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "assetTypeId": assetTypeId
      };
      assetTypes.update(query, assetType, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "assetTypeId": assetTypeId
      };

      assetTypes.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  get defaultPageSize(): number {
    return this._defaultPageSize;
  }

  set defaultPageSize(value: number) {
    this._defaultPageSize = value;
  }

}

class AssetTypeRestRepository implements AssetTypeRepository {
  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return undefined;
  }


  saveAssetType(assetType: AssetType): Observable<AssetType> {
    return null;
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return null;
  }

  getAssetTypeCount(): Observable<number> {
    return null;
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetType> {
    return null;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return null;
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return null;
  }
  }

export function createAssetTypeRepository(kind?: RepositoryKind): AssetTypeRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AssetTypeDBRepository();
    case RepositoryKind.Rest:
      return new AssetTypeRestRepository();
    default:
      return new AssetTypeDBRepository();
  }
}
