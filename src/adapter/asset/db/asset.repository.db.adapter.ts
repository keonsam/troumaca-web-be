import {AssetRepository} from "../../../repository/asset.repository";
import {Asset} from "../../../data/asset/asset";
import {generateUUID} from "../../../uuid.generator";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {assets} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetRepositoryNeDbAdapter implements AssetRepository {

    constructor() {
    }

    addAsset(asset: Asset, headerOptions?: any): Observable<Asset> {
        return this.addAssetInternal(asset, headerOptions);
    }

    updateAsset(asset: Asset, headerOptions?: any): Observable<Affect> {
        return this.updateAssetInternal(asset, headerOptions);
    }

    deleteAsset(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
        return this.deleteAssetInternal(assetId, ownerPartyId, headerOptions);
    }

    findAssets(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<Asset[]> {
        return this.findAssetsInternal(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
    }

    getAssetById(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Asset> {
        return this.getAssetByIdInternal(assetId, ownerPartyId, headerOptions);
    }

    getAssetCount(ownerPartyId:string, headerOptions?: any): Observable<number> {
        return this.getAssetCountInternal(ownerPartyId, headerOptions);
    }

    getAssets(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<Asset[]>> {
        return this.getAssetsInternal(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
    }

    addAssetInternal(asset: Asset, headerOptions?: any): Observable<Asset> {
        asset.assetId = generateUUID();
        asset.version = generateUUID();
        asset.dateModified = new Date();

        return Observable.create(function (observer: Observer<Asset>) {
            assets.insert(asset, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetInternal(asset: Asset, headerOptions?: any): Observable<Affect> {
        asset.version = generateUUID();
        asset.dateModified = new Date();

        return Observable.create(function (observer: Observer<Affect>) {
            assets.update(
              {assetId:asset.assetId, ownerPartyId:asset.ownerPartyId},
              asset,
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

    deleteAssetInternal(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
        return Observable.create(function (observer: Observer<Affect>) {
            assets.remove(
              {assetId:assetId, ownerPartyId:ownerPartyId},
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

    findAssetsInternal(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<Asset[]> {
        return Observable.create(function (observer: Observer<Asset[]>) {
            assets.count({ ownerPartyId: ownerPartyId }, function (err, count) {
                let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                assets.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

    getAssetByIdInternal(assetId: string, ownerPartyId: string, headerOptions?: any): Observable<Asset> {
        return Observable.create(function (observer: Observer<Asset>) {
            assets.find(
              {assetId:assetId, ownerPartyId:ownerPartyId},
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

    getAssetCountInternal(ownerPartyId:string, headerOptions?: any): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assets.count(
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

    getAssetsInternal(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<Asset[]>> {
        return Observable.create(function (observer: Observer<Page<Asset[]>>) {
            assets.count({ ownerPartyId: ownerPartyId }, function (err, count) {
                let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                let generate = SortGenerator.generate(sort);
                assets.find({ownerPartyId:ownerPartyId})
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
