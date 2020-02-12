import {AssetNameDataProvider} from "../../../port/asset.name.data.provider";
import {AssetName} from "../../../domain/model/asset/asset.name";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestAssetNameDataProvider implements AssetNameDataProvider {
  addAssetName(assetName: AssetName, headerOptions?: any): Observable<AssetName> {
    return undefined;
  }

  updateAssetName(assetName: AssetName, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  deleteAssetName(assetNameId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetNames(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetName[]> {
    return undefined;
  }

  getAssetNameById(assetId: string): Observable<AssetName> {
    return undefined;
  }

  getAssetNameCount(): Observable<number> {
    return undefined;
  }

  getAssetNames(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetName[]>> {
    return undefined;
  }
}