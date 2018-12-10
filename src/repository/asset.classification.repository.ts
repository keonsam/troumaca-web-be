import {AssetClassification} from "../data/asset/asset.classification";
import {AssignedAttribute} from "../data/asset/assigned.attribute";
import {Observable} from "rxjs";

export interface AssetClassificationRepository {

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetClassification[]>;

  getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetClassification[]>;

  getAssetTypeClassCount(): Observable<number>;

  getAssetTypeClassById(assetClassificationId: string): Observable<AssetClassification>;

  addAssetClassification(assetClassification: AssetClassification, options?: any): Observable<AssetClassification>;

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetClassification, assignedAttributes: AssignedAttribute[]): Observable<number>;

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number>;

}
