import { UnitOfMeasure} from "../../data/unit-of-measure/unit.of.measure";
import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import {generateUUID} from "../../uuid.generator";
import { unitOfMeasures } from "../../db";
import {calcSkip} from "../../db.util";
import {Observable, Observer} from "rxjs";

export class UnitOfMeasureRepositoryDbAdapter implements UnitOfMeasureRepository {

    private defaultPageSize: number = 10;

    constructor() {
    }

    findUnitOfMeasures(searchStr: string, pageSize: number, options: any): Observable<UnitOfMeasure[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
        return Observable.create((observer: Observer<UnitOfMeasure[]>) => {
            unitOfMeasures.find(query).limit(pageSize).exec((err: any, docs: any) => {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUnitOfMeasures(pageNumber: number, pageSize: number, order: string, options: any): Observable<UnitOfMeasure[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create((observer: Observer<UnitOfMeasure[]>) => {
            unitOfMeasures.find(query).skip(skip).limit(pageSize).exec(function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUnitOfMeasureCount(options: any): Observable<number> {
        const query = {
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            unitOfMeasures.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getUnitOfMeasureById(unitOfMeasureId: string, options: any): Observable<UnitOfMeasure> {
        return Observable.create((observer: Observer<UnitOfMeasure>) => {
            const query = {
                "unitOfMeasureId": unitOfMeasureId,
                ownerPartyId: options["Owner-Party-Id"]
            };
            unitOfMeasures.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveUnitOfMeasure(unitOfMeasure: UnitOfMeasure, options: any): Observable<UnitOfMeasure> {
        unitOfMeasure.unitOfMeasureId = generateUUID();
        unitOfMeasure.ownerPartyId = options["Owner-Party-Id"];
        return Observable.create(function (observer: Observer<UnitOfMeasure>) {
            unitOfMeasures.insert(unitOfMeasure, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateUnitOfMeasure(unitOfMeasureId: string, unitOfMeasure: UnitOfMeasure, options: any): Observable<number> {
        const query = {
            unitOfMeasureId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            unitOfMeasures.update(query, unitOfMeasure, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteUnitOfMeasure(unitOfMeasureId: string, options: any): Observable<number> {
        const query = {
            unitOfMeasureId,
            ownerPartyId: options["Owner-Party-Id"]
        };
        return Observable.create(function (observer: Observer<number>) {
            unitOfMeasures.remove(query, {}, function (err: any, numRemoved: number) {
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
