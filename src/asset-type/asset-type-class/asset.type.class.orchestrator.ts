import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetTypeClass} from "./asset.type.class";
import {AssignedAttribute} from "../attribute/assigned.attribute";
import {createAssetTypeClassRepositoryFactory} from './asset.type.class.repository.factory';
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {shapeAssetTypeClassesResponse} from "./asset.type.class.response.shaper";
import {Result} from "../../result.success";
import {AssetTypeClassResponse} from "./asset.type.class.response";

export class AssetTypeClassOrchestrator {

  private assetTypeClassRepository:AssetTypeClassRepository;

  constructor() {
    this.assetTypeClassRepository = createAssetTypeClassRepositoryFactory();
  }

  findAssetTypeClass(searchStr:string, pageSize:number):Observable<AssetTypeClass[]> {
    return this.assetTypeClassRepository.findAssetTypeClass(searchStr, pageSize);
  }

  getAssetTypeClasses(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort = getSortOrderOrDefault(field, direction);
    return this.assetTypeClassRepository
    .getAssetTypeClasses(number, size, sort)
    .flatMap(value => {
      return this.assetTypeClassRepository
        .getAssetTypeClassCount()
        .map(count => {
          let shapeAssetTypeClassesResp = shapeAssetTypeClassesResponse("assetTypeClasses",value, number, size, value.length, count, sort);
          return new Result(false, "", shapeAssetTypeClassesResp);
        });
    });
  }

  getAssetTypeClass(assetTypeClassId:string):Observable<AssetTypeClassResponse> {
    return this.assetTypeClassRepository.getAssetTypeClassById(assetTypeClassId);
  }

  saveAssetTypeClass(assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute[]):Observable<AssetTypeClass> {
    return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass, assignedAttributes);
  }

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute[]):Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttributes);
  }

  deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
      return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
  }

}
