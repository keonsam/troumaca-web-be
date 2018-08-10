import { AttributeRepository } from "../attribute.repository";
import { Observable } from "rxjs/Observable";
import { Attribute } from "../attribute";
import { Observer } from "rxjs/Observer";
import { calcSkip } from "../../../db.util";
import { attributes } from "../../../db";
import { generateUUID } from "../../../uuid.generator";
import { UnitOfMeasureRepositoryNeDbAdapter } from "../../../unit-of-measure/adapter/unit.of.measure.repository.db.adapter";
import { DataTypeRepositoryNeDbAdapter } from "../../../data-type/adapter/data.type.repository.db.adapter";

export class AttributeRepositoryNeDbAdapter implements AttributeRepository {

    private defaultPageSize: number = 10;
    private unitOfMeasureRepositoryNeDbAdapter: UnitOfMeasureRepositoryNeDbAdapter = new UnitOfMeasureRepositoryNeDbAdapter();
    private dataTypeRepositoryNeDbAdapter: DataTypeRepositoryNeDbAdapter = new DataTypeRepositoryNeDbAdapter();

    getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
       return this.getAttributesLocal(pageNumber, pageSize, order)
            .switchMap(attributes => {
               if (!attributes) {
                   return Observable.of(attributes);
               } else {
                   const unitOfMeasureIds: string[] = [];
                   const dataTypeIds: string[] = [];
                   attributes.forEach(value => {
                       if (value.unitOfMeasureId)  unitOfMeasureIds.push(value.unitOfMeasureId);
                       if (value.dataTypeId) dataTypeIds.push(value.dataTypeId);
                   });
                   return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasuresByIds(unitOfMeasureIds)
                       .switchMap(unitOfMeasures => {
                          return this.dataTypeRepositoryNeDbAdapter.getDataTypeByIds(dataTypeIds)
                              .map( dataTypes => {
                                  attributes.forEach(value => {
                                      const index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                                      const index2 = dataTypes.findIndex(x => x.dataTypeId === value.dataTypeId);
                                      value.unitOfMeasureName = index !== -1 ? unitOfMeasures[index].name : "";
                                      value.dataTypeName = index2 !== -1 ? dataTypes[index2].name : "";
                                  });
                                  return attributes;
                              });
                       });
               }
            });
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
        return this.getAttributeByIdLocal(attributeId)
            .switchMap(attribute => {
                if (!attribute) {
                    return Observable.of(attribute);
                } else {
                    return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasureById(attribute.unitOfMeasureId)
                        .map( unitOfMeasure => {
                            attribute.unitOfMeasureName = unitOfMeasure.name;
                            return attribute;
                        });
                }
            });
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