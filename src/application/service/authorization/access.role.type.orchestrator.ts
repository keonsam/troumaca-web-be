import {AccessRoleTypeDataProvider} from "../../../port/access.role.type.data.provider";
import {createAccessRoleTypeDataProvider} from "../../../infrastructure/authorization/access.role.type.data.provider.factory";
import {AccessRoleType} from "../../../domain/model/authorization/access.role.type";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {shapeAccessRoleTypesResponse} from "./access.role.type.response.shaper";
import {Result} from "../../../result.success";
import {getSortOrderOrDefault} from "../../../sort.order.util";
import {Affect} from "../../../domain/model/affect";

export class AccessRoleTypeOrchestrator {

  private accessRoleTypeRepository: AccessRoleTypeDataProvider;

  constructor() {
    this.accessRoleTypeRepository = createAccessRoleTypeDataProvider();
  }

  findAccessRoleTypes(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    return this.accessRoleTypeRepository.findAccessRoleTypes(searchStr, pageSize);
  }

  getAccessRoleTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
    const sort: string = getSortOrderOrDefault(field, direction);
    return this.accessRoleTypeRepository
      .getAccessRoleTypes(number, size, sort)
      .pipe(flatMap(value => {
        return this.accessRoleTypeRepository
          .getAccessRoleTypeCount()
          .pipe(map(count => {
            const shapeAccessRoleTypesResp: any = shapeAccessRoleTypesResponse(value, number, size, value.length, count, sort);
            return new Result<any>(false, "accessRoleTypes", shapeAccessRoleTypesResp);
          }));
      }));
  }

  addAccessRoleType(accessRoleType: AccessRoleType): Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.addAccessRoleType(accessRoleType);
  }

  getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.getAccessRoleTypeById(accessRoleTypeId);
  }

  updateAccessRoleType(accessRoleTypeId: string, accessRoleType: AccessRoleType): Observable<Affect> {
    return this.accessRoleTypeRepository.updateAccessRoleType(accessRoleTypeId, accessRoleType);
  }

  deleteAccessRoleType(accessRoleTypeId: string): Observable<Affect> {
    return this.accessRoleTypeRepository.deleteAccessRoleType(accessRoleTypeId);
  }

}
