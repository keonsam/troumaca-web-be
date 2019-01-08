import {AssetRepository} from "../../repository/asset.repository";
import {Asset} from "../../data/asset/asset";
import {generateUUID} from "../../uuid.generator";
import { assetBrands, assetChars, assets, assetSpecs } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";
import { AssetSpecification } from "../../data/asset/asset.specification";
import { AssetBrand } from "../../data/asset/asset.brand";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";

export class AssetRepositoryNeDbAdapter implements AssetRepository {

  private defaultPageSize: number = 10;

  constructor() {
  }

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create((observer: Observer<Asset[]>) => {
      assets.find(query).limit(pageSize).exec((err: any, docs: any) => {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
    return Observable.create((observer: Observer<Asset[]>) => {
      const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assets.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetById(assetId: string): Observable<Asset> {
    return Observable.create((observer: Observer<Asset>) => {
      const query = {"assetId": assetId};
      assets.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

    getAssetSpecById(assetId: string): Observable<AssetSpecification> {
        return Observable.create((observer: Observer<AssetSpecification>) => {
            const query = {"assetId": assetId};
            assetSpecs.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetBrandById(assetId: string): Observable<AssetBrand> {
        return Observable.create((observer: Observer<AssetBrand>) => {
            const query = {"assetId": assetId};
            assetBrands.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
        return Observable.create((observer: Observer<AssetCharacteristics>) => {
            const query = {"assetId": assetId};
            assetChars.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

  saveAsset(asset: Asset): Observable<Asset> {
    asset.assetId = generateUUID();
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

  addAssetSpec(asset: Asset): Observable<AssetSpecification> {
      asset.assetId = generateUUID();
      return Observable.create(function (observer: Observer<AssetSpecification>) {
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

  addAssetBrand(asset: Asset): Observable<AssetBrand> {
      asset.assetId = generateUUID();
      return Observable.create(function (observer: Observer<AssetBrand>) {
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

  addAssetCharacteristics(asset: Asset): Observable<AssetCharacteristics> {
      asset.assetId = generateUUID();
      return Observable.create(function (observer: Observer<AssetCharacteristics>) {
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

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    const query = {assetId};
    return Observable.create(function (observer: Observer<number>) {
      assets.update(query, asset, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteAsset(assetId: string): Observable<number> {
    const query = {assetId};
    return Observable.create(function (observer: Observer<number>) {
      assets.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  // USED BY OTHER REPOS
  getAssetsByIds(assetIds: string[]): Observable<Asset[]> {
    return Observable.create((observer: Observer<Asset[]>) => {
      assets.find({assetId: {$in: assetIds}}, function (err: any, docs: any) {
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