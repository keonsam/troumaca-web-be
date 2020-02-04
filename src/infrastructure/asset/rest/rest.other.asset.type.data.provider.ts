import {OtherAssetTypeDataProvider} from "../../../port/other.asset.type.data.provider";
import {OtherAssetType} from "../../../domain/model/asset/other.asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class RestOtherAssetTypeDataProvider implements OtherAssetTypeDataProvider {
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