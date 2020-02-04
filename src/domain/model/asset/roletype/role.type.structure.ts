import {Field, ID, InputType, ObjectType} from "type-graphql";

@ObjectType()
export class RoleTypeStructure {
  @Field( () => ID, {nullable: true})
  roleTypeStructureId: string;
  @Field( {nullable: true})
  partOfRoleTypeId: string;
  @Field( {nullable: true})
  composedOfRoleTypeId: string;

  @Field( {nullable: true})
  dateEffectiveLocal: Date;
  @Field( {nullable: true})
  dateEffectiveTimeZoneId: string;
  @Field( {nullable: true})
  dateEffectiveUtc: Date;
  @Field( {nullable: true})
  dateEffectiveTimeZoneVersion: string;

  @Field( {nullable: true})
  dateUntilLocal: Date;
  @Field( {nullable: true})
  dateUntilTimeZoneId: string;
  @Field( {nullable: true})
  dateUntilUtc: Date;
  @Field( {nullable: true})
  dateUntilTimeZoneVersion: string;

  @Field( {nullable: true})
  version: string;
  @Field( {nullable: true})
  ownerPartyId: string;

  @Field( {nullable: true})
  dateModifiedLocal: Date;
  @Field( {nullable: true})
  dateModifiedTimeZoneId: string;
  @Field( {nullable: true})
  dateModifiedUtc: Date;
  @Field( {nullable: true})
  dateModifiedTimeZoneVersion: string;
}