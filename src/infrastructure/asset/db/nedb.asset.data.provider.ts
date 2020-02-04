import {AssetDataProvider} from "../../../port/asset.data.provider";
import {Asset} from "../../../domain/model/asset/asset";
import {generateUUID} from "../../../uuid.generator";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
// import {Sort} from "../../../util/sort";
// import { Page } from "../../../domain/model/page/page";
import { assets, assetTypes } from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
// import {SortGenerator} from "../../util/sort.generator";
import { HeaderBaseOptions } from "../../../header.base.options";
import { Assets } from "../../../domain/model/asset/assets";
import { AssetRequest } from "../../../domain/model/asset/request/asset.request";
import { mapObjectProps } from "../../mapper/object.property.mapper";
import { map, switchMap } from "rxjs/operators";
// import { NedbAssetTypeDataProvider } from "./nedb.asset.type.data.provider";
// import { AssetTypes } from "../../../domain/model/asset/asset.types";
import { AssetType } from "../../../domain/model/asset/asset.type";

export class NedbAssetDataProvider implements AssetDataProvider {

    constructor() {
    }

    addAsset(assetInput: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Asset> {
        const asset = mapObjectProps(assetInput, new Asset());
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

    updateAsset(assetId: string, assetInput: AssetRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
        const asset: Asset = new Asset();
        asset.name = assetInput.name;
        asset.description = assetInput.description;
        asset.assetId = assetId;
        asset.assetTypeId = assetInput.assetTypeId;
        asset.image = assetInput.image;
        // asset.version = generateUUID();
        // asset.dateModified = new Date();

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
                    // .skip(pageNumber)
                    // .limit(pageSize)
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
        return this.getAssetByIdLocal(assetId)
            .pipe(switchMap(asset => {
                return this.getAssetTypeByIdLocal(asset.assetTypeId)
                    .pipe(map( assetType => {
                        asset.assetType = assetType;
                        return asset;
                    }));
            }));
    }

    private getAssetByIdLocal(assetId: string): Observable<Asset> {
        return Observable.create(function (observer: Observer<Asset>) {
            assets.findOne(
                {assetId: assetId },
                (err: any, doc: Asset) => {
                    if (!err && doc) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
        });
    }

    private getAssetTypeByIdLocal(assetTypeId: string): Observable<AssetType> {
        return Observable.create(function (observer: Observer<AssetType>) {
            assetTypes.findOne(
                {assetTypeId: assetTypeId},
                (err: any, doc: AssetType) => {
                if (!err && doc) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssets(search?: string, pageNumber?: number, pageSize?: number, headerOptions?: HeaderBaseOptions): Observable<Assets> {
        // just for now this might change
        return this.getAssetsLocal(search, pageNumber, pageSize, headerOptions)
            .pipe(switchMap( assets => {
                const assetTypeIds: string[] = assets.map( x => x.assetTypeId);
                return this.getAssetTypesLocal(assetTypeIds, headerOptions)
                    .pipe(map(values => {
                        assets.forEach( x => {
                            x.assetType = values.find( v => v.assetTypeId === x.assetTypeId);
                        });
                        return new Assets(assets);
                    }));
            }));
    }

    private getAssetsLocal(search: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<Asset[]> {
        return Observable.create(function (observer: Observer<Asset[]>) {
            assets.count({ownerPartyId: headerOptions.ownerPartyId}, function (err, count) {
                const skipAmount = pageNumber ? pageNumber * pageSize : 0;
                assets.find({ownerPartyId: headerOptions.ownerPartyId, name: new RegExp(search)})
                .skip(skipAmount)
                .limit(pageSize)
                    .exec((err: any, docs: Asset[]) => {
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

    private getAssetTypesLocal(assetTypeIds: string[], headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
        return Observable.create(function (observer: Observer<AssetType[]>) {
            assetTypes.find({ownerPartyId: headerOptions.ownerPartyId, assetTypeId: { $in: assetTypeIds }})
                .exec((err: any, docs: AssetType[]) => {
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
