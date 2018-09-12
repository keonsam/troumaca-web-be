import { ValueRepository } from "../../repository/value.repository";
import { Observable } from "rxjs/Observable";
import { Value } from "../../data/asset/value";
import { Observer } from "rxjs/Observer";
import { values } from "../../db";
import { generateUUID } from "../../uuid.generator";

export class ValueRepositoryNeDbAdapter implements ValueRepository {

    private defaultPageSize: number = 10;

    // findValues(searchStr: string, pageSize: number): Observable<Value[]> {
    //     const searchStrLocal = new RegExp(searchStr);
    //     return Observable.create(function (observer: Observer<Value[]>) {
    //         values.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // getValues(pageNumber: number, pageSize: number, order: string): Observable<Value[]> {
    //     const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
    //     return Observable.create(function (observer: Observer<Value[]>) {
    //         values.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // getValueCount(): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         values.count({}, function (err: any, count: number) {
    //             if (!err) {
    //                 observer.next(count);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // getValueById(valueId: string): Observable<Value> {
    //     return Observable.create(function (observer: Observer<Value>) {
    //         const query = {
    //             "valueId": valueId
    //         };
    //         values.findOne(query, function (err: any, doc: any) {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // updateValue(assetTypeId: string, value: Value[]): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "assetTypeId": assetTypeId
    //         };
    //         values.update(query, value, {}, function (err: any, numReplaced: number) {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    // deleteValue(valueId: string): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "valueId": valueId
    //         };
    //
    //         values.remove(query, {}, function (err: any, numRemoved: number) {
    //             if (!err) {
    //                 observer.next(numRemoved);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    // USED BY OTHER REPOS

    saveValues(valueArr: Value[]): Observable<Value[]> {
        valueArr.forEach((next: Value) => {
            if (!next.valueId) {
                next.valueId = generateUUID();
            }
        });
        return Observable.create(function (observer: Observer<Value>) {
            values.insert(valueArr, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    getValuesByAssetTypeId(assetTypeId: string): Observable<Value[]> {
        return Observable.create(function (observer: Observer<Value[]>) {
            values.find({assetTypeId}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteValuesByAssetTypeId(assetTypeId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "assetTypeId": assetTypeId
            };

            values.remove(query, { multi: true }, function (err: any, numRemoved: number) {
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
