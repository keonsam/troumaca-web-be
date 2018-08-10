import { AssetTypeRepository } from "../asset.type.repository";
import { Observable, Observer } from "rxjs";
import { AssetType } from "../asset.type";
import { assetTypes } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { calcSkip } from "../../db.util";
import { AssetTypeClassRepositoryNeDbAdapter } from "../asset-type-class/adapter/asset.type.class.repository.db.adapter";
import { UnitOfMeasureRepositoryNeDbAdapter } from "../../unit-of-measure/adapter/unit.of.measure.repository.db.adapter";
import { Value } from "../value/value";
import { ValueRepositoryNeDbAdapter } from "../value/adapter/value.repository.db.adapter";
import { AssetTypeResponse } from "../asset.type.response";

export class AssetTypeRepositoryNeDbAdapter implements AssetTypeRepository {

  private defaultPageSize: number = 10;
  private assetTypeClassRepositoryNeDbAdapter: AssetTypeClassRepositoryNeDbAdapter = new AssetTypeClassRepositoryNeDbAdapter();
  private unitOfMeasureRepositoryNeDbAdapter: UnitOfMeasureRepositoryNeDbAdapter = new UnitOfMeasureRepositoryNeDbAdapter();
  private valueRepositoryNeDbAdapter: ValueRepositoryNeDbAdapter = new ValueRepositoryNeDbAdapter();

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const searchStrLocal = new RegExp(searchStr);

    return Observable.create(function (observer: Observer<AssetType[]>) {
      if (!searchStr) {
        assetTypes.find({}).limit(100).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      } else {
        assetTypes.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
          if (!err) {
            observer.next(doc);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
      }
    });
  }

    getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
        return this.getAssetTypesLocal(pageNumber, pageSize, order)
            .switchMap( (assetTypes: AssetType[]) => {
              if (assetTypes.length < 1) {
                return Observable.of(assetTypes);
              } else {
                const assetTypeClassIds: string[] = [];
                const unitOfMeasureIds: string[] = [];
                assetTypes.forEach(value => {
                  if (value.assetTypeClassId) assetTypeClassIds.push(value.assetTypeClassId);
                  if (value.unitOfMeasureId) unitOfMeasureIds.push(value.unitOfMeasureId);
                });
                return this.assetTypeClassRepositoryNeDbAdapter.getAssetTypeClassByIds(assetTypeClassIds)
                    .switchMap(assetTypeClasses => {
                      return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasuresByIds(unitOfMeasureIds)
                          .map(unitOfMeasures => {
                              assetTypes.forEach(value => {
                                  const index = assetTypeClasses.findIndex(x => x.assetTypeClassId === value.assetTypeClassId);
                                  const index2 = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
                                  value.assetTypeClassName = index !== -1 ? assetTypeClasses[index].name : "";
                                  value.unitOfMeasureName = index2 !== -1 ? unitOfMeasures[index2].name : "";
                              });
                              return assetTypes;
                          });
                    });
              }
            });
    }

    getAssetTypeCount(): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            assetTypes.count({}, function (err: any, count: number) {
                if (!err) {
                    observer.next(count);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    getAssetTypeById(assetTypeId: string): Observable<AssetTypeResponse> {
      return this.getAssetTypeByIdLocal(assetTypeId)
          .switchMap( assetType => {
            if (!assetType) {
              return Observable.of(undefined);
            }
            return this.assetTypeClassRepositoryNeDbAdapter.getAssetTypeClassById(assetType.assetTypeClassId)
                .switchMap(assetTypeClass => {
                  return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasureById(assetType.unitOfMeasureId)
                      .switchMap(unitOfMeasure => {
                          return this.valueRepositoryNeDbAdapter.getValuesByAssetTypeId(assetTypeId)
                              .map( values => {
                                  assetType.assetTypeClassName = assetTypeClass.assetTypeClass.name;
                                  assetType.unitOfMeasureName = unitOfMeasure.name;
                                  return new AssetTypeResponse(assetType, values);
                              });
                      });
                });
          });
    }

  saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
      return this.saveAssetTypeLocal(assetType)
          .switchMap( assetType => {
              if (!assetType || values.length < 1) {
                 return Observable.of(assetType);
             } else {
                  values.forEach(val => {
                      val.assetTypeId = assetType.assetTypeId;
                  });
                 return this.valueRepositoryNeDbAdapter.saveValues(values)
                     .map( values => {
                         return assetType;
                     });
             }
          });
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return this.updateAssetTypeLocal(assetTypeId, assetType)
        .switchMap( num => {
           if (!num || values.length < 1) {
               return Observable.of(num);
           } else {
               return this.valueRepositoryNeDbAdapter.deleteValuesByAssetTypeId(assetTypeId)
                   .switchMap(numRemoved => {
                       return this.valueRepositoryNeDbAdapter.saveValues(values)
                           .map( values => {
                              return num;
                           });
                   });
           }
        });
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return this.deleteAssetTypeLocal(assetTypeId)
        .switchMap( num => {
           if (!num) {
               return Observable.of(undefined);
           } else {
               return this.valueRepositoryNeDbAdapter.deleteValuesByAssetTypeId(assetTypeId)
                   .map( num2 => {
                       return num;
                   });
           }
        });
  }

  // USED BY OTHER REPO

  getAssetTypesByIds(assetTypeIds: string[]): Observable<AssetType[]> {
      return Observable.create( (observer: Observer<AssetType[]>) => {
          assetTypes.find({assetTypeId: {$in: assetTypeIds}}, function (err: any, docs: any) {
              if (!err) {
                 observer.next(docs);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  // HELPER

  getAssetTypesLocal(pageNumber: number, pageSize: number, order: string) {
      const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      return Observable.create(function (observer: Observer<AssetType[]>) {
          assetTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

  getAssetTypeByIdLocal(assetTypeId: string): Observable<AssetType> {
      return Observable.create(function (observer: Observer<AssetType>) {
          const query = {
              "assetTypeId": assetTypeId
          };
          assetTypes.findOne(query, function (err: any, doc: any) {
              if (!err) {
                  observer.next(doc);
              } else {
                  observer.error(err);
              }
              observer.complete();
          });
      });
  }

    saveAssetTypeLocal(assetType: AssetType): Observable<AssetType> {
        assetType.assetTypeId = generateUUID();
        return Observable.create(function (observer: Observer<AssetType>) {
            assetTypes.insert(assetType, function (err: any, doc: any) {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(doc);
                }
                observer.complete();
            });
        });
    }

    updateAssetTypeLocal(assetTypeId: string, assetType: AssetType): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "assetTypeId": assetTypeId
            };
            assetTypes.update(query, assetType, {}, function (err: any, numReplaced: number) {
                if (!err) {
                    observer.next(numReplaced);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    deleteAssetTypeLocal(assetTypeId: string): Observable<number> {
        return Observable.create(function (observer: Observer<number>) {
            const query = {
                "assetTypeId": assetTypeId
            };

            assetTypes.remove(query, {}, function (err: any, numRemoved: number) {
                if (!err) {
                    observer.next(numRemoved);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}