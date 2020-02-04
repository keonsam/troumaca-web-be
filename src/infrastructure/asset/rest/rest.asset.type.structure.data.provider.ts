import {AssetTypeStructureDataProvider} from "../../../port/asset.type.structure.data.provider";
import {AssetTypeStructure} from "../../../domain/model/asset/asset.type.structure";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class RestAssetTypeStructureDataProvider implements AssetTypeStructureDataProvider {
  addAssetTypeStructure(assetType: AssetTypeStructure, headerOptions?: any): Observable<AssetTypeStructure> {
    return undefined;
  }

  deleteAssetTypeStructure(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetTypeStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetTypeStructure[]> {
    return undefined;
  }

  getAssetTypeStructureById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetTypeStructure> {
    return undefined;
  }

  getAssetTypeStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetTypeStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetTypeStructure[]>> {
    return undefined;
  }

  updateAssetTypeStructure(assetType: AssetTypeStructure, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}