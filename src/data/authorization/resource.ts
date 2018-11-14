import { ResourceType } from "./resource.type";
import { ResourcePermission } from "./resource.permission";

export class Resource {
  resourceId: string;
  resourceTypeId: string;
  resourceType: ResourceType;
  resourcePermissions: ResourcePermission[];
  name: string;
  description: string;
  createdOn: Date;
  modifiedOn: Date;
}
