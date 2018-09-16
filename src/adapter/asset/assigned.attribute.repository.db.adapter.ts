import { calcSkip } from "../../db.util";
import { Attribute } from "../../data/asset/attribute";
import { assignedAttributes, attributes } from "../../db";
import { AssignedAttributeRepository } from "../../repository/assigned.attribute.repository";
import { AssignedAttribute } from "../../data/asset/assigned.attribute";
import { AttributeRepositoryNeDbAdapter } from "./attribute.repository.db.adapter";
import { generateUUID } from "../../uuid.generator";
import { Observable ,  Observer, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";

export class AssignedAttributeRepositoryNeDbAdapter implements AssignedAttributeRepository {
    
    private defaultPageSize: number = 10;
    private attributeRepositoryNeDbAdapter: AttributeRepositoryNeDbAdapter = new AttributeRepositoryNeDbAdapter();

    // getAssignableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[], type: string): Observable<Attribute[]> {
    //     const query = type === "available" ? { attributeId: { $nin: assignedAttributes}} : { attributeId: { $in: assignedAttributes }};
    //     return Observable.create( (observer: Observer<Attribute[]>) => {
    //         const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
    //         attributes.find(query).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    // getAssignableAttributesCount(assignedAttributes: string[], type: string): Observable<number> {
    //     const query = type === "available" ? { attributeId: { $nin: assignedAttributes}} : { attributeId: { $in: assignedAttributes }};
    //     return Observable.create(function (observer: Observer<number>) {
    //         attributes.count(query, function (err: any, count: number) {
    //             if (!err) {
    //                 observer.next(count);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
        return this.getAssignedAttributesById(assetTypeClassId)
            .pipe(switchMap(assignedAttributes => {
                const assignedArray: string[] = assignedAttributes.map((x: AssignedAttribute) => x.attributeId);
                return this.attributeRepositoryNeDbAdapter.getAttributesByIds(assignedArray)
                    .pipe(map( attributes => {
                        assignedAttributes.forEach(value => {
                            const index = attributes.findIndex(x => x.attributeId === value.attributeId);
                            value.attributeName = index !== -1 ? attributes[index].name : "";
                            value.dataTypeName = attributes[index].dataTypeName;
                        });
                        return assignedAttributes;
                    }));
            }));
    }

    // USED BY OTHER REPOS

    getAssignedAttributesById(assetTypeClassId: string): Observable<AssignedAttribute[]> {
        return Observable.create(function (observer: Observer<AssignedAttribute[]>) {
            const query = {
                assetTypeClassId
            };
            assignedAttributes.find(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    saveAssignedAttributes(assignedAttributeArr: AssignedAttribute[]): Observable<AssignedAttribute[]> {
        assignedAttributeArr.forEach( value => {
            if (!value.assignedAttributeId) {
                value.assignedAttributeId = generateUUID();
            }
        });
        return Observable.create( (observer: Observer<AssignedAttribute[]>) => {
            assignedAttributes.insert(assignedAttributeArr, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssignedAttributes(assetTypeClassId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                assetTypeClassId
            };

            assignedAttributes.remove(query, {multi: true}, function (err, numRemoved) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // HELPS

        //
    // getAttributeByArray(attributeArray: string[]): Observable<Attribute[]> {
    //     return Observable.create(function (observer: Observer<Attribute[]>) {
    //         attributes.find({ attributeId: { $in: attributeArray }}, function (err: any, doc: any) {
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
    // saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]> {
    //     return Observable.create(function (observer: Observer<Attribute[]>) {
    //         assignedAttribute.forEach(value => {
    //             if (!value.assignedAttributeId) {
    //                 value.assignedAttributeId = generateUUID();
    //             }
    //         });
    //         assignedAttributes.insert(assignedAttribute, function (err: any, doc: any) {
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
    //
    // addAttribute(attribute: Attribute): Observable<Attribute> {
    //     attribute.attributeId = generateUUID();
    //     return Observable.create(function (observer: Observer<Attribute>) {
    //         attributes.insert(attribute, function (err: any, doc: any) {
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
    //
    // deleteAttribute(attributeId: string): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "attributeId": attributeId
    //         };
    //
    //         attributes.remove(query, {}, function (err, numRemoved) {
    //             if (!err) {
    //                 observer.next(numRemoved);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }
    //
    //
    // getAttributeById(attributeId: string): Observable<Attribute> {
    //     return Observable.create(function (observer: Observer<Attribute>) {
    //         const query = {
    //             "attributeId": attributeId
    //         };
    //
    //         attributes.findOne(query, function (err: any, doc: any) {
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
    // getAttributeCount(): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         attributes.count({}, function (err: any, count: number) {
    //             if (!err) {
    //                 observer.next(count);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    //
    // }
    //
    // getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
    //     return Observable.create(function (observer: Observer<Attribute[]>) {
    //         const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
    //         attributes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
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
    // updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             "attributeId": attributeId
    //         };
    //
    //         attributes.update(query, attribute, {}, function (err: any, numReplaced: number) {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    //
    // }
    //
    // updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number> {
    //     return Observable.create(function (observer: Observer<number>) {
    //         const query = {
    //             assetTypeClassId
    //         };
    //
    //         assignedAttributes.update(query, assignedAttribute, {}, function (err: any, numReplaced: number) {
    //             if (!err) {
    //                 observer.next(numReplaced);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

}