import { Attribute } from "./attribute";

export class AssignedAttribute {
    assignedAttributeId: string;
    assetTypeClassId: string;
    attributeId: string;
    attribute: Attribute;
    required: boolean;
    createdOn: Date;
    modifiedOn: Date;
}
