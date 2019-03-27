import {AssetIdentifierTypeRepository} from "../../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class AssetIdentifierTypeRepositoryRestAdapter implements AssetIdentifierTypeRepository {
  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<AssetIdentifierType> {
    return undefined;
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifierType> {
    return undefined;
  }

  getAssetIdentifierTypeCount(headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierType[]>> {
    return undefined;
  }

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}
