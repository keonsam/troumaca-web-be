import { AssignedAttribute } from "./assigned.attribute";

export class AssetTypeClass {
  assetTypeClassId: string;
  tenantId: string;
  name: string;
  assignedAttributes: AssignedAttribute[];
  description: string;
  createdOn: Date;
  modifiedOn: Date;
}

