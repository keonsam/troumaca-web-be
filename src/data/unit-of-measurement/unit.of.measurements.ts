import {Page} from "../page/page";
import {UnitOfMeasurement} from "./unit.of.measurement";

export class UnitOfMeasurements {


  constructor(unitOfMeasures: UnitOfMeasurement[], page: Page) {
    this.unitOfMeasures = unitOfMeasures;
    this.page = page;
  }

  unitOfMeasures: UnitOfMeasurement[] = [];
  page: Page;
}
