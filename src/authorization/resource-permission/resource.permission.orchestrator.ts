import {ResourcePermissionRepository} from "../../repository/resource.permission.repository";
import {createResourcePermissionRepositoryFactory} from "../../adapter/authorization/resource.permission.repository.factory";
import {ResourcePermission} from "../../data/authorization/resource.permission";
import {Observable} from "rxjs";

export class ResourcePermissionOrchestrator {

  private resourcePermissionRepository: ResourcePermissionRepository;

  constructor() {
    this.resourcePermissionRepository = createResourcePermissionRepositoryFactory();
  }

  // getAllResourcePermissions(): Observable<ResourcePermission[]> {
  //   return this.resourcePermissionRepository.getAllResourcePermissions();
  // }

}



