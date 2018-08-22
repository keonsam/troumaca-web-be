import { AssetTypeRepository } from "../asset.type.repository";
import { Observable } from "rxjs";
import { AssetType } from "../asset.type";
import { Value } from "../value/value";
import { AssetTypeResponse } from "../asset.type.response";

export  class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
    findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
        return undefined;
    }

    getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
        return null;
    }

    getAssetTypeCount(): Observable<number> {
        return null;
    }

    getAssetTypeById(assetTypeId: string): Observable<AssetTypeResponse> {
        return null;
    }

    saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
        return null;
    }

    updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
        return null;
    }

    deleteAssetType(assetTypeId: string): Observable<number> {
        return null;
    }
}