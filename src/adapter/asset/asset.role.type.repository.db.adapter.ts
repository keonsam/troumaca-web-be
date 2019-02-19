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

    findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
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

    getAssetRoleTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetRoleType[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create((observer: Observer<AssetRoleType[]>) => {
            assetRoleTypes.find({}).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetRoleTypeCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetRoleTypes.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetRoleTypeById(assetRoleTypeId: string): Observable<AssetRoleType> {
        return Observable.create((observer: Observer<AssetRoleType>) => {
            const query = {"assetRoleTypeId": assetRoleTypeId};
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

    saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
        assetRoleType.assetRoleTypeId = generateUUID();
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

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType): Observable<number> {
        const query = {assetRoleTypeId};
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

    deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
        const query = {assetRoleTypeId};
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
