import { generateUUID } from "../../uuid.generator";
import { assetTypeClasses, assignedAttributes } from "../../db";
import { calcSkip } from "../../db.util";
import { AssetTypeClassRepository } from "../../repository/asset.type.class.repository";
import { AssetTypeClass } from "../../data/asset/asset.type.class";
import { AssetTypeClassResponse } from "../../data/asset/asset.type.class.response";
import { AssignedAttribute } from "../../data/asset/assigned.attribute";
import { AssignedAttributeRepositoryNeDbAdapter } from "./assigned.attribute.repository.db.adapter";
import { Observable ,  Observer, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

export class AssetTypeClassRepositoryNeDbAdapter implements AssetTypeClassRepository {

    private defaultPageSize: number;
    private assignedAttributeRepositoryNeDbAdapter: AssignedAttributeRepositoryNeDbAdapter = new AssignedAttributeRepositoryNeDbAdapter();

    constructor() {
        this.defaultPageSize = 10;
    }

    findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
        const size = searchStr ? pageSize : 100;
        return Observable.create(function (observer: Observer<AssetTypeClass[]>) {
            assetTypeClasses.find(query).limit(size).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetTypeClass[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<AssetTypeClass[]>) {
            assetTypeClasses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeClassCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetTypeClasses.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeClassById(assetTypeClassId: string): Observable<AssetTypeClassResponse> {
        // return this.getAssetTypeClassByIdLocal(assetTypeClassId)
        //     .pipe(switchMap(assetTypeClass => {
        //         return this.assignedAttributeRepositoryNeDbAdapter.getAssignedAttributesByClassId(assetTypeClassId)
        //             .pipe(map(assignedAttributes => {
        //                 // return new AssetTypeClassResponse(true, assetTypeClass, assignedAttributes);
        //             }));
        //     }));
      return null;
    }

    saveAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributeArr: AssignedAttribute[]): Observable<AssetTypeClass> {
        assetTypeClass.assetTypeClassId = generateUUID();
        assignedAttributeArr.forEach(value => {
            value.assetTypeClassId = assetTypeClass.assetTypeClassId;
            value.assignedAttributeId = generateUUID();
        });
        return this.saveAssetTypeClassLocal(assetTypeClass)
            .pipe(switchMap(doc => {
                if (!doc) {
                    return of(doc);
                } else {
                    return this.assignedAttributeRepositoryNeDbAdapter.saveAssignedAttributes(assignedAttributeArr)
                        .pipe(map(assignedAttributes => {
                            return doc;
                        }));
                }
            }));
    }

    updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributeArr: AssignedAttribute[]): Observable<number> {
        return this.updateAssetTypeClassLocal(assetTypeClassId, assetTypeClass)
            .pipe(switchMap(numReplaced => {
                if (!numReplaced) {
                    return of(numReplaced);
                } else {
                    return this.assignedAttributeRepositoryNeDbAdapter.deleteAssignedAttributes(assetTypeClassId)
                        .pipe(switchMap( num => {
                            return this.assignedAttributeRepositoryNeDbAdapter.saveAssignedAttributes(assignedAttributeArr)
                                .pipe(map( assignedAttributeArr => {
                                    return numReplaced;
                                }));
                        }));
                }
            }));
    }

    deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
        return this.deleteAssetTypeClassLocal(assetTypeClassId)
            .pipe(switchMap(num => {
                if (!num) {
                    return of(num);
                } else {
                    return this.assignedAttributeRepositoryNeDbAdapter.deleteAssignedAttributes(assetTypeClassId);
                }
            }));
    }

    // USED BY OTHER REPOS
    getAssetTypeClassByIds(assetTypeClassIds: string[]): Observable<AssetTypeClass[]> {
        return Observable.create(function (observer: Observer<AssetTypeClass[]>) {
            assetTypeClasses.find({assetTypeClassId: {$in: assetTypeClassIds}}, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // HELPS

    getAssetTypeClassByIdLocal(assetTypeClassId: string): Observable<AssetTypeClass> {
        return Observable.create(function (observer: Observer<AssetTypeClass>) {
            const query = {"assetTypeClassId": assetTypeClassId};
            assetTypeClasses.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveAssetTypeClassLocal(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
        return Observable.create(function (observer: Observer<AssetTypeClass>) {
            assetTypeClasses.insert(assetTypeClass, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateAssetTypeClassLocal(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            const query = {"assetTypeClassId": assetTypeClassId};
            assetTypeClasses.update(query, assetTypeClass, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetTypeClassLocal(assetTypeClassId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {"assetTypeClassId": assetTypeClassId};

            assetTypeClasses.remove(query, {}, function (err: any, numRemoved: number) {
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