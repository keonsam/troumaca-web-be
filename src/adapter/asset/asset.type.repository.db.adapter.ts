import {AssetTypeRepository} from "../../repository/asset.type.repository";
import { Observable, Observer, of} from "rxjs";
import {AssetType} from "../../data/asset/asset.type";
import {assetTypes} from "../../db";
import {generateUUID} from "../../uuid.generator";
import {calcSkip} from "../../db.util";
import {ProductType} from "../../data/asset/product.type";
import {PartOrEquipmentType} from "../../data/asset/part.or.equipment.type";
import {MaterialType} from "../../data/asset/material.type";
import { Instance } from "../../data/asset/instance";

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

    findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
        return of([
            {
                instanceId: "7bc3fa8a-84b6-4088-91d4-8a1cc84e7cff",
                name: "Other Asset Type"
            },
            {
                instanceId: "8bc5fa8a-84b6-4088-91d4-8a1cc84e7cff",
                name: "Asset Specification"
            },
        ]);
    }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
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

  saveAssetType(assetType: AssetType): Observable<AssetType> {
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

  addOtherAssetType(assetType: AssetType, options?: any): Observable<AssetType> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
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

  deleteAssetType(assetTypeId: string): Observable<number> {
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

  addMaterialType(materialType: MaterialType, options?: any): Observable<MaterialType> {
    return undefined;
  }

  addPartOrEquipmentType(partOrEquipmentType: PartOrEquipmentType, options?: any): Observable<PartOrEquipmentType> {
    return undefined;
  }

  addProductType(productType: ProductType, options?: any): Observable<ProductType> {
    return undefined;
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

  // private getAssetTypesLocal(pageNumber: number, pageSize: number, order: string) {
  //   const skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
  //   return Observable.create(function (observer: Observer<AssetType[]>) {
  //     assetTypes.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // getAssetTypeByIdLocal(assetTypeId: string): Observable<AssetType> {
  //   return Observable.create(function (observer: Observer<AssetType>) {
  //     const query = {
  //       "assetTypeId": assetTypeId
  //     };
  //     assetTypes.findOne(query, function (err: any, doc: any) {
  //       if (!err) {
  //         observer.next(doc);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // private saveAssetTypeLocal(assetType: AssetType): Observable<AssetType> {
  //   assetType.assetTypeId = generateUUID();
  //   return Observable.create(function (observer: Observer<AssetType>) {
  //     assetTypes.insert(assetType, function (err: any, doc: any) {
  //       if (err) {
  //         observer.error(err);
  //       } else {
  //         observer.next(doc);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // private updateAssetTypeLocal(assetTypeId: string, assetType: AssetType): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     const query = {
  //       "assetTypeId": assetTypeId
  //     };
  //     assetTypes.update(query, assetType, {}, function (err: any, numReplaced: number) {
  //       if (!err) {
  //         observer.next(numReplaced);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

  // private deleteAssetTypeLocal(assetTypeId: string): Observable<number> {
  //   return Observable.create(function (observer: Observer<number>) {
  //     const query = {
  //       "assetTypeId": assetTypeId
  //     };
  //
  //     assetTypes.remove(query, {}, function (err: any, numRemoved: number) {
  //       if (!err) {
  //         observer.next(numRemoved);
  //       } else {
  //         observer.error(err);
  //       }
  //       observer.complete();
  //     });
  //   });
  // }

}
