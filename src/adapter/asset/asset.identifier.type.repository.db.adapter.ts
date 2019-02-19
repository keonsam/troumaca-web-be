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

    findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
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

    getAssetIdentifierTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetIdentifierType[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create((observer: Observer<AssetIdentifierType[]>) => {
            assetIdentifierTypes.find({}).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetIdentifierTypeCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetIdentifierTypes.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
        return Observable.create((observer: Observer<AssetIdentifierType>) => {
            const query = {"assetIdentifierTypeId": assetIdentifierTypeId};
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

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
        assetIdentifierType.assetIdentifierTypeId = generateUUID();
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

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType): Observable<number> {
        const query = {assetIdentifierTypeId};
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

    deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
        const query = {assetIdentifierTypeId};
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
