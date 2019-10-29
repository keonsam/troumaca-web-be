import { AssetCharacteristicType } from "./asset.characteristic.type";
import { UnitOfMeasurement } from "../unit-of-measurement/unit.of.measurement";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class AssetCharacteristic {
  @Field( () => ID)
  assetCharacteristicId: string;
  @Field( () => ID)
  assetCharacteristicTypeId: string;
  assetCharacteristicType: AssetCharacteristicType;
  @Field()
  name: string;
  @Field( () => [String], {nullable: true})
  list: string[];
  // @Field({nullable: true})
  // defaultValue: string;
  @Field({nullable: true})
  description: string;
  @Field({nullable: true})
  type: string;
  @Field({nullable: true})
  format: string;
  // @Field({nullable: true})
  // preFilled: boolean;
  // @Field({nullable: true})
  // required: boolean;
  // format: string;
  unitOfMeasurementId: string;
  unitOfMeasurement: UnitOfMeasurement;
  formula: string;
  calculationLevel: string;
  maximumValue: string;
  minimumValue: string;
  categoryValue: string;
  effectiveDate: string;
  untilDate: string;
  version: string;
  ownerPartyId: string;
  dateModified: Date;
}
