import { Permission } from "./permission";

export class ResourcePermission {
  resourcePermissionId: string;
  resourceId: string;
  permissionId: string;
  description: string;
  permission: Permission;
  createdOn: Date;
  modifiedOn: Date;
}
