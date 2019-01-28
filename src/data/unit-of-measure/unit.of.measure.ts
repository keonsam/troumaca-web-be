import {UnitOfMeasureDimension} from "./unit.of.measure.dimension";
import {UnitOfMeasureSystem} from "./unit.of.measure.system";

export class UnitOfMeasure {

  unitOfMeasureId: string;
  name: string;
  symbol: string;
  description: string;
  unitOfMeasureDimension: UnitOfMeasureDimension;
  unitOfMeasureSystem: UnitOfMeasureSystem;
  version: string;
  ownerPartyId: string;
  dateModified: string;
}
