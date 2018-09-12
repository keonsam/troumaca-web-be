import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { Observable } from "rxjs/Observable";
import { UnitOfMeasure } from "../../data/unit-of-measure/unit.of.measure";
import { Observer } from "rxjs/Observer";
import { unitOfMeasures } from "../../db";

export class UnitOfMeasureRepositoryNeDbAdapter implements UnitOfMeasureRepository {
    findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
        const searchStrLocal = new RegExp(searchStr);
        return Observable.create(function (observer: Observer<UnitOfMeasure[]>) {
            if (!searchStr) {
                unitOfMeasures.find({}).limit(100).exec(function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            } else {
                unitOfMeasures.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
                    if (!err) {
                        observer.next(doc);
                    } else {
                        observer.error(err);
                    }
                    observer.complete();
                });
            }
        });
    }

    getUnitOfMeasureById(unitOfMeasureId: string): Observable<UnitOfMeasure> {
        const query = {
            "unitOfMeasureId": unitOfMeasureId
        };
        return Observable.create(function (observer: Observer<UnitOfMeasure>) {
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

    // USED BY OTHER REPOS

    getUnitOfMeasuresByIds(unitOfMeasureIds: string[]): Observable<UnitOfMeasure[]> {
        return Observable.create((observer: Observer<UnitOfMeasure[]>) => {
            unitOfMeasures.find({unitOfMeasureId: {$in: unitOfMeasureIds}}, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }


}