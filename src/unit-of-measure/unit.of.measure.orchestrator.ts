import {createUnitOfMeasureRepository} from "./unit.of.measure.repository.factory";
import {UnitOfMeasureRepository} from "./unit.of.measure.repository";
import {Observable} from "rxjs/Observable";
import {UnitOfMeasure} from "./unit.of.measure";

export class UnitOfMeasureOrchestrator {

  private unitOfMeasureRepository:UnitOfMeasureRepository;

  constructor() {
    this.unitOfMeasureRepository = createUnitOfMeasureRepository();
  }

  findUnitOfMeasure(searchStr:string, pageSize:number):Observable<UnitOfMeasure[]> {
    return this.unitOfMeasureRepository.findUnitOfMeasure(searchStr, pageSize);
  }

}
