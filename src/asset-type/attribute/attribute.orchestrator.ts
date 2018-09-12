import { Observable } from "rxjs/Observable";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { Attribute } from "../../data/asset/attribute";

import { createAttributeRepositoryFactory } from "../../adapter/asset/attribute.repository.factory";
import { AttributeRepository } from "../../repository/attribute.repository";
import { Result } from "../../result.success";
import { shapeAttributesResponse } from "./attribute.response.shaper";

export class AttributeOrchestrator {

  private attributeClassRepository: AttributeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
  }

  getAttributes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
      .getAttributes(number, size, sort)
      .switchMap((attributes: Attribute[]) => {
        if (attributes.length < 1) {
          const shapeAttributesResp: any = shapeAttributesResponse(attributes, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "No entry in database", shapeAttributesResp));
        }
        return this.attributeClassRepository
          .getAttributeCount()
          .map(count => {
              const shapeAttributesResp: any = shapeAttributesResponse(attributes, number, size, attributes.length, count, sort);
              return new Result<any>(false, "attributes", shapeAttributesResp);
              });
          });
  }

    getAttributeById(attributeId: string): Observable<Attribute> {
        return this.attributeClassRepository.getAttributeById(attributeId);
    }

    saveAttribute(attribute: Attribute): Observable<Attribute> {
        return this.attributeClassRepository.addAttribute(attribute);
    }

    updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
        return this.attributeClassRepository.updateAttribute(attributeId, attribute);
    }

    deleteAttribute(attributeId: string): Observable<number> {
        return this.attributeClassRepository.deleteAttribute(attributeId);
    }

    // getAvailableAttributes(number: number, size: number, field: string, direction: string, availableAttributes: string[]): Observable<Result<any>> {
    //     const sort = getSortOrderOrDefault(field, direction);
    //     return this.attributeClassRepository
    //         .getAvailableAttributes(number, size, sort, availableAttributes)
    //         .flatMap(value => {
    //             return this.attributeClassRepository
    //                 .getAvailableAttributeCount()
    //                 .map(count => {
    //                     const shapeAttrResp = shapeAttributesResponse( value, number, size, value.length, count, sort);
    //                     return new Result<any>(false, "success", shapeAttrResp);
    //                     // return new PageResponse<Attribute[]>(value, number, size, count, sort);
    //                 });
    //         });
    // }
    //
    // getAssignedAttributes(number: number, size: number, field: string, direction: string, assignedAttributes: string[]): Observable<Result<any>> {
    //     const sort = getSortOrderOrDefault(field, direction);
    //     return this.attributeClassRepository
    //         .getAssignedAttributes(number, size, sort, assignedAttributes)
    //         .flatMap(value => {
    //             return this.attributeClassRepository
    //                 .getAvailableAttributeCount()
    //                 .map(count => {
    //                     const shapeAttrResp = shapeAttributesResponse(value, number, size, value.length, count, sort);
    //                     return new Result<any>(false, "success", shapeAttrResp);
    //                     // return new PageResponse<Attribute[]>(value, number, size, count, sort);
    //                 });
    //         });
    // }
    //
    // getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    //     return this.attributeClassRepository.getAssignedAttributesById(assetTypeClassId)
    //         .switchMap((assignedAttributes: AssignedAttribute[]) => {
    //             if (assignedAttributes.length === 0) {
    //                 return Observable.of(assignedAttributes);
    //             } else {
    //                 const assignedArray: string[] = assignedAttributes.map((x: AssignedAttribute) => x.attributeId);
    //                 return this.getAttributesForAssigned(assignedArray)
    //                     .map(attributes => {
    //                         assignedAttributes.forEach(value => {
    //                             const index = attributes.findIndex(x => x.attributeId === value.attributeId);
    //                             value.attribute = index !== -1 ? attributes[index] : new Attribute();
    //                         });
    //                         return assignedAttributes;
    //                     });
    //             }
    //         });
    // }

  getAttributesForAssigned(assignedArray: string[]): Observable<Attribute[]> {
      return null;
    // return this.attributeClassRepository.getAttributeByArray(assignedArray)
    //   .switchMap((attributes: Attribute[]) => {
    //     if(attributes.length === 0) return Observable.of(attributes);
    //     let unitOfMeasureIds: string[] = [];
    //     let dataTypeIds: string[] = [];
    //     attributes.forEach(value => {
    //       if (value.unitOfMeasureId)  unitOfMeasureIds.push(value.unitOfMeasureId);
    //       if (value.dataTypeId) dataTypeIds.push(value.dataTypeId);
    //     });
    //     return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
    //       .switchMap((unitOfMeasures: UnitOfMeasure[]) => {
    //         return this.dataTypeRepository.getDataTypeByIds(dataTypeIds)
    //           .map((dataTypes: DataType[]) => {
    //             attributes.forEach(value => {
    //               let index = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
    //               let index2 = dataTypes.findIndex(x => x.dataTypeId === value.dataTypeId);
    //                 value.unitOfMeasure = index !== -1 ? unitOfMeasures[index] : new UnitOfMeasure();
    //                 value.dataType = index2 !== -1 ? dataTypes[index2] : new DataType();
    //             });
    //             return attributes;
    //           });
    //       });
    //   });
  }

}
