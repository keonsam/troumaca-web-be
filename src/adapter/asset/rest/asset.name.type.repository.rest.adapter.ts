import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class AssetNameTypeRepositoryRestAdapter implements AssetNameTypeRepository {
  addAssetNameType(assetNameType: AssetNameType, headerOptions?: any): Observable<AssetNameType> {
    return undefined;
  }

  updateAssetNameType(assetNameType: AssetNameType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return undefined;
  }

  findAssetNameTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypeById(assetId: string): Observable<AssetNameType> {
    return undefined;
  }

  getAssetNameTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetNameTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>> {
    return undefined;
  }
}