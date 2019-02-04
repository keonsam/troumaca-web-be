import {AssetSpecificationRepository} from "../../../repository/asset.specification.repository";
import {AssetSpecification} from "../../../data/asset/asset.specification";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetSpecificationRepositoryRestAdapter implements AssetSpecificationRepository {
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