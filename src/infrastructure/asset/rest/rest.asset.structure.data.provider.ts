import {AssetStructureDataProvider} from "../../../port/asset.structure.data.provider";
import {AssetStructure} from "../../../domain/model/asset/asset.structure";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";

export class RestAssetStructureDataProvider implements AssetStructureDataProvider {
  addAssetStructure(assetStructure: AssetStructure, headerOptions?: any): Observable<AssetStructure> {
    return undefined;
  }

  deleteAssetStructure(assetStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return undefined;
  }

  findAssetStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructure[]> {
    return undefined;
  }

  getAssetStructureById(assetStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructure> {
    return undefined;
  }

  getAssetStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return undefined;
  }

  getAssetStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructure[]>> {
    return undefined;
  }

  updateAssetStructure(assetStructure: AssetStructure, headerOptions?: any): Observable<Affect> {
    return undefined;
  }
}