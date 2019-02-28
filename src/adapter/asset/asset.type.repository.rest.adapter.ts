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
  findAssetTypes(searchStr: string, pageSize: number, options: any): Observable<AssetType[]> {
    return undefined;
  }

  findInstances(searchStr: string, pageSize: number, options: any): Observable<Instance[]> {
    return undefined;
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string, options: any): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeCount(options: any): Observable<number> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string, options: any): Observable<AssetType> {
    return undefined;
  }

  saveAssetType(assetType: AssetType, options: any): Observable<AssetType> {
    return undefined;
  }

  updateAssetType(assetTypeId: string, assetType: AssetType, options: any): Observable<number> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string, options: any): Observable<number> {
    return undefined;
  }
}
