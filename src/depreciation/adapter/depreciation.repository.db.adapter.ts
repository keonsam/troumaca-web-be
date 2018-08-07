import { DepreciationRepository } from "../depreciation.repository";
import { Depreciation } from "../depreciation";
import { Observable } from "rxjs/Observable";
import { generateUUID } from "../../uuid.generator";
import { Observer } from "rxjs/Observer";
import { depreciations } from "../../db";
import { calcSkip } from "../../db.util";

export class DepreciationRepositoryNeDbAdapter implements DepreciationRepository {

    private defaultPageSize: number;

    constructor() {
        this.defaultPageSize = 10;
    }

    getDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        return Observable.create(function (observer: Observer<Depreciation[]>) {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            depreciations.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, depreciationArr: any) {
                if (!err) {
                    observer.next(depreciationArr);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            depreciations.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationById(depreciationId: string): Observable<Depreciation> {
        return Observable.create(function (observer: Observer<Depreciation>) {
            const query = {"depreciationId": depreciationId};
            depreciations.findOne(query, function (err: any, depreciation: any) {
                if (!err) {
                    observer.next(depreciation);
                } else {
                    observer.error(err);
                }
                    observer.complete();
                });
        });
    }

    saveDepreciation(depreciation: Depreciation): Observable<Depreciation> {
        depreciation.depreciationId = generateUUID();
        return Observable.create(function(observer: Observer<Depreciation>) {
            depreciations.insert(depreciation, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(depreciation);
                }
                observer.complete();
            });
        });
    }

    updateDepreciation(depreciationId: string, depreciation: Depreciation): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "depreciationId": depreciationId
            };
            depreciations.update(query, depreciation, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteDepreciation(depreciationId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "depreciationId": depreciationId
            };
            depreciations.remove(query, {}, function (err: any, numRemoved: number) {
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