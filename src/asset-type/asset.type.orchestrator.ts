import {createAssetTypeRepository} from './asset.type.repository.factory';
import {AssetTypeRepository} from "./asset.type.repository";
import {Observable} from "rxjs/Observable";
import {AssetType} from "./asset.type";
import {shapeAssetTypesResponse} from "./asset.type.response.shaper";
import {Result} from "../result.success";
import {getSortOrderOrDefault} from "../sort.order.util";
import {createValueRepository} from "./value/value.repository.factory";
import {ValueRepository} from "./value/value.repository";
import {AssetTypeClassRepository} from "./asset-type-class/asset.type.class.repository";
import {createAssetTypeClassesRepositoryFactory} from "./asset-type-class/asset.type.class.repository.factory";
import {UnitOfMeasureRepository} from "../unit-of-measure/unit.of.measure.repository";
import {createUnitOfMeasureRepository} from "../unit-of-measure/unit.of.measure.repository.factory";
import {AssetTypeClass} from "./asset-type-class/asset.type.class";
import {UnitOfMeasure} from "../unit-of-measure/unit.of.measure";

export class AssetTypeOrchestrator {

  private assetTypeRepository:AssetTypeRepository;
  private valueRepository: ValueRepository;
  private assetTypeClassRepository: AssetTypeClassRepository;
  private unitOfMeasureRepository: UnitOfMeasureRepository;

  constructor(options?:any) {
    this.assetTypeRepository = createAssetTypeRepository(options);
    this.assetTypeClassRepository = createAssetTypeClassesRepositoryFactory(options);
    this.valueRepository = createValueRepository(options);
    this.unitOfMeasureRepository = createUnitOfMeasureRepository(options);
  }

  findAssetTypes(searchStr:string, pageSize:number):Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
  }

  saveAssetType(assetType:AssetType):Observable<AssetType> {
    return this.assetTypeRepository.saveAssetType(assetType);
  };

  getAssetTypeCount():Observable<number> {
    return this.assetTypeRepository.getAssetTypeCount();
  }

  getAssetTypes(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
    let sort:string = getSortOrderOrDefault(field, direction);
    return this.assetTypeRepository
      .getAssetTypes(number, size, sort)
      .switchMap(assetTypes => {
        if(assetTypes.length === 0) {
          let shapeAssetTypesResp:any = shapeAssetTypesResponse(assetTypes, 0, 0, 0, 0, sort);
          return Observable.of(new Result<any>(false, "No entry in database", shapeAssetTypesResp));
        }else {
          let assetTypeClassIds:string[] = [];
          let unitOfMeasureIds:string[] = [];
          assetTypes.forEach(value => {
            if(value.assetTypeClassId) assetTypeClassIds.push(value.assetTypeClassId);
            if(value.unitOfMeasureId) unitOfMeasureIds.push(value.unitOfMeasureId);
          });
          return this.assetTypeClassRepository.getAssetTypeClassByIds(assetTypeClassIds)
            .switchMap((assetTypeClasses:AssetTypeClass[]) => {
              return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
                .switchMap((unitOfMeasures:UnitOfMeasure[]) => {
                  assetTypes.forEach(value => {
                    let index = assetTypeClasses.findIndex(x => x.assetTypeClassId === value.assetTypeClassId);
                    let index2 = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                    value.assetTypeClass = assetTypeClasses[index];
                    value.unitOfMeasure = unitOfMeasures[index2];
                  });
                  return this.assetTypeRepository
                    .getAssetTypeCount()
                    .map(count => {
                      let shapeAssetTypesResp:any = shapeAssetTypesResponse(assetTypes, number, size, assetTypes.length, count, sort);
                      return new Result<any>(false, "assetTypes", shapeAssetTypesResp);
                    });
                });
            });
        }
      });
  }

  getAssetTypeById(assetTypeId:string):Observable<AssetType> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId)
      .switchMap((assetType: AssetType) => {
        if (!assetType.assetTypeId) {
          return Observable.of(new AssetType());
        } else {
          return this.assetTypeClassRepository.getAssetTypeClassById(assetType.assetTypeClassId)
            .switchMap(assetTypeClass => {
              if (assetTypeClass) {
                assetType.assetTypeClass = assetTypeClass;
              }
              return this.unitOfMeasureRepository.getUnitOfMeasureById(assetType.unitOfMeasureId)
                .map(unitOfMeasure => {
                  if (unitOfMeasure) {
                    assetType.unitOfMeasure = unitOfMeasure;
                  }
                  return assetType;
                });
            });
        }
      });
  }

  updateAssetType(assetTypeId:string, assetType:AssetType):Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
  }

  deleteAssetType(assetTypeId:string):Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId)
      .switchMap(numReplaced => {
        if(numReplaced > 0) {
          return this.valueRepository.deleteValuesByAssetTypeId(assetTypeId);  // this will delete all the values with the same assetTypeId;
        }else {
          return Observable.of(numReplaced);
        }
      });
  }

}
