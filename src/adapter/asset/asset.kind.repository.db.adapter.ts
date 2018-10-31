import {AssetKindRepository} from "../../repository/asset.kind.repository";
import {AssetKind} from "../../data/asset/asset.kind";
import {assetKinds} from "../../db";
import {Observable, Observer} from "rxjs";

export class AssetKindRepositoryNeDbAdapter implements AssetKindRepository {

  getAssetKinds(): Observable<AssetKind[]> {
    return Observable.create(function (observer: Observer<AssetKind[]>) {
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
    return Observable.create(function (observer: Observer<AssetKind>) {
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

  // USED BY OTHER REPO
  getAssetKindByIds(assetKindIds: string[]): Observable<AssetKind[]> {
    return Observable.create((observer: Observer<AssetKind[]>) => {
      assetKinds.find({assetKindId: {$in: assetKindIds}}, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }
}