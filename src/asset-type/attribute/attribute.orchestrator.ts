import { Observable, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import { getSortOrderOrDefault } from "../../sort.order.util";
import { Attribute } from "./attribute";
import { switchMap, map } from "rxjs/operators";
import { createAttributeRepositoryFactory } from "./attribute.repository.factory";
import { AttributeRepository } from "./attribute.repository";
import { Result } from "../../result.success";
import { shapeAttributesResponse } from "./attribute.response.shaper";

export class AttributeOrchestrator {

  private attributeClassRepository: AttributeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
  }


    getAvailableAttributes(number: number, size: number, field: string, direction: string, assignedAttributes: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.attributeClassRepository
            .getAvailableAttributes(number, size, sort, assignedAttributes)
            .pipe(flatMap(value => {
                return this.attributeClassRepository
                    .getAvailableAttributeCount(assignedAttributes)
                    .pipe(map(count => {
                        const shapeAttrResp = shapeAttributesResponse( value, number, size, value.length, count, sort);
                        return new Result<any>(false, "success", shapeAttrResp);
                        // return new PageResponse<Attribute[]>(value, number, size, count, sort);
                    }));
            }));
    }

  getAttributes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.attributeClassRepository
      .getAttributes(number, size, sort)
      .pipe(switchMap((attributes: Attribute[]) => {
        if (attributes.length < 1) {
          const shapeAttributesResp: any = shapeAttributesResponse(attributes, 0, 0, 0, 0, sort);
          return of(new Result<any>(false, "No entry in database", shapeAttributesResp));
        }
        return this.attributeClassRepository
          .getAttributeCount()
          .pipe(map(count => {
              const shapeAttributesResp: any = shapeAttributesResponse(attributes, number, size, attributes.length, count, sort);
              return new Result<any>(false, "attributes", shapeAttributesResp);
              }));
          }));
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
    //         .pipe(switchMap((assignedAttributes: AssignedAttribute[]) => {
    //             if (assignedAttributes.length === 0) {
    //                 return of(assignedAttributes);
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

}
