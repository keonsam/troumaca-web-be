import { Observable } from "rxjs";
import { Result } from "../../../result.success";
import { shapeAttributesResponse } from "../attribute.response.shaper";
import { AssignedAttributeRepository } from "./assigned.attribute.repository";
import { createAssignedAttributeRepositoryFactory } from "./assigned.attribute.repository.factory";
import { getSortOrderOrDefault } from "../../../sort.order.util";
import { AssignedAttribute } from "../assigned.attribute";
import { flatMap, map} from "rxjs/operators";

export class AssignedAttributeOrchestrator {

  private assignedAttributeRepository: AssignedAttributeRepository;

  constructor() {
    this.assignedAttributeRepository = createAssignedAttributeRepositoryFactory();
  }

    getAssignableAttributes(number: number, size: number, field: string, direction: string, assignedAttributes: string[], type: string): Observable<Result<any>> {
        const sort = getSortOrderOrDefault(field, direction);
        return this.assignedAttributeRepository
            .getAssignableAttributes(number, size, sort, assignedAttributes, type)
            .pipe(flatMap(value => {
                return this.assignedAttributeRepository
                    .getAssignableAttributesCount(assignedAttributes, type)
                    .pipe(map(count => {
                        const shapeAttrResp = shapeAttributesResponse(value, number, size, value.length, count, sort);
                        return new Result<any>(false, "success", shapeAttrResp);
                    }));
            }));
    }

    getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
        return this.assignedAttributeRepository.getAssignedAttributesByClassId(assetTypeClassId);
    }

}
