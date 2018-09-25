import { AttributeRepository } from "../../repository/attribute.repository";
import { Attribute } from "../../data/asset/attribute";
import { calcSkip } from "../../db.util";
import { attributes } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { UnitOfMeasureRepositoryNeDbAdapter } from "../unit-of-measure/unit.of.measure.repository.db.adapter";
import { DataTypeRepositoryNeDbAdapter } from "../data-type/data.type.repository.db.adapter";
import { Observable ,  Observer, of } from "rxjs";
import { switchMap, map} from "rxjs/operators";

export class AttributeRepositoryNeDbAdapter implements AttributeRepository {

    private defaultPageSize: number = 10;
    private unitOfMeasureRepositoryNeDbAdapter: UnitOfMeasureRepositoryNeDbAdapter = new UnitOfMeasureRepositoryNeDbAdapter();
    private dataTypeRepositoryNeDbAdapter: DataTypeRepositoryNeDbAdapter = new DataTypeRepositoryNeDbAdapter();

    getAvailableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]> {
        return this.getAvailableAttributesHelper(pageNumber, pageSize, order, assignedAttributes)
            .pipe( switchMap( attributes => {
                const dataTypeIds: string[] = attributes.map(x => x.dataTypeId);
                return this.dataTypeRepositoryNeDbAdapter.getDataTypeByIds(dataTypeIds)
                    .pipe( map( dataTypes => {
                        attributes.forEach(x => {
                           // x.dataTypeName = dataTypes.find(x => x.dataTypeId === x.dataTypeId).name || "";
                        });
                        return attributes;
                    }));
            }));
    }

    getAvailableAttributeCount(assignedAttributes: string[]): Observable<number> {
        const query = { attributeId: { $nin: assignedAttributes}};
        return Observable.create(function (observer: Observer<number>) {
            attributes.count(query, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
       return this.getAttributesLocal(pageNumber, pageSize, order)
            .pipe(switchMap(attributes => {
               if (!attributes) {
                   return of(attributes);
               } else {
                   const unitOfMeasureIds: string[] = [];
                   const dataTypeIds: string[] = [];
                   attributes.forEach(value => {
                       if (value.unitOfMeasureId)  unitOfMeasureIds.push(value.unitOfMeasureId);
                       if (value.dataTypeId) dataTypeIds.push(value.dataTypeId);
                   });
                   return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasuresByIds(unitOfMeasureIds)
                       .pipe(switchMap(unitOfMeasures => {
                          return this.dataTypeRepositoryNeDbAdapter.getDataTypeByIds(dataTypeIds)
                              .pipe(map( dataTypes => {
                                  attributes.forEach(value => {
                                      // const index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                                      // const index2 = dataTypes.findIndex(x => x.dataTypeId === value.dataTypeId);
                                      // value.unitOfMeasureName = index !== -1 ? unitOfMeasures[index].name : "";
                                      // value.dataTypeName = index2 !== -1 ? dataTypes[index2].name : "";
                                  });
                                  return attributes;
                              }));
                       }));
               }
            }));
    }

    getAttributeCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            attributes.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAttributeById(attributeId: string): Observable<Attribute> {
        // return this.getAttributeByIdLocal(attributeId)
        //     .pipe(switchMap(attribute => {
        //         if (!attribute) {
        //             return of(attribute);
        //         } else {
        //             return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasureById(attribute.unitOfMeasureId)
        //                 .pipe(map( unitOfMeasure => {
        //                     // attribute.unitOfMeasureName = unitOfMeasure.name;
        //                     // return attribute;
        //                 }));
        //         }
        //     }));
      return null;
    }

    addAttribute(attribute: Attribute): Observable<Attribute> {
        attribute.attributeId = generateUUID();
        return Observable.create(function (observer: Observer<Attribute>) {
            attributes.insert(attribute, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "attributeId": attributeId
            };

            attributes.update(query, attribute, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAttribute(attributeId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "attributeId": attributeId
            };

            attributes.remove(query, {}, function (err, numRemoved) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // USED BY OTHER REPOS

    getAttributesByIds(attributeIds: string[]): Observable<Attribute[]> {
        return this.getAttributesByIdsHelper(attributeIds)
            .pipe( switchMap( attributes => {
                return this.dataTypeRepositoryNeDbAdapter.getDataTypeByIds(attributes.map(x => x.dataTypeId))
                    .pipe( map( dataTypes => {
                        attributes.forEach(x => {
                           // x.dataTypeName = dataTypes.find(v => v.dataTypeId === x.dataTypeId).name;
                        });
                        return attributes;
                    }));
            }));
    }

    private getAttributesByIdsHelper(attributeIds: string[]): Observable<Attribute[]> {
        return Observable.create(function (observer: Observer<Attribute[]>) {
            const query = { attributeId: {$in: attributeIds}};

            attributes.find(query, function (err: any, docs: any) {
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

    private getAvailableAttributesHelper(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]> {
        const query = { attributeId: { $nin: assignedAttributes}} ;
        return Observable.create( (observer: Observer<Attribute[]>) => {
            const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
            attributes.find(query).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAttributesLocal(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
        const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
        return Observable.create(function (observer: Observer<Attribute[]>) {
            attributes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAttributeByIdLocal(attributeId: string): Observable<Attribute> {
        return Observable.create(function (observer: Observer<Attribute>) {
            const query = {
                "attributeId": attributeId
            };

            attributes.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}