import {AssetSpecificationDataProvider} from "../../../port/asset.specification.data.provider";
import {AssetSpecification} from "../../../domain/model/asset/asset.specification";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class RestAssetSpecificationDataProvider implements AssetSpecificationDataProvider {
  addAssetSpecification(assetType: AssetSpecification, headerOptions?: any): Observable<AssetSpecification> {
    return undefined;
  }

  deleteAssetSpecification(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetSpecifications(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetSpecification[]> {
    return undefined;
  }

  getAssetSpecificationById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetSpecification> {
    return undefined;
  }

  getAssetSpecificationCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetSpecifications(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetSpecification[]>> {
    return undefined;
  }

  updateAssetSpecification(assetType: AssetSpecification, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}