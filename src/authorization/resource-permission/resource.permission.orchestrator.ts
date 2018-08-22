import { ResourcePermissionRepository } from "./resource.permission.repository";
import { createResourcePermissionRepositoryFactory } from "./resource.permission.repository.factory";
import { Observable } from "rxjs";
import { ResourcePermission } from "./resource.permission";

export class ResourcePermissionOrchestrator {

  private resourcePermissionRepository: ResourcePermissionRepository;

  constructor() {
    this.resourcePermissionRepository = createResourcePermissionRepositoryFactory();
  }

  getAllResourcePermissions(): Observable<ResourcePermission[]> {
    return this.resourcePermissionRepository.getAllResourcePermissions();
  }

  getResourcePermissionsByResourceId(resourceId: string): Observable<ResourcePermission[]> {
    return this.resourcePermissionRepository.getResourcePermissionsByResourceId(resourceId);
  }

  // getResourcePermissions(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
  //   let sort:string = getSortOrderOrDefault(field, direction);
  //   return this.resourceRepository
  //     .getResourcePermissions(number, size, sort)
  //     .flatMap(value => {
  //       return this.resourceRepository
  //         .getResourcePermissionCount()
  //         .map(count => {
  //           let shapeResourcePermissionsResp:any = shapeResourcePermissionsResponse(value, number, size, value.length, count, sort);
  //           return new Result<any>(false, "resources", shapeResourcePermissionsResp);
  //         });
  //     });
  // };
  //
  // addResourcePermission(resource:ResourcePermission, resourcePermissions: ResourcePermissionPermission[]):Observable<ResourcePermission> {
  //   return this.resourceRepository.addResourcePermission(resource)
  //     .switchMap( value => {
  //       let resourceId = value.resourceId;
  //       if(resourceId) {
  //         resourcePermissions.forEach(val => {
  //           val.resourceId = resourceId;
  //         });
  //         return this.resourcePermissionRepository.addResourcePermissionPermission(resourcePermissions)
  //           .map( resourcePermissions => {
  //             if(resourcePermissions.length > 0) {
  //               return value;
  //             }
  //           });
  //       }
  //     });
  // };
  //
  // getResourcePermissionById(resourceId:string):Observable<ResourcePermission> {
  //   return this.resourceRepository.getResourcePermissionById(resourceId);
  // };
  //
  // updateResourcePermission(resourceId:string, resource:ResourcePermission):Observable<number> {
  //   return this.resourceRepository.updateResourcePermission(resourceId, resource);
  // };
  //
  // deleteResourcePermission(resourceId:string):Observable<number>{
  //   return this.resourceRepository.deleteResourcePermission(resourceId);
  // };

}



