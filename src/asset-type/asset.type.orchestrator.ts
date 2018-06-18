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
import {Value} from "./value/value";
import {AssetTypeResponse} from "./asset.type.response";

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
            if (value.assetTypeClassId) assetTypeClassIds.push(value.assetTypeClassId);
            if (value.unitOfMeasureId) unitOfMeasureIds.push(value.unitOfMeasureId);
          });
          return this.assetTypeClassRepository.getAssetTypeClassByIds(assetTypeClassIds)
            .switchMap((assetTypeClasses:AssetTypeClass[]) => {
              return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
                .switchMap((unitOfMeasures:UnitOfMeasure[]) => {
                  assetTypes.forEach(value => {
                    let index = assetTypeClasses.findIndex(x => x.assetTypeClassId === value.assetTypeClassId);
                    let index2 = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                    value.assetTypeClass = index !== -1 ? assetTypeClasses[index] : new AssetTypeClass();
                    value.unitOfMeasure = index2 !== -1 ? unitOfMeasures[index2] : new UnitOfMeasure();
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
  };

  getAssetTypeById(assetTypeId:string):Observable<AssetTypeResponse> {
    return this.assetTypeRepository.getAssetTypeById(assetTypeId)
      .switchMap((assetType: AssetType) => {
        if (!assetType) {
          return Observable.of(undefined);
        } else {
          return this.assetTypeClassRepository.getAssetTypeClassById(assetType.assetTypeClassId)
            .switchMap(assetTypeClass => {
                assetType.assetTypeClass = new AssetTypeClass();
              if (assetTypeClass) assetType.assetTypeClass = assetTypeClass;
              return this.unitOfMeasureRepository.getUnitOfMeasureById(assetType.unitOfMeasureId)
                .switchMap(unitOfMeasure => {
                    assetType.unitOfMeasure = new UnitOfMeasure();
                  if (unitOfMeasure) assetType.unitOfMeasure = unitOfMeasure;
                  return this.valueRepository.getValuesByAssetTypeId(assetType.assetTypeId)
                      .map((values:Value[]) => {
                          return new AssetTypeResponse(assetType, values);
                      });
                });
            });
        }
      });
  };

  saveAssetType(assetType:AssetType, values: Value[]):Observable<AssetType> {
      return this.assetTypeRepository.saveAssetType(assetType)
          .switchMap(assetType => {
              if (!assetType || values.length < 1) Observable.of(assetType);
              values.forEach(value => {
                 value.assetTypeId = assetType.assetTypeId;
              });
              return this.valueRepository.saveValues(values)
                  .map((values:Value[]) => {
                     return assetType;
                  });
          });
  };

  updateAssetType(assetTypeId:string, assetType:AssetType, values: Value[]):Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType)
        .switchMap(numReplaced => {
            if(!numReplaced) return Observable.of(numReplaced);
            return this.valueRepository.deleteValuesByAssetTypeId(assetTypeId)
                .switchMap(numReplaced2 => {
                if(values.length < 1) return Observable.of(numReplaced);
                values.forEach(value => {
                    value.assetTypeId = assetTypeId;
                });
                   return this.valueRepository.saveValues(values)
                       .map( values => {
                           return numReplaced;
                       });
                });
        });
  }

  deleteAssetType(assetTypeId:string):Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId)
      .switchMap(numReplaced => {
        if(numReplaced > 0) {
          return this.valueRepository.deleteValuesByAssetTypeId(assetTypeId)
              .map(numReplaced2 => {
                  return numReplaced;
              });  // this will delete all the values with the same assetTypeId;
        }else {
          return Observable.of(numReplaced);
        }
      });
  }

}
