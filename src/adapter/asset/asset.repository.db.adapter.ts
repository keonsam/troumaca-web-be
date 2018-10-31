import {AssetRepository} from "../../repository/asset.repository";
import {Asset} from "../../data/asset/asset";
import {generateUUID} from "../../uuid.generator";
import {assets} from "../../db";
import {calcSkip} from "../../db.util";
import {AssetKind} from "../../data/asset/asset.kind";
import {AssetType} from "../../data/asset/asset.type";
import {UnitOfMeasure} from "../../data/unit-of-measure/unit.of.measure";
import {Site} from "../../data/site/site";
import {User} from "../../data/party/user";
import {AssetKindRepositoryNeDbAdapter} from "./asset.kind.repository.db.adapter";
import {AssetTypeRepositoryNeDbAdapter} from "./asset.type.repository.db.adapter";
import {UnitOfMeasureRepositoryNeDbAdapter} from "../unit-of-measure/unit.of.measure.repository.db.adapter";
import {UserRepositoryNeDbAdapter} from "../party/user.repository.db.adapter";
import {SiteRepositoryNeDbAdapter} from "../site/site.repository.db.adapter";
import {Observable, Observer, of} from "rxjs";
import {switchMap, map} from "rxjs/operators";

export class AssetRepositoryNeDbAdapter implements AssetRepository {

  private defaultPageSize: number = 10;
  private assetKindRepositoryNeDbAdapter: AssetKindRepositoryNeDbAdapter = new AssetKindRepositoryNeDbAdapter();
  private assetTypeRepositoryNeDbAdapter: AssetTypeRepositoryNeDbAdapter = new AssetTypeRepositoryNeDbAdapter();
  private unitOfMeasureRepositoryNeDbAdapter: UnitOfMeasureRepositoryNeDbAdapter = new UnitOfMeasureRepositoryNeDbAdapter();
  private userRepositoryNeDbAdapter: UserRepositoryNeDbAdapter = new UserRepositoryNeDbAdapter();
  private siteRepositoryNeDbAdapter: SiteRepositoryNeDbAdapter = new SiteRepositoryNeDbAdapter();

  constructor() {
  }

  findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.findAssetsLocal(searchStr, pageSize)
      .pipe(switchMap(assets => {
        if (assets.length < 1) {
          return of(assets);
        } else {
          const assetTypeIds: string[] = assets.map(x => x.assetTypeId);
          return this.assetTypeRepositoryNeDbAdapter.getAssetTypesByIds(assetTypeIds)
            .pipe(map(assetTypes => {
              assets.forEach(value => {
                const index = assetTypes.findIndex((x: AssetType) => x.assetTypeId === value.assetTypeId);
                value.assetTypeName = index !== -1 ? assetTypes[index].name : "";
              });
              return assets;
            }));
        }
      }));
  }

  getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
    return this.getAssetsLocal(pageNumber, pageSize, order)
      .pipe(switchMap(assets => {
        if (assets.length < 1) {
          return of(assets);
        } else {
          const assetKindIds: string[] = [];
          const assetTypeIds: string[] = [];
          const unitOfMeasureIds: string[] = [];
          const partyIds: string[] = [];
          const siteIds: string[] = [];
          assets.forEach((x: Asset) => {
            if (x.assetKindId) assetKindIds.push(x.assetKindId);
            if (x.assetTypeId) assetTypeIds.push(x.assetTypeId);
            if (x.unitOfMeasureId) unitOfMeasureIds.push(x.unitOfMeasureId);
            if (x.personId) partyIds.push(x.personId);
            if (x.siteId) siteIds.push(x.siteId);
          });
          return this.assetKindRepositoryNeDbAdapter.getAssetKindByIds(assetKindIds)
            .pipe(switchMap(assetKinds => {
              return this.assetTypeRepositoryNeDbAdapter.getAssetTypesByIds(assetTypeIds)
                .pipe(switchMap(assetTypes => {
                  return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasuresByIds(unitOfMeasureIds)
                    .pipe(switchMap(unitOfMeasures => {
                      return this.userRepositoryNeDbAdapter.getUsersByIds(partyIds)
                        .pipe(switchMap(users => {
                          return this.siteRepositoryNeDbAdapter.getSitesByIds(siteIds)
                            .pipe(map(sites => {
                              assets.forEach((value: Asset) => {
                                const index = assetKinds.findIndex((x: AssetKind) => x.assetKindId === value.assetKindId);
                                const index2 = assetTypes.findIndex((x: AssetType) => x.assetTypeId === value.assetTypeId);
                                const index3 = unitOfMeasures.findIndex((x: UnitOfMeasure) => x.unitOfMeasureId === value.unitOfMeasureId);
                                const index4 = users.findIndex((x: User) => x.partyId === value.personId);
                                const index5 = sites.findIndex((x: Site) => x.siteId === value.siteId);
                                value.assetKindName = index !== -1 ? assetKinds[index].name : "";
                                value.assetTypeName = index2 !== -1 ? assetTypes[index2].name : "";
                                value.unitOfMeasureName = index3 !== -1 ? unitOfMeasures[index3].name : "";
                                value.personName = index4 !== -1 ? users[index4].firstName : "";
                                value.siteName = index5 !== -1 ? sites[index5].name : "";
                              });
                              return assets;
                            }));
                        }));
                    }));
                }));
            }));
        }
      }));
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
    return this.getAssetByIdLocal(assetId)
      .pipe(switchMap((asset: Asset) => {
        if (!asset) {
          return of(asset);
        } else {
          return this.assetKindRepositoryNeDbAdapter.getAssetKindById(asset.assetKindId)
            .pipe(switchMap(assetKind => {
              return this.assetTypeRepositoryNeDbAdapter.getAssetTypeByIdLocal(asset.assetTypeId)
                .pipe(switchMap(assetType => {
                  return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasureById(asset.unitOfMeasureId)
                    .pipe(switchMap(unitOfMeasure => {
                      return this.userRepositoryNeDbAdapter.getUser(asset.personId)
                        .pipe(switchMap(user => {
                          return this.siteRepositoryNeDbAdapter.getSiteById(asset.siteId)
                            .pipe(map(site => {
                              asset.assetKindName = assetKind ? assetKind.name : "";
                              asset.assetTypeName = assetType ? assetType.name : "";
                              asset.unitOfMeasureName = unitOfMeasure ? unitOfMeasure.name : "";
                              asset.personName = user ? user.firstName : "";
                              asset.siteName = site ? site.name : "";
                              return asset;
                            }));
                        }));
                    }));
                }));
            }));
        }
      }));
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

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    if (asset.assetKindId === "65694257-0aa8-4fb6-abb7-e6c7b83cf4f2") {
      asset.serialNumber = undefined;
    } else {
      asset.quantity = undefined;
      asset.unitOfMeasureId = undefined;
    }
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "assetId": assetId
      };
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
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "assetId": assetId
      };
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
    return this.getAssetsByIdsLocal(assetIds)
      .pipe(switchMap(assets => {
        if (!assets) {
          return of(assets);
        } else {
          const assetTypeIds: string[] = assets.map(x => x.assetTypeId);
          return this.assetTypeRepositoryNeDbAdapter.getAssetTypesByIds(assetTypeIds)
            .pipe(map(assetTypes => {
              assets.forEach(value => {
                const index = assetTypes.findIndex((x: AssetType) => x.assetTypeId === value.assetTypeId);
                value.assetTypeName = index !== -1 ? assetTypes[index].name : "";
              });
              return assets;
            }));
        }
      }));
  }

  // HELPS

  getAssetsLocal(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
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

  getAssetByIdLocal(assetId: string): Observable<Asset> {
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

  getAssetsByIdsLocal(assetIds: string[]): Observable<Asset[]> {
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

  findAssetsLocal(searchStr: string, pageSize: number): Observable<Asset[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    const size = searchStr ? pageSize : 100;
    return Observable.create((observer: Observer<Asset[]>) => {
      assets.find(query).limit(size).exec((err: any, docs: any) => {
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