import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Attribute} from "./attribute";

import {createAttributeRepositoryFactory} from './attribute.repository.factory';
import {AttributeRepository} from "./attribute.repository";
import {Result} from "../../result.success";
// import {PageResponse} from "../../page.response";
// import {assignedAttributes} from "../../db";
// import {assign} from "rxjs/util/assign";
import {shapeAttributesResponse} from "./attribute.response.shaper";
import {AssignedAttribute} from "./assigned.attribute";
import {UnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository";
import {createUnitOfMeasureRepository} from "../../unit-of-measure/unit.of.measure.repository.factory";
import {DataTypeRepository} from "../../data-type/data.type.repository";
import {createDataTypeRepository} from "../../data-type/data.type.repository.factory";
import {UnitOfMeasure} from "../../unit-of-measure/unit.of.measure";
import {DataType} from "../../data-type/data.type";

export class AttributeOrchestrator {

  private attributeClassRepository:AttributeRepository;
  private unitOfMeasureRepository: UnitOfMeasureRepository;
  private dataTypeRepository:DataTypeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
    this.unitOfMeasureRepository = createUnitOfMeasureRepository();
    this.dataTypeRepository = createDataTypeRepository();
  }

  getAttributes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort: string = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
      .getAttributes(number, size, sort)
      .switchMap((attributes: Attribute[]) => {
        if (attributes.length === 0) {
          let shapeAttributesResp: any = shapeAttributesResponse(attributes, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "No entry in database", shapeAttributesResp));
        }
        return this.attributeClassRepository
          .getAttributeCount()
          .switchMap(count => {
            let unitOfMeasureIds: string[] = [];
            let dataTypeIds: string[] = [];
            attributes.forEach(value => {
            if (value.unitOfMeasureId)  unitOfMeasureIds.push(value.unitOfMeasureId);
            if (value.dataTypeId) dataTypeIds.push(value.dataTypeId);
            });
            return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
              .switchMap((unitOfMeasures: UnitOfMeasure[]) => {
                return this.dataTypeRepository.getDataTypeByIds(dataTypeIds)
                  .map((dataTypes: DataType[]) => {
                    attributes.forEach(value => {
                      let index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                      let index2 = dataTypes.findIndex(x => x.dataTypeId === value.dataTypeId);
                      value.unitOfMeasure = unitOfMeasures[index];
                      value.dataType = dataTypes[index2];
                    });
                    let shapeAttributesResp: any = shapeAttributesResponse(attributes, number, size, attributes.length, count, sort);
                    return new Result<any>(false, "attributes", shapeAttributesResp);
                  });
              });
          });
      });
  };

    getAttributeById(attributeId:string):Observable<Attribute> {
        return this.attributeClassRepository.getAttributeById(attributeId)
            .switchMap((attribute: Attribute) => {
                if (!attribute.attributeId || !attribute.unitOfMeasureId) {
                    return Observable.of(attribute);
                } else {
                    return this.unitOfMeasureRepository.getUnitOfMeasureById(attribute.unitOfMeasureId)
                        .map((unitOfMeasure: UnitOfMeasure) => {
                            attribute.unitOfMeasure = unitOfMeasure;
                            return attribute;
                        });
                }
            });
    };

    saveAttribute(attribute:Attribute):Observable<Attribute> {
        return this.attributeClassRepository.addAttribute(attribute);
    };

    updateAttribute(attributeId:string, attribute:Attribute):Observable<number> {
        return this.attributeClassRepository.updateAttribute(attributeId, attribute);
    }

    deleteAttribute(attributeId:string):Observable<number> {
        return this.attributeClassRepository.deleteAttribute(attributeId);
    }

    getAvailableAttributes(number:number, size:number, field:string, direction:string, availableAttributes:string[]):Observable<Result<any>> {
        let sort = getSortOrderOrDefault(field, direction);
        return this.attributeClassRepository
            .getAvailableAttributes(number, size, sort, availableAttributes)
            .flatMap(value => {
                return this.attributeClassRepository
                    .getAvailableAttributeCount()
                    .map(count => {
                        let shapeAttrResp = shapeAttributesResponse( value, number, size, value.length, count, sort);
                        return new Result<any>(false, "success", shapeAttrResp);
                        // return new PageResponse<Attribute[]>(value, number, size, count, sort);
                    });
            });
    }

    getAssignedAttributes(number:number, size:number, field:string, direction:string, assignedAttributes:string[]):Observable<Result<any>> {
        let sort = getSortOrderOrDefault(field, direction);
        return this.attributeClassRepository
            .getAssignedAttributes(number, size, sort, assignedAttributes)
            .flatMap(value => {
                return this.attributeClassRepository
                    .getAvailableAttributeCount()
                    .map(count => {
                        let shapeAttrResp = shapeAttributesResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "success", shapeAttrResp);
                        //return new PageResponse<Attribute[]>(value, number, size, count, sort);
                    });
            });
    }

    getAssignedAttributesByClassId(assetTypeClassId: string):Observable<AssignedAttribute[]> {
        return this.attributeClassRepository.getAssignedAttributesById(assetTypeClassId)
            .switchMap((assignedAttributes:AssignedAttribute[]) => {
                if(assignedAttributes.length === 0) {
                    return Observable.of(assignedAttributes);
                }else {
                    let assignedArray: string[] = assignedAttributes.map((x: AssignedAttribute) => x.attributeId);
                    return this.getAttributesForAssigned(assignedArray)
                        .map(attributes => {
                            assignedAttributes.forEach(value => {
                                let index = attributes.findIndex(x => x.attributeId === value.attributeId);
                                value.attribute = attributes[index];
                            });
                            return assignedAttributes;
                        });
                }
            });
    }

  getAttributesForAssigned(assignedArray: string[]):Observable<Attribute[]> {
    return this.attributeClassRepository.getAttributeByArray(assignedArray)
      .switchMap((attributes: Attribute[]) => {
        if(attributes.length === 0) return Observable.of(attributes);
        let unitOfMeasureIds: string[] = [];
        let dataTypeIds: string[] = [];
        attributes.forEach(value => {
          if (value.unitOfMeasureId)  unitOfMeasureIds.push(value.unitOfMeasureId);
          if (value.dataTypeId) dataTypeIds.push(value.dataTypeId);
        });
        return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
          .switchMap((unitOfMeasures: UnitOfMeasure[]) => {
            return this.dataTypeRepository.getDataTypeByIds(dataTypeIds)
              .map((dataTypes: DataType[]) => {
                attributes.forEach(value => {
                  let index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                  let index2 = dataTypes.findIndex(x => x.dataTypeId === value.dataTypeId);
                  value.unitOfMeasure = unitOfMeasures[index];
                  value.dataType = dataTypes[index2];
                });
                return attributes;
              });
          });
      });
  };

}
