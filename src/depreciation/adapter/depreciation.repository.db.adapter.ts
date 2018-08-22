import { DepreciationRepository } from "../depreciation.repository";
import { Depreciation } from "../depreciation";
import { Observable ,  Observer, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { generateUUID } from "../../uuid.generator";
import { bookDepreciation, depreciationMethod, depreciationSystem, propertyClasses, taxDepreciation } from "../../db";
import { calcSkip } from "../../db.util";
import { Asset } from "../../asset-type/asset/asset";
import { AssetRepositoryNeDbAdapter } from "../../asset-type/asset/adapter/asset.repository.db.adapter";
import { DepreciationMethod } from "../depreciation.method";
import { DepreciationFormula } from "../depreciation.formula";
import { DepreciationSystem } from "../depreciation.system";
import { PropertyClass } from "../property.class";

export class DepreciationRepositoryNeDbAdapter implements DepreciationRepository {

    private defaultPageSize: number;
    private assetRepositoryNeDbAdapter: AssetRepositoryNeDbAdapter = new AssetRepositoryNeDbAdapter();

    constructor() {
        this.defaultPageSize = 10;
    }

    getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
       return this.getDepreciatableArrSearch()
           .pipe(switchMap( depreciation => {
               return this.assetRepositoryNeDbAdapter.findAssets(searchStr, pageSize)
                   .pipe(map( assets => {
                       const assetIds = depreciation.map(x => x.assetId);
                       return assets.filter((x: Asset) => assetIds.indexOf(x.assetId) === -1);
                   }));
           }));
    }

    getBookDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        const depreciationFormula: DepreciationFormula = new DepreciationFormula();
        return this.getDepreciationArrList(pageNumber, pageSize, order)
            .pipe(switchMap(depreciationArr => {
                const assetIds: string[] = [];
                const methodIds: string[] = [];
                depreciationArr.forEach( value => {
                    assetIds.push(value.assetId);
                    if (methodIds.indexOf(value.methodId) === -1) {
                        methodIds.push(value.methodId);
                    }
                });
                return this.assetRepositoryNeDbAdapter.getAssetsByIds(assetIds)
                    .pipe(switchMap(assets => {
                        return this.getDepreciationMethodsByIds(methodIds)
                            .pipe(map( methods => {
                                depreciationArr.forEach( value => {
                                    const index = assets.findIndex(x => x.assetId === value.assetId);
                                    value.assetName = index !== -1 ? assets[index].assetTypeName : "";
                                    value.methodName = methods.find(x => x.methodId == value.methodId).name;
                                    const currentDepreciation = depreciationFormula.getCurrentDepreciation(value);
                                    value.currentDepreciation = currentDepreciation.toString();
                                    const cumulativeDepreciation = depreciationFormula.getCumulativeDepreciation(value, currentDepreciation);
                                    value.cumulativeDepreciation = cumulativeDepreciation.toString();
                                    const bookValue = depreciationFormula.getBookValue(parseFloat(value.cost), cumulativeDepreciation);
                                    value.bookValue = bookValue.toString();
                                });
                                return depreciationArr;
                            }));
                    }));
            }));
    }

    getTaxDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        return this.getTaxDepreciationArrList(pageNumber, pageSize, order)
            .pipe(switchMap(depreciationArr => {
                const assetIds: string[] = [];
                const methodIds: string[] = [];
                const systemIds: string[] = [];
                const propertyClassIds: string[] = [];
                depreciationArr.forEach( x => {
                    assetIds.push(x.assetId);
                    if (methodIds.indexOf(x.methodId) === -1) {
                        methodIds.push(x.methodId);
                    }
                    if (systemIds.indexOf(x.systemId) === -1) {
                        systemIds.push(x.systemId);
                    }
                    if (propertyClassIds.indexOf(x.propertyClassId) === -1) {
                        propertyClassIds.push(x.propertyClassId);
                    }
                });
                return this.assetRepositoryNeDbAdapter.getAssetsByIds(assetIds)
                    .pipe(switchMap(assets => {
                        return this.getDepreciationMethodsByIds(methodIds)
                            .pipe(switchMap( methods => {
                                return this.getDepreciationSystemsByIds(systemIds)
                                    .pipe(switchMap( systems => {
                                       return this.getPropertyClassesByIds(propertyClassIds)
                                           .pipe(map( propertyClassArr => {
                                               depreciationArr.forEach( x => {
                                                  x.methodName = methods.find( i => i.methodId === x.methodId).name;
                                                  x.depreciationSystemName = systems.find( i => i.systemId === x.systemId).name;
                                                  x.propertyClassName = propertyClassArr.find( i => i.propertyClassId === x.propertyClassId).name;
                                                  const index = assets.findIndex(i => i.assetId === x.assetId);
                                                  x.assetName = index !== -1 ? assets[index].assetTypeName : "";
                                               });
                                              return depreciationArr;
                                           }));
                                    }));
                            }));
                    }));
            }));
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

    getTaxDepreciationCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            taxDepreciation.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationById(depreciationId: string, type: string): Observable<Depreciation> {
        return this.getDepreciationByIdLocal(depreciationId, type)
            .pipe(switchMap(depreciation => {
                if (!depreciation) {
                    return of(depreciation);
                } else {
                    return this.assetRepositoryNeDbAdapter.getAssetById(depreciation.assetId)
                        .pipe(map( asset => {
                            depreciation.assetName = asset.assetTypeName;
                            return depreciation;
                        }));
                }
            }));
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

    updateDepreciation(depreciationId: string, depreciation: Depreciation, type: string): Observable<number> {
        const db = type === "book" ? bookDepreciation : taxDepreciation;
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "depreciationId": depreciationId
            };
            db.update(query, depreciation, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteDepreciation(depreciationId: string, type: string): Observable<number> {
        const db = type === "book" ? bookDepreciation : taxDepreciation;
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "depreciationId": depreciationId
            };
            db.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]> {
        const adsQuery = { methodId: "457b0ac1-b68b-4cbe-a341-b2a9e0c70c3e"};
        const gdsQuery = {methodId: { $in: ["457b0ac1-b68b-4cbe-a341-b2a9e0c70c3e", "05da85af-337b-4d09-8a34-d0849f52d0d8"] } };
        const query = type === "book" ? {} : system === "a214aa44-b105-4b28-b1ff-64532012e7d7" ? adsQuery : gdsQuery;
        return Observable.create( (observer: Observer<DepreciationMethod[]>) => {
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

    getDepreciationSystems(): Observable<DepreciationSystem[]> {

        return Observable.create( (observer: Observer<DepreciationSystem[]>) => {
            depreciationSystem.find({}, (err: any, docs: any) => {
               if (!err) {
                   observer.next(docs);
               } else {
                   observer.error(err);
               }
               observer.complete();
            });
        });
    }

    getPropertyClasses(system?: string): Observable<PropertyClass[]> {
        const gdsIds = ["dedbdfdd-5245-4db8-89a0-bea36debcb85", "d90c774b-88ea-4365-9157-7e00eab3698d",
            "f8140309-811a-4fc9-a63f-676cc8a3e5ff", "6a502367-5e7d-4bb3-97bf-95d9bfa1c181", "50e61fc4-23e6-4d06-b329-a0c136a8cf0f",
            "68785a2c-2ef4-44a3-9a45-8aaa6d491684", "14d3c5d8-5d75-43ec-b962-f356ac0f5c5b",
            "1b61528d-cba4-45da-81c0-1d22f2ebd216", "73883af0-c759-43c0-91d4-9822fe6a170b"];
        const gdsQuery = { propertyClassId: {$in: gdsIds } };
        const adsQuery = { propertyClassId: {$nin: gdsIds } };
        const query = !system ? {} : system === "9f549eef-2af4-4d6b-8a52-cae98e7cbf50" ? gdsQuery : adsQuery;
        return Observable.create( (observer: Observer<DepreciationSystem[]>) => {
            propertyClasses.find(query, (err: any, docs: any) => {
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
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<Depreciation[]>) {
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

    getTaxDepreciationArrList(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<Depreciation[]>) {
            taxDepreciation.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, depreciationArr: any) {
                if (!err) {
                    observer.next(depreciationArr);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getDepreciationByIdLocal(depreciationId: string, type: string): Observable<Depreciation> {
        const db = type === "book" ? bookDepreciation : taxDepreciation;
        return Observable.create(function (observer: Observer<Depreciation>) {
            const query = {"depreciationId": depreciationId};
            db.findOne(query, function (err: any, depreciation: any) {
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

    getDepreciationSystemsByIds(systemIds: string[]): Observable<DepreciationSystem[]> {
        return Observable.create( (observer: Observer<DepreciationSystem[]>) => {
            const query = {
                systemId: {$in: systemIds}
            };
            depreciationSystem.find(query, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getPropertyClassesByIds(propertyClassIds: string[]): Observable<PropertyClass[]> {
        return Observable.create( (observer: Observer<PropertyClass[]>) => {
            const query = {
                propertyClassId: {$in: propertyClassIds}
            };
            propertyClasses.find(query, function (err: any, docs: any) {
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