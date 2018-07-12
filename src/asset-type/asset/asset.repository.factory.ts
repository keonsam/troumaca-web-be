import Rx from 'rxjs';
import {generateUUID} from '../../uuid.generator';
import {calcSkip} from '../../db.util';
import {assets} from '../../db';
import {Asset} from "./asset";
import {Observer} from "rxjs/Observer";
import {AssetRepository} from "./asset.repository";
import {Observable} from "rxjs/Observable";
import {RepositoryKind} from "../../repository.kind";

let defaultPageSize = 10;

/**
 * Database Repository
 */
class AssetDBRepository implements AssetRepository {

  saveAsset(asset:Asset):Observable<Asset> {
    asset.assetId = generateUUID();
    return Rx.Observable.create(function(observer:Observer<Asset>) {
      assets.insert(asset, function(err:any, doc:any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(asset);
        }
        observer.complete();
      });
    });
  }

  getAssets(pageNumber:number, pageSize:number, order:string):Observable<Asset[]> {
    return Rx.Observable.create(function (observer:Observer<Asset[]>) {
      let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
      assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetCount():Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      assets.count({}, function (err:any, count:number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getAssetById(assetId:string):Observable<Asset> {
    return Rx.Observable.create(function (observer:Observer<Asset>) {
      let query = {
        "assetId":assetId
      };
      assets.findOne(query, function (err:any, doc:any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateAsset(assetId:string, asset:Asset):Observable<number> {
    if(asset.assetKindId === "65694257-0aa8-4fb6-abb7-e6c7b83cf4f2") {
      asset.serialNumber = undefined;
    } else {
      asset.quantity = undefined;
      asset.unitOfMeasureId = undefined;
    }
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "assetId":assetId
      };
      assets.update(query, asset, {}, function (err:any, numReplaced:number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  deleteAsset(assetId:string):Observable<number> {
    return Rx.Observable.create(function (observer:Observer<number>) {
      let query = {
        "assetId":assetId
      };
      assets.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

}

/**
 * Rest Repository
 */
class AssetRestRepository implements AssetRepository {

  deleteAsset(assetId:string): Observable<number> {
    return undefined;
  }

  getAssetById(assetId:string): Observable<Asset> {
    return undefined;
  }

  getAssetCount(): Observable<number> {
    return undefined;
  }

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
    return undefined;
  }

  saveAsset(asset: Asset): Observable<Asset> {
    return undefined;
  }

  updateAsset(assetId:string, asset:Asset): Observable<number> {
    return undefined;
  }

}

export function createAssetRepository(kind:RepositoryKind):AssetRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AssetDBRepository();
    case RepositoryKind.Rest:
      return new AssetRestRepository();
    default:
      return new AssetDBRepository();
  }
}