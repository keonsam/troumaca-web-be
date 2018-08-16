import { DepreciationRepository } from "../depreciation.repository";
import { Depreciation } from "../depreciation";
import { Observable } from "rxjs/Observable";
import { generateUUID } from "../../uuid.generator";
import { Observer } from "rxjs/Observer";
import { bookDepreciation, depreciationMethod, taxDepreciation } from "../../db";
import { calcSkip } from "../../db.util";
import { Asset } from "../../asset-type/asset/asset";
import { AssetRepositoryNeDbAdapter } from "../../asset-type/asset/adapter/asset.repository.db.adapter";
import { DepreciationMethod } from "../depreciation.method";
import { DepreciationFormula } from "../depreciation.formula";

export class DepreciationRepositoryNeDbAdapter implements DepreciationRepository {

    private defaultPageSize: number;
    private assetRepositoryNeDbAdapter: AssetRepositoryNeDbAdapter = new AssetRepositoryNeDbAdapter();

    constructor() {
        this.defaultPageSize = 10;
    }

    getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
       return this.getDepreciatableArrSearch()
           .switchMap( depreciation => {
               return this.assetRepositoryNeDbAdapter.findAssets(searchStr, pageSize)
                   .map( assets => {
                       const assetIds = depreciation.map(x => x.assetId);
                       return assets.filter((x: Asset) => assetIds.indexOf(x.assetId) === -1);
                   });
           });
    }

    getBookDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        const depreciationFormula: DepreciationFormula = new DepreciationFormula();
        return this.getDepreciationArrList(pageNumber, pageSize, order)
            .switchMap(depreciationArr => {
                const assetIds: string[] = depreciationArr.map( x => x.assetId);
                return this.assetRepositoryNeDbAdapter.getAssetsByIds(assetIds)
                    .switchMap(assets => {
                        const methodIds: string[] = [];
                        depreciationArr.forEach( value => {
                            if (methodIds.indexOf(value.methodId) === -1) {
                                methodIds.push(value.methodId);
                            }
                            const index = assets.findIndex(x => x.assetId === value.assetId);
                           value.assetName = assets[index].assetTypeName;
                        });
                        return this.getDepreciationMethodsByIds(methodIds)
                            .map( methods => {
                                depreciationArr.forEach( value => {
                                    value.methodName = methods.find(x => x.methodId == value.methodId).name;
                                    const currentDepreciation = depreciationFormula.getCurrentDepreciation(value);
                                    value.currentDepreciation = currentDepreciation.toString();
                                    const cumulativeDepreciation = depreciationFormula.getCumulativeDepreciation(value, currentDepreciation);
                                    value.cumulativeDepreciation = cumulativeDepreciation.toString();
                                    const bookValue = depreciationFormula.getBookValue(parseFloat(value.cost), cumulativeDepreciation);
                                    value.bookValue = bookValue.toString();
                                });
                                return depreciationArr;
                            });
                    });
            });
    }

    getDepreciationCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            bookDepreciation.count({}, function (err: any, count: number) {
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
        return this.getDepreciationByIdLocal(depreciationId)
            .switchMap(depreciation => {
                if (!depreciation) {
                    return Observable.of(depreciation);
                } else {
                    return this.assetRepositoryNeDbAdapter.getAssetById(depreciation.assetId)
                        .map( asset => {
                            depreciation.assetName = asset.assetTypeName;
                            return depreciation;
                        });
                }
            });
    }

    saveDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation> {
        depreciation.depreciationId = generateUUID();
        const db = type === "book" ? bookDepreciation : taxDepreciation;
        return Observable.create(function(observer: Observer<Depreciation>) {
            db.insert(depreciation, function(err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
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
            bookDepreciation.update(query, depreciation, {}, function (err: any, numReplaced: number) {
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
            bookDepreciation.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationMethod(): Observable<DepreciationMethod[]> {
        return Observable.create( (observer: Observer<DepreciationMethod[]>) => {
            depreciationMethod.find({}, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // HELPERS
    getDepreciatableArrSearch(): Observable<Depreciation[]> {
        return Observable.create(function (observer: Observer<Depreciation[]>) {
            bookDepreciation.find({}, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationArrList(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        return Observable.create(function (observer: Observer<Depreciation[]>) {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            bookDepreciation.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, depreciationArr: any) {
                if (!err) {
                    observer.next(depreciationArr);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationByIdLocal(depreciationId: string): Observable<Depreciation> {
        return Observable.create(function (observer: Observer<Depreciation>) {
            const query = {"depreciationId": depreciationId};
            bookDepreciation.findOne(query, function (err: any, depreciation: any) {
                if (!err) {
                    observer.next(depreciation);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationMethodsByIds(methodIds: string[]): Observable<DepreciationMethod[]> {
        return Observable.create( (observer: Observer<DepreciationMethod[]>) => {
            const query = {
                methodId: {$in: methodIds}
            };
            depreciationMethod.find(query, function (err: any, docs: any) {
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