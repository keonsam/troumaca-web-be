import {AssetRepository} from "../../../repository/asset.repository";
import {Asset} from "../../../data/asset/asset";
import {generateUUID} from "../../../uuid.generator";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { Page } from "../../../data/page/page";
import { assets } from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Assets } from "../../../data/asset/assets";

export class AssetRepositoryNeDbAdapter implements AssetRepository {

    constructor() {
    }

    addAsset(asset: Asset, headerOptions?: HeaderBaseOptions): Observable<Asset> {
        asset.assetId = generateUUID();
        asset.ownerPartyId = headerOptions.ownerPartyId;
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

    updateAsset(assetId: string, asset: Asset, headerOptions?: HeaderBaseOptions): Observable<Affect> {
        asset.version = generateUUID();
        asset.dateModified = new Date();

        return Observable.create(function (observer: Observer<Affect>) {
            assets.update(
                {assetId: assetId },
                {$set : asset},
                { upsert: true },
                function (err: any, numReplaced: number, upsert: any) {
                    if (err) {
                        observer.error(err);
                    } else {

                        observer.next(new Affect(numReplaced));
                    }
                    observer.complete();
                });
        });
    }

    deleteAsset(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
        return Observable.create(function (observer: Observer<Affect>) {
            assets.remove(
                {assetId: assetId },
                { multi: true },
                function (err: any, numRemoved: number) {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(new Affect(numRemoved));
                    }
                    observer.complete();
                });
        });
    }

    findAssets(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
        return Observable.create(function (observer: Observer<Asset[]>) {
            assets.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
                const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                assets.find({ownerPartyId: headerOptions.ownerPartyId, name: new RegExp(searchStr) })
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
                        });
            });
        });
    }

    getAssetById(assetId: string, headerOptions?: HeaderBaseOptions): Observable<Asset> {
        return Observable.create(function (observer: Observer<Asset>) {
            assets.findOne(
                {assetId: assetId },
                (err: any, doc: Asset) => {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
        });
    }

    getAssets(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<Assets> {
        return Observable.create(function (observer: Observer<Assets>) {
            assets.count({ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
                const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
                const generate = SortGenerator.generate(sort);
                assets.find({ownerPartyId: headerOptions.ownerPartyId})
                    .skip(skipAmount)
                    .limit(pageSize)
                    .exec((err: any, docs: Asset[]) => {
                        if (!err) {
                            observer.next(new Assets(docs, new Page(pageNumber, pageSize, docs.length, count)));
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
            });
        });
    }

}
