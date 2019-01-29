import {AssetCharacteristicRepository} from "../../repository/asset.characteristic.repository";
import { AssetCharacteristic} from "../../data/asset/asset.characteristic";
import {generateUUID} from "../../uuid.generator";
import { assetChars } from "../../db";
import {calcSkip} from "../../db.util";
import { Observable, Observer, of } from "rxjs";

export class AssetCharacteristicRepositoryDbAdapter implements AssetCharacteristicRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
        return Observable.create((observer: Observer<AssetCharacteristic[]>) => {
            assetChars.find(query).limit(pageSize).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetCharacteristics(pageNumber: number, pageSize: number, order: string): Observable<AssetCharacteristic[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create((observer: Observer<AssetCharacteristic[]>) => {
            assetChars.find({}).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetCharacteristicCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetChars.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetCharacteristicById(assetCharacteristicId: string): Observable<AssetCharacteristic> {
        return Observable.create((observer: Observer<AssetCharacteristic>) => {
            const query = {"assetCharacteristicId": assetCharacteristicId};
            assetChars.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getTypes(): Observable<any[]> {
        return of([
            {
                typeId: "054b50c2-9e8a-4cfb-8bac-54af9ac53613",
                name: "Continuous"
            },
            {
                typeId: "2f062d58-f464-40a6-921a-a49528f205f6",
                name: "Asset Category"
            }
        ]);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
        assetCharacteristic.assetCharacteristicId = generateUUID();
        return Observable.create(function (observer: Observer<AssetCharacteristic>) {
            assetChars.insert(assetCharacteristic, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic): Observable<number> {
        const query = {assetCharacteristicId};
        return Observable.create(function (observer: Observer<number>) {
            assetChars.update(query, assetCharacteristic, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
        const query = {assetCharacteristicId};
        return Observable.create(function (observer: Observer<number>) {
            assetChars.remove(query, {}, function (err: any, numRemoved: number) {
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
