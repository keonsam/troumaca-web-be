import {Observable} from "rxjs/Observable";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetTypeClass} from "./asset.type.class";
import {AssignedAttribute} from "../attribute/assigned.attribute";
import {createAssetTypeClassesRepositoryFactory} from './asset.type.class.repository.factory';
import {AssetTypeClassRepository} from "./asset.type.class.repository";
import {shapeAssetTypeClassesResponse} from "./asset.type.class.response.shaper";
import {Result} from "../../result.success";
import {AttributeRepository} from "../attribute/attribute.repository";
import {createAttributeRepositoryFactory} from "../attribute/attribute.repository.factory";
import {AssetTypeClassResponse} from "./asset.type.class.response";

export class AssetTypeClassOrchestrator {

  private assetTypeClassRepository:AssetTypeClassRepository;
  private attributeRepository: AttributeRepository;

  constructor() {
    this.assetTypeClassRepository = createAssetTypeClassesRepositoryFactory();
    this.attributeRepository = createAttributeRepositoryFactory();
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
    return this.assetTypeClassRepository.getAssetTypeClassById(assetTypeClassId)
      .switchMap(assetTypeClass => {
        if (!assetTypeClass) return Observable.of(undefined);
        return this.attributeRepository.getAssignedAttributesById(assetTypeClassId)
            .map(assignedAttributes => {
              return new AssetTypeClassResponse(true, assetTypeClass, assignedAttributes);
            });
      });
  }

  saveAssetTypeClass(assetTypeClass:AssetTypeClass, assignedAttributes: AssignedAttribute[]):Observable<any> {
    return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass)
      .switchMap((assetTypeClass:AssetTypeClass) => {
        if(!assetTypeClass || assignedAttributes.length === 0) return Observable.of(assetTypeClass);
          assignedAttributes.forEach(value => {
            value.assetTypeClassId = assetTypeClass.assetTypeClassId;
          });
          return this.attributeRepository.saveAssignedAttributes(assignedAttributes)
            .map((newDoc:AssignedAttribute[]) => {
              if (newDoc.length  === 0) return new AssetTypeClass();
              return assetTypeClass;
          });
    });
  }

  updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass, assignedAttribute: AssignedAttribute[]):Observable<number> {
    return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass)
      .switchMap(numReplaced => {
        if(!numReplaced || assignedAttribute.length === 0) return Observable.of(numReplaced);
        return this.attributeRepository.deleteAssignedAttribute(assetTypeClassId)
            .switchMap(numReplaced2 => {
              if(!numReplaced2) return Observable.of(numReplaced2);
                return this.attributeRepository.saveAssignedAttributes(assignedAttribute)
                  .map( next => {
                    if(next.length === 0)return 0;
                    return numReplaced2;
                  });
            });
      });
  }

    deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
        return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId).
        switchMap(numRemoved => {
            if(!numRemoved) return Observable.of(numRemoved);
            return this.attributeRepository.deleteAssignedAttribute(assetTypeClassId)
                .map(numRemoved => {
                    return numRemoved;
                });
        });
    }

}
