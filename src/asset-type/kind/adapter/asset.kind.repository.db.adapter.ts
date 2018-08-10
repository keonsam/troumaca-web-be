import { AssetKindRepository } from "../asset.kind.repository";
import { Observable } from "rxjs/Observable";
import { AssetKind } from "../asset.kind";
import { Observer } from "rxjs/Observer";
import { assetKinds } from "../../../db";

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
              }else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
    }
}