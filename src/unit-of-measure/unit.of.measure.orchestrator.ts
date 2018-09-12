import { createUnitOfMeasureRepository } from "../adapter/unit-of-measure/unit.of.measure.repository.factory";
import { UnitOfMeasureRepository } from "../repository/unit.of.measure.repository";
import { Observable } from "rxjs/Observable";
import { UnitOfMeasure } from "../data/unit-of-measure/unit.of.measure";

export class UnitOfMeasureOrchestrator {

  private unitOfMeasureRepository: UnitOfMeasureRepository;

  constructor() {
    this.unitOfMeasureRepository = createUnitOfMeasureRepository();
  }

  findUnitOfMeasure(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    return this.unitOfMeasureRepository.findUnitOfMeasure(searchStr, pageSize);
  }

}
