import {ResourcePermissionDataProvider} from "../../../port/resource.permission.data.provider";
import {createResourcePermissionDataProvider} from "../../../infrastructure/authorization/resource.permission.data.provider.factory";

export class ResourcePermissionOrchestrator {

  private resourcePermissionRepository: ResourcePermissionDataProvider;

  constructor() {
    this.resourcePermissionRepository = createResourcePermissionDataProvider();
  }

  // getAllResourcePermissions(): Observable<ResourcePermission[]> {
  //   return this.resourcePermissionRepository.getAllResourcePermissions();
  // }

}



