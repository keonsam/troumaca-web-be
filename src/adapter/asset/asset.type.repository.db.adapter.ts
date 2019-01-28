import {AssetTypeRepository} from "../../repository/asset.type.repository";
import { Observable, Observer, of, throwError } from "rxjs";
import {AssetType} from "../../data/asset/asset.type";
import {switchMap, map} from "rxjs/operators";
import {assetTypes} from "../../db";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";

export class AssetTypeRepositoryNeDbAdapter implements AssetTypeRepository {

  private defaultPageSize: number = 10;

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const searchStrLocal = new RegExp(searchStr);
    const query = searchStr ? {name: {$regex: searchStrLocal}} : {};
    return Observable.create(function (observer: Observer<AssetType[]>) {
      assetTypes.find(query).limit(100).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return this.getAssetTypesLocal(pageNumber, pageSize, order)
      .pipe(switchMap((assetTypes: AssetType[]) => {
        if (assetTypes.length < 1) {
          return of(assetTypes);
        } else {
          const assetTypeClassIds: string[] = [];
          const unitOfMeasureIds: string[] = [];
          // assetTypes.forEach(value => {
          //   if (value.assetTypeClassId) assetTypeClassIds.push(value.assetTypeClassId);
          //   if (value.unitOfMeasureId) unitOfMeasureIds.push(value.unitOfMeasureId);
          // });
          // return this.assetTypeClassRepositoryNeDbAdapter.getAssetTypeClassByIds(assetTypeClassIds)
          //   .pipe(switchMap(assetTypeClasses => {
          //     return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasuresByIds(unitOfMeasureIds)
          //       .pipe(map(unitOfMeasures => {
          //         assetTypes.forEach(value => {
          //           value.assetTypeClass = assetTypeClasses.find(x => x.assetClassificationId === value.assetTypeClassId);
          //           value.unitOfMeasure = unitOfMeasures.find(x => x.unitOfMeasureId === value.unitOfMeasureId);
          //         });
          //         return assetTypes;
          //       }));
          //   }));
        }
      }));
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

  getAssetTypeById(assetTypeId: string): Observable<AssetType> {
    return this.getAssetTypeByIdLocal(assetTypeId)
      .pipe(switchMap(assetType => {
        if (!assetType) {
          return throwError(`Failed to find asset type ${assetTypeId} ${assetType}`);
        }
        // return this.assetTypeClassRepositoryNeDbAdapter.getAssetTypeClassByIdLocal(assetType.assetTypeClassId)
        //   .pipe(switchMap(assetTypeClass => {
        //     return this.unitOfMeasureRepositoryNeDbAdapter.getUnitOfMeasureById(assetType.unitOfMeasureId)
        //       .pipe(switchMap(unitOfMeasure => {
        //         return this.valueRepositoryNeDbAdapter.getValuesByAssetTypeId(assetTypeId)
        //           .pipe(map(values => {
        //             assetType.assetTypeClass = assetTypeClass;
        //             assetType.unitOfMeasure = unitOfMeasure;
        //             assetType.values = values;
        //             return assetType;
        //           }));
        //       }));
        //   }));
      }));
  }

  // saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
  //     return this.saveAssetTypeLocal(assetType)
  //         .pipe(switchMap(assetType => {
  //             if (!assetType) {
  //                 return throwError(`Failed to save asset type ${assetType}`);
  //             } else if (values.length < 1) {
  //                 return of(assetType);
  //             } else {
  //                 values.forEach(val => {
  //                     val.assetTypeId = assetType.assetTypeId;
  //                 });
  //                 // return this.valueRepositoryNeDbAdapter.saveValues(values)
  //                 //     .pipe(map(values => {
  //                 //       if (!values) {
  //                 //         throw new Error(`Failed to save values ${values}`);
  //                 //       }
  //                 //         return assetType;
  //                 //     }));
  //             }
  //         }));
  // }

  addOtherAssetType(assetType: AssetType, options?: any): Observable<AssetType> {
    return undefined;
  }

  // updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
  //   return this.updateAssetTypeLocal(assetTypeId, assetType)
  //     .pipe(switchMap(num => {
  //       if (!num) {
  //         return throwError(`Failed to save num of ${assetTypeId} ${num}`);
  //       } else if (values.length < 1) {
  //         return of(num);
  //       } else {
  //         // return this.valueRepositoryNeDbAdapter.deleteValuesByAssetTypeId(assetTypeId)
  //         //   .pipe(switchMap(numRemoved => {
  //         //     values.forEach(val => {
  //         //       val.assetTypeId = assetType.assetTypeId;
  //         //     });
  //         //     return this.valueRepositoryNeDbAdapter.saveValues(values)
  //         //       .pipe(map(valuesArr => {
  //         //         if (!valuesArr) {
  //         //           throw new Error(`Failed to save values ${valuesArr}`);
  //         //         }
  //         //         return num;
  //         //       }));
  //         //   }));
  //       }
  //     }));
  // }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return this.deleteAssetTypeLocal(assetTypeId)
      .pipe(switchMap(num => {
        if (!num) {
          return throwError(`Failed to delete asset type of ${assetTypeId} ${num}`);
        } else {
          // return this.valueRepositoryNeDbAdapter.deleteValuesByAssetTypeId(assetTypeId)
          //   .pipe(map(num2 => {
          //     return num;
          //   }));
        }
      }));
  }

  // USED BY OTHER REPO

  getAssetTypesByIds(assetTypeIds: string[]): Observable<AssetType[]> {
    return Observable.create((observer: Observer<AssetType[]>) => {
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

  private getAssetTypesLocal(pageNumber: number, pageSize: number, order: string) {
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

  private saveAssetTypeLocal(assetType: AssetType): Observable<AssetType> {
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

  private updateAssetTypeLocal(assetTypeId: string, assetType: AssetType): Observable<number> {
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

  private deleteAssetTypeLocal(assetTypeId: string): Observable<number> {
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