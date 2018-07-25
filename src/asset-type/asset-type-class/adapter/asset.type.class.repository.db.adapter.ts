import { Observable } from "rxjs/Observable";
import { generateUUID } from "../../../uuid.generator";
import Rx from "rxjs";
import { Observer } from "rxjs/Observer";
import { assetTypeClasses, assignedAttributes} from "../../../db";
import { calcSkip } from "../../../db.util";
import { AssetTypeClassRepository } from "../asset.type.class.repository";
import { AssetTypeClass } from "../asset.type.class";
import { AssetTypeClassResponse } from "../asset.type.class.response";
import { AssignedAttribute } from "../../attribute/assigned.attribute";


export class AssetTypeClassRepositoryNeDbAdapter implements AssetTypeClassRepository {

    private defaultPageSize: number;

    constructor() {
        this.defaultPageSize = 10;
    }

    findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
        const searchStrLocal = new RegExp(searchStr);
        const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
        const size = searchStr ? pageSize : 100;
        return Rx.Observable.create(function (observer: Observer<AssetTypeClass[]>) {
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

    getAssetTypeClasses(pageNumber:number, pageSize:number, order:string):Observable<AssetTypeClass[]> {
        return Rx.Observable.create(function (observer:Observer<AssetTypeClass[]>) {
            let skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            assetTypeClasses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeClassCount():Observable<number> {
        return Rx.Observable.create(function (observer:Observer<number>) {
            assetTypeClasses.count({}, function (err:any, count:number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeClassById(assetTypeClassId:string):Observable<AssetTypeClassResponse> {
        return Rx.Observable.create(function (observer:Observer<AssetTypeClassResponse>) {
            const query = {"assetTypeClassId":assetTypeClassId};
            assetTypeClasses.findOne(query, function (err:any, assetTypeClass:any) {
                if (!err) {
                    if (!assetTypeClass) {
                        observer.next(new AssetTypeClassResponse());
                        observer.complete();
                    } else {
                        assignedAttributes.find(query, function (err:any, assignedAttributeArr:any) {
                            if (!err) {
                                observer.next(new AssetTypeClassResponse(true, assetTypeClass, assignedAttributeArr));
                            } else {
                                observer.error(err);
                            }
                            observer.complete();
                        });
                    }
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // getAssetTypeClassByIds(assetTypeClassIds:string[]):Observable<AssetTypeClass[]> {
    //     return Rx.Observable.create(function (observer:Observer<AssetTypeClass[]>) {
    //         assetTypeClasses.find({assetTypeClassId: { $in: assetTypeClassIds}}, function (err:any, docs:any) {
    //             if (!err) {
    //                 observer.next(docs);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    saveAssetTypeClass(assetTypeClass:AssetTypeClass, assignedAttributeArr: AssignedAttribute[]):Observable<AssetTypeClass> {
        assetTypeClass.assetTypeClassId = generateUUID();
        assignedAttributeArr.forEach(value => {
            value.assetTypeClassId = assetTypeClass.assetTypeClassId;
            value.assignedAttributeId = generateUUID();
        });
        return Rx.Observable.create(function (observer:Observer<AssetTypeClass>) {
            assetTypeClasses.insert(assetTypeClass, function (err:any, doc:any) {
                if (!err) {
                    assignedAttributes.insert(assignedAttributeArr, function (err:any, doc2:any) {
                        if (!err) {
                            observer.next(doc);
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass, assignedAttributeArr: AssignedAttribute[]):Observable<number> {
        return Rx.Observable.create(function (observer:Observer<number>) {
            let query = { "assetTypeClassId":assetTypeClassId};
            assetTypeClasses.update(query, assetTypeClass, {}, function (err:any, numReplaced:number) {
                if (!err) {
                    assignedAttributes.remove(query, {multi: true}, function (err:any, numRemoved2:number) {
                        if (!err) {
                            assignedAttributes.insert(assignedAttributeArr, function (err:any, doc2:any) {
                                if (!err) {
                                    observer.next(numReplaced);
                                } else {
                                    observer.error(err);
                                }
                                observer.complete();
                            });
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
        return Rx.Observable.create(function (observer:Observer<number>) {
            let query = {"assetTypeClassId":assetTypeClassId};

            assetTypeClasses.remove(query, {}, function (err:any, numRemoved:number) {
                if (!err) {
                    assignedAttributes.remove(query, {multi: true}, function (err:any, numRemoved2:number) {
                        if (!err) {
                            observer.next(numRemoved);
                        } else {
                            observer.error(err);
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}