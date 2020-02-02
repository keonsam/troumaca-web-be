import {ResourcePermissionDataProvider} from "../../../port/resource.permission.data.provider";
import {createResourcePermissionDataProvider} from "../../../infrastructure/authorization/resource.permission.data.provider.factory";
import {ResourcePermission} from "../../../domain/model/authorization/resource.permission";
import {Observable} from "rxjs";

export class ResourcePermissionOrchestrator {

  private resourcePermissionRepository: ResourcePermissionDataProvider;

  constructor() {
    this.resourcePermissionRepository = createResourcePermissionDataProvider();
  }

  // getAllResourcePermissions(): Observable<ResourcePermission[]> {
  //   return this.resourcePermissionRepository.getAllResourcePermissions();
  // }

}



