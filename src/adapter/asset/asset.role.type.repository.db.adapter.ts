import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import { AssetRoleType} from "../../data/asset/asset.role.type";
import {generateUUID} from "../../uuid.generator";
import { assetRoleTypes } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class AssetRoleTypeRepositoryDbAdapter implements AssetRoleTypeRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findAssetRoleTypes(searchStr: string, pageSize: number, options: any): Observable<AssetRoleType[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            name: {$regex: searchStrLocal},
            ownerPartyId: options["Owner-Party-Id"]
        } : {};
        return Observable.create((observer: Observer<AssetRoleType[]>) => {
            assetRoleTypes.find(query).limit(100).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetRoleTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetRoleType[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create((observer: Observer<AssetRoleType[]>) => {
            assetRoleTypes.find(query).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetRoleTypeCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetRoleTypes.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetRoleTypeById(assetRoleTypeId: string, options: any): Observable<AssetRoleType> {
        return Observable.create((observer: Observer<AssetRoleType>) => {
            const query = {
                "assetRoleTypeId": assetRoleTypeId,
                ownerPartyId: options["Owner-Party-Id"]
            };
            assetRoleTypes.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<AssetRoleType> {
        assetRoleType.assetRoleTypeId = generateUUID();
        assetRoleType.ownerPartyId = options["Owner-Party-Id"];
        return Observable.create(function (observer: Observer<AssetRoleType>) {
            assetRoleTypes.insert(assetRoleType, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options: any): Observable<number> {
        const query = {
            assetRoleTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetRoleTypes.update(query, assetRoleType, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetRoleType(assetRoleTypeId: string, options: any): Observable<number> {
        const query = {
            assetRoleTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetRoleTypes.remove(query, {}, function (err: any, numRemoved: number) {
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
