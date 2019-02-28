import {AssetRepository} from "../../repository/asset.repository";
import {Asset} from "../../data/asset/asset";
import {generateUUID} from "../../uuid.generator";
import { assets } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class AssetRepositoryNeDbAdapter implements AssetRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findAssets(searchStr: string, pageSize: number, options: any): Observable<Asset[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            name: {$regex: searchStrLocal},
            ownerPartyId: options["Owner-Party-Id"]
        } : {};
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

    getAssets(pageNumber: number, pageSize: number, order: string, options: any): Observable<Asset[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create((observer: Observer<Asset[]>) => {
            assets.find(query).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assets.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetById(assetId: string, options: any): Observable<Asset> {
        return Observable.create((observer: Observer<Asset>) => {
            const query = {
                "assetId": assetId,
                ownerPartyId: options["Owner-Party-Id"]
            };
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

    saveAsset(asset: Asset, options: any): Observable<Asset> {
        asset.assetId = generateUUID();
        asset.ownerPartyId = options["Owner-Party-Id"];
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

    updateAsset(assetId: string, asset: Asset, options: any): Observable<number> {
        const query = {
            assetId,
            ownerPartyId: options["Owner-Party-Id"]
        };
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

    deleteAsset(assetId: string, options: any): Observable<number> {
        const query = {
            assetId,
            ownerPartyId: options["Owner-Party-Id"]
        };
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
}
