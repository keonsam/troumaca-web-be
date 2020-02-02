import {AssetIdentifierDataProvider} from "../../../port/asset.identifier.data.provider";
import {AssetIdentifier} from "../../../domain/model/asset/asset.identifier";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";

export class RestAssetIdentifierDataProvider implements AssetIdentifierDataProvider {
  addAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<AssetIdentifier> {
    return undefined;
  }

  deleteAssetIdentifier(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetIdentifiers(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifier[]> {
    return undefined;
  }

  getAssetIdentifierById(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifier> {
    return undefined;
  }

  getAssetIdentifierCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetIdentifiers(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifier[]>> {
    return undefined;
  }

  updateAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

}