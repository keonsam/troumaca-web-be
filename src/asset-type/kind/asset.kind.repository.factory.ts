import Rx from "rxjs";
import { Observable } from "rxjs/Observable";
import { AssetKind } from "./asset.kind";
import { AssetKindRepository } from "./asset.kind.repository";
import { RepositoryKind } from "../../repository.kind";
import { assetKinds } from "../../db";
import { Observer } from "rxjs/Observer";

class AssetKindDBRepository implements AssetKindRepository {

  getAssetKinds(): Observable<AssetKind[]> {
    return Rx.Observable.create(function (observer: Observer<AssetKind[]>) {
      assetKinds.find({}, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetKindById(assetKindId: string): Observable<AssetKind> {
    const query = {
      "assetKindId": assetKindId
    };
    return Rx.Observable.create(function (observer: Observer<AssetKind[]>) {
      assetKinds.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}

class AssetKindRestRepository implements AssetKindRepository {
  getAssetKinds(): Observable<AssetKind[]> {
    return undefined;
  }

  getAssetKindById(assetKindId: string): Observable<AssetKind> {
    return undefined;
  }

}


export function createAssetKindRepository(kind?: RepositoryKind): AssetKindRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AssetKindDBRepository();
    case RepositoryKind.Rest:
      return new AssetKindRestRepository();
    default:
      return new AssetKindDBRepository();
  }
}
