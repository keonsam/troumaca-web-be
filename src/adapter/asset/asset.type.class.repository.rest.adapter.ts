import {AssetTypeClassRepository} from "../../repository/asset.type.class.repository";
import {AssetTypeClass} from "../../data/asset/asset.type.class";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {Observable} from "rxjs";


export class AssetTypeClassRepositoryRestAdapter implements AssetTypeClassRepository {

  constructor() {
  }

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    return undefined;
  }

  getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetTypeClass[]> {
    return undefined;
  }

  getAssetTypeClassCount(): Observable<number> {
    return undefined;
  }

  getAssetTypeClassById(assetTypeClassId: string): Observable<AssetTypeClass> {
    return undefined;
  }

  saveAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    return undefined;
  }

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
    return undefined;
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return undefined;
  }

}
