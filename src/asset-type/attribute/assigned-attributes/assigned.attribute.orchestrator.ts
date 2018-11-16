import {AssignedAttributeRepository} from "../../../repository/assigned.attribute.repository";
import {createAssignedAttributeRepositoryFactory} from "../../../adapter/asset/assigned.attribute.repository.factory";
import {AssignedAttribute} from "../../../data/asset/assigned.attribute";
import {Observable} from "rxjs";

export class AssignedAttributeOrchestrator {

  private assignedAttributeRepository: AssignedAttributeRepository;

  constructor() {
    this.assignedAttributeRepository = createAssignedAttributeRepositoryFactory();
  }

  getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assignedAttributeRepository.getAssignedAttributesByClassId(assetTypeClassId);
  }

}
