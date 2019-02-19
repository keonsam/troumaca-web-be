import {AssetType} from "../data/asset/asset.type";
import {Observable} from "rxjs";
import {MaterialType} from "../data/asset/material.type";
import {OtherAssetType} from "../data/asset/other.asset.type";
import {ProductType} from "../data/asset/product.type";
import {PartOrEquipmentType} from "../data/asset/part.or.equipment.type";
import { Instance } from "../data/asset/instance";

export interface AssetTypeRepository {

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;

  findInstances(searchStr: string, pageSize: number): Observable<Instance[]>;

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]>;

  getAssetTypeCount(): Observable<number>;

  getAssetTypeById(assetId: string): Observable<AssetType>;

  saveAssetType(assetType: AssetType): Observable<AssetType>;

  addMaterialType(materialType: MaterialType, options?: any): Observable<MaterialType>;

  addOtherAssetType(otherAssetType: OtherAssetType, options?: any): Observable<OtherAssetType>;

  addProductType(productType: ProductType, options?: any): Observable<ProductType>;

  addPartOrEquipmentType(partOrEquipmentType: PartOrEquipmentType, options?: any): Observable<PartOrEquipmentType>;

  updateAssetType(assetId: string, assetType: AssetType): Observable<number>;

  deleteAssetType(assetId: string): Observable<number>;
}
