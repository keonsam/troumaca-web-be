import {AssetIdentifierTypeRepository} from "../../repository/asset.identifier.type.repository";
import { AssetIdentifierType} from "../../data/asset/asset.identifier.type";
import {generateUUID} from "../../uuid.generator";
import { assetIdentifierTypes } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class AssetIdentifierTypeRepositoryDbAdapter implements AssetIdentifierTypeRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findAssetIdentifierTypes(searchStr: string, pageSize: number, options: any): Observable<AssetIdentifierType[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {
            name: {$regex: searchStrLocal},
            ownerPartyId: options["Owner-Party-Id"]
        } : {};
        return Observable.create((observer: Observer<AssetIdentifierType[]>) => {
            assetIdentifierTypes.find(query).limit(100).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetIdentifierType[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create((observer: Observer<AssetIdentifierType[]>) => {
            assetIdentifierTypes.find(query).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetIdentifierTypeCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetIdentifierTypes.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string, options: any): Observable<AssetIdentifierType> {
        return Observable.create((observer: Observer<AssetIdentifierType>) => {
            const query = {
                "assetIdentifierTypeId": assetIdentifierTypeId,
                ownerPartyId: options["Owner-Party-Id"]
            };
            assetIdentifierTypes.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<AssetIdentifierType> {
        assetIdentifierType.assetIdentifierTypeId = generateUUID();
        assetIdentifierType.ownerPartyId = options["Owner-Party-Id"];
        return Observable.create(function (observer: Observer<AssetIdentifierType>) {
            assetIdentifierTypes.insert(assetIdentifierType, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options: any): Observable<number> {
        const query = {
            assetIdentifierTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetIdentifierTypes.update(query, assetIdentifierType, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string, options: any): Observable<number> {
        const query = {
            assetIdentifierTypeId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            assetIdentifierTypes.remove(query, {}, function (err: any, numRemoved: number) {
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
