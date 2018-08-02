import { AssetRepository } from "../asset.repository";
import { Asset } from "../asset";
import { Observable } from "rxjs/Observable";
import { generateUUID } from "../../../uuid.generator";
import Rx from "rxjs";
import { Observer } from "rxjs/Observer";
import { assetKinds, assets, assetTypes, sites, unitOfMeasures, users } from "../../../db";
import { calcSkip } from "../../../db.util";
import { AssetKind } from "../../kind/asset.kind";
import { AssetType } from "../../asset.type";
import { UnitOfMeasure } from "../../../unit-of-measure/unit.of.measure";
import { Person } from "../../../party/person/person";
import { Site } from "../../../site/site";
import { User } from "../../../party/user/user";


export class AssetRepositoryNeDbAdapter implements AssetRepository {

    private defaultPageSize: number;

    constructor() {
        this.defaultPageSize = 10;
    }

    getAssets(pageNumber: number, pageSize: number, order: string): Observable<Asset[]> {
        return Rx.Observable.create(function (observer: Observer<Asset[]>) {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            assets.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, assetArr: any) {
                if (!err) {
                    if (assetArr.length < 1) {
                        observer.next(assetArr);
                        observer.complete();
                    } else {
                        const assetKindIds: string[] = [];
                        const assetTypeIds: string[] = [];
                        const unitOfMeasureIds: string[] = [];
                        const partyIds: string[] = [];
                        const siteIds: string[] = [];
                        assetArr.forEach((x: Asset) => {
                            if (x.assetKindId) assetKindIds.push(x.assetKindId);
                            if (x.assetTypeId) assetTypeIds.push(x.assetTypeId);
                            if (x.unitOfMeasureId) unitOfMeasureIds.push(x.unitOfMeasureId);
                            if (x.personId) partyIds.push(x.personId);
                            if (x.siteId) siteIds.push(x.siteId);
                            assetKinds.find({assetKindId: {$in: assetKindIds}}, function (err: any, assetKindArr: any) {
                                if (!err) {
                                    assetTypes.find({assetTypeId: {$in: assetTypeIds}}, function (err: any, assetTypeArr: any) {
                                        if (!err) {
                                            unitOfMeasures.find({unitOfMeasureId: {$in: unitOfMeasureIds}}, function (err: any, unitOfMeasureArr: any) {
                                                if (!err) {
                                                    users.find({partyId: {$in: partyIds}}, function (err: any, userArr: any) {
                                                        if (!err) {
                                                            sites.find({siteId: {$in: siteIds}}, function (err: any, siteArr: any) {
                                                                if (!err) {
                                                                    assetArr.forEach((value: Asset) => {
                                                                        const index = assetKindArr.findIndex((x: AssetKind) => x.assetKindId === value.assetKindId);
                                                                        const index2 = assetTypeArr.findIndex((x: AssetType) => x.assetTypeId === value.assetTypeId);
                                                                        const index3 = unitOfMeasureArr.findIndex((x: UnitOfMeasure) => x.unitOfMeasureId === value.unitOfMeasureId);
                                                                        const index4 = userArr.findIndex((x: User) => x.partyId === value.personId);
                                                                        const index5 = siteArr.findIndex((x: Site) => x.siteId === value.siteId);
                                                                        value.assetKind = index !== -1 ? assetKindArr[index] : new AssetKind();
                                                                        value.assetType = index2 !== -1 ? assetTypeArr[index2] : new AssetType();
                                                                        value.unitOfMeasure = index3 !== -1 ? unitOfMeasureArr[index3] : new UnitOfMeasure();
                                                                        value.person = index4 !== -1 ? userArr[index4] : new Person();
                                                                        value.site = index5 !== -1 ? siteArr[index5] : new Site();
                                                                    });
                                                                    observer.next(assetArr);
                                                                } else {
                                                                    observer.error(err);
                                                                }
                                                                observer.complete();
                                                            });
                                                        } else {
                                                            observer.error(err);
                                                            observer.complete();
                                                        }
                                                    });
                                                } else {
                                                    observer.error(err);
                                                    observer.complete();
                                                }
                                            });
                                        } else {
                                            observer.error(err);
                                            observer.complete();
                                        }
                                    });
                                } else {
                                    observer.error(err);
                                    observer.complete();
                                }
                            });
                        });
                    }
                } else {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    getAssetCount(): Observable<number> {
        return Rx.Observable.create(function (observer: Observer<number>) {
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
        return Rx.Observable.create(function (observer: Observer<Asset>) {
            const query = {"assetId": assetId};
            assets.findOne(query, function (err: any, asset: any) {
                if (!err) {
                    if (!asset) {
                        observer.next(asset);
                        observer.complete();
                    } else {
                        const query2 = {"assetKindId": asset.assetKindId};
                        assetKinds.findOne(query2, function (err: any, assetKind: any) {
                            if (!err) {
                                const query3 = {"assetTypeId": asset.assetTypeId};
                                assetTypes.findOne(query3, function (err: any, assetType: any) {
                                    if (!err) {
                                        const query4 = {"unitOfMeasureId": asset.unitOfMeasureId};
                                        unitOfMeasures.findOne(query4, function (err: any, unitOfMeasure: any) {
                                            if (!err) {
                                                const query5 = {"partyId": asset.partyId};
                                                users.findOne(query5, function (err: any, user: any) {
                                                    if (!err) {
                                                        const query6 = {"siteId": asset.siteId};
                                                        sites.findOne(query6, function (err: any, site: any) {
                                                            if (!err) {
                                                                asset.assetKind = assetKind ? assetKind : new AssetKind();
                                                                asset.assetType = assetType ? assetType : new AssetType();
                                                                asset.unitOfMeasure = unitOfMeasure ? unitOfMeasure : new UnitOfMeasure();
                                                                asset.person = user ? user : new Person();
                                                                asset.site = site ? site : new Site();
                                                                observer.next(asset);
                                                            } else {
                                                                observer.error(err);
                                                            }
                                                            observer.complete();
                                                        });
                                                    } else {
                                                        observer.error(err);
                                                        observer.complete();
                                                    }
                                                });
                                            } else {
                                                observer.error(err);
                                                observer.complete();
                                            }
                                        });
                                    } else {
                                        observer.error(err);
                                        observer.complete();
                                    }
                                });
                            } else {
                                observer.error(err);
                                observer.complete();
                            }
                        });
                    }
                } else {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    saveAsset(asset: Asset): Observable<Asset> {
        asset.assetId = generateUUID();
        return Rx.Observable.create(function(observer: Observer<Asset>) {
            assets.insert(asset, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(asset);
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
        return Rx.Observable.create(function (observer: Observer<number>) {
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
        return Rx.Observable.create(function (observer: Observer<number>) {
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


}