import {Observable, of} from "rxjs";
import {flatMap} from "rxjs/operators";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {Attribute} from "../../data/asset/attribute";

import {createAttributeRepositoryFactory} from "../../adapter/asset/attribute.repository.factory";
import {AttributeRepository} from "../../repository/attribute.repository";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../../result.success";
import {shapeAttributesResponse} from "./attribute.response.shaper";

export class AttributeOrchestrator {

  private attributeClassRepository: AttributeRepository;

  constructor() {
    this.attributeClassRepository = createAttributeRepositoryFactory();
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

  // OTHERS

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
                    }));
            }));
    }

    getAssignableAttributes(number: number, size: number, field: string, direction: string, assignedAttributes: string[]): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.attributeClassRepository
            .getAssignableAttributes(number, size, sort, assignedAttributes)
            .pipe(flatMap(value => {
                return this.attributeClassRepository
                    .getAssignableAttributeCount(assignedAttributes)
                    .pipe(map(count => {
                        const shapeAttrResp = shapeAttributesResponse( value, number, size, value.length, count, sort);
                        return new Result<any>(false, "success", shapeAttrResp);
                    }));
            }));
    }

}
