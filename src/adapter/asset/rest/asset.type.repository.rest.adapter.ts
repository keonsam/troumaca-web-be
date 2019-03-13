import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {AssetType} from "../../../data/asset/asset.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType> {
    return undefined;
  }

  deleteAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetType> {
    return undefined;
  }

  getAssetTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetType[]>> {
    return undefined;
  }

  updateAssetType(assetType: AssetType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}