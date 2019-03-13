import {AssetNameTypeRepository} from "../../repository/asset.name.type.repository";
import { AssetNameType} from "../../data/asset/asset.name.type";
import {generateUUID} from "../../uuid.generator";
import { assetNameTypes } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class AssetNameTypeRepositoryDbAdapter implements AssetNameTypeRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findAssetNameTypes(searchStr: string, pageSize: number, options: any): Observable<AssetNameType[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            name: {$regex: searchStrLocal},
            ownerPartyId: options["Owner-Party-Id"]
        } : {};
        return Observable.create((observer: Observer<AssetNameType[]>) => {
            assetNameTypes.find(query).limit(100).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetNameTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetNameType[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create((observer: Observer<AssetNameType[]>) => {
            assetNameTypes.find(query).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetNameTypeCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetNameTypes.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetNameTypeById(assetNameTypeId: string, options: any): Observable<AssetNameType> {
        return Observable.create((observer: Observer<AssetNameType>) => {
            const query = {
                "assetNameTypeId": assetNameTypeId,
                ownerPartyId: options["Owner-Party-Id"]
            };
            assetNameTypes.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveAssetNameType(assetNameType: AssetNameType, options: any): Observable<AssetNameType> {
        assetNameType.assetNameTypeId = generateUUID();
        assetNameType.ownerPartyId = options["Owner-Party-Id"];
        return Observable.create(function (observer: Observer<AssetNameType>) {
            assetNameTypes.insert(assetNameType, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options: any): Observable<number> {
        const query = {
            assetNameTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetNameTypes.update(query, assetNameType, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetNameType(assetNameTypeId: string, options: any): Observable<number> {
        const query = {
            assetNameTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetNameTypes.remove(query, {}, function (err: any, numRemoved: number) {
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
