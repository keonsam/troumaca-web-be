import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {AssetType} from "../../data/asset/asset.type";
import {Value} from "../../data/asset/value";
import {Observable, Observer} from "rxjs";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import {Organization} from "../../data/party/organization";
import request from "request";
import {OtherAssetType} from "../../data/asset/other.asset.type";
import {MaterialType} from "../../data/asset/material.type";
import {ProductType} from "../../data/asset/product.type";
import {PartOrEquipmentType} from "../../data/asset/part.or.equipment.type";
import { Instance } from "../../data/asset/instance";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return undefined;
  }

  findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
    return undefined;
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetType> {
    return undefined;
  }

  saveAssetType(assetType: AssetType): Observable<AssetType> {
    return undefined;
  }

  addOtherAssetType(otherAssetType: OtherAssetType, options?: any): Observable<OtherAssetType> {
    const uri: string = properties.get("asset.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = ""; // {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/assets/asset-types/other-asset-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  addMaterialType(materialType: MaterialType, options?: any): Observable<MaterialType> {
    const uri: string = properties.get("asset.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = ""; // {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/assets/asset-types/material-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  addProductType(productType: ProductType, options?: any): Observable<ProductType> {
    const uri: string = properties.get("asset.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = ""; // {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/assets/asset-types/product-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  addPartOrEquipmentType(partOrEquipmentType: PartOrEquipmentType, options?: any): Observable<PartOrEquipmentType> {
    const uri: string = properties.get("asset.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = ""; // {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/assets/asset-types/part-or-equipment-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return undefined;
  }
}
