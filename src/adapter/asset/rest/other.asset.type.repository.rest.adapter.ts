import {OtherAssetTypeRepository} from "../../../repository/other.asset.type.repository";
import {OtherAssetType} from "../../../data/asset/other.asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class OtherAssetTypeRepositoryRestAdapter implements OtherAssetTypeRepository {
  addOtherAssetType(assetType: OtherAssetType, headerOptions?: any): Observable<OtherAssetType> {
    return undefined;
  }

  deleteOtherAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findOtherAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<OtherAssetType[]> {
    return undefined;
  }

  getOtherAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<OtherAssetType> {
    return undefined;
  }

  getOtherAssetTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getOtherAssetTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<OtherAssetType[]>> {
    return undefined;
  }

  updateOtherAssetType(assetType: OtherAssetType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}