import {AssetStructureTypeRepository} from "../../../repository/asset.structure.type.repository";
import {AssetStructureType} from "../../../data/asset/asset.structure.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class AssetStructureTypeRepositoryRestAdapter implements AssetStructureTypeRepository {
  addAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<AssetStructureType> {
    return undefined;
  }

  deleteAssetStructureType(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetStructureTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructureType[]> {
    return undefined;
  }

  getAssetStructureTypeById(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructureType> {
    return undefined;
  }

  getAssetStructureTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetStructureTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructureType[]>> {
    return undefined;
  }

  updateAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}