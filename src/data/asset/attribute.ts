import { UnitOfMeasure } from "../unit-of-measure/unit.of.measure";
import { DataType } from "../data-type/data.type";

export class Attribute {

  attributeId: string;
  tenantId: string;
  name: string;
  format: string;
  dataTypeId: string;
  unitOfMeasureId: string;
  unitOfMeasure: UnitOfMeasure;
  dataType: DataType;
  maximumValue: string;
  minimumValue: string;
  createdOn: Date;
  modifiedOn: Date;
}
