import {createAssetIdentifierTypeRepositoryFactory} from "../adapter/asset/asset.identifier.type.repository.factory";
import {shapeAssetIdentifierTypesResponse} from "./asset.identifier.type.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetIdentifierTypeRepository} from "../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class AssetIdentifierTypeOrchestrator {

    private assetIdentifierTypeRepository: AssetIdentifierTypeRepository;

    constructor(options?: any) {
        this.assetIdentifierTypeRepository = createAssetIdentifierTypeRepositoryFactory(options);
    }

    findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
        return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(searchStr, pageSize);
    }

    getAssetIdentifierTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetIdentifierTypeRepository
            .getAssetIdentifierTypes(number, size, sort)
            .pipe(switchMap((assetIdentifierTypes: AssetIdentifierType[]) => {
                return this.assetIdentifierTypeRepository
                    .getAssetIdentifierTypeCount()
                    .pipe(map((count: number) => {
                        const shapeAssetIdentifierTypesResp: any = shapeAssetIdentifierTypesResponse(assetIdentifierTypes, number, size, assetIdentifierTypes.length, count, sort);
                        return new Result<any>(false, "assetIdentifierTypes", shapeAssetIdentifierTypesResp);
                    }));
            }));
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId);
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.saveAssetIdentifierType(assetIdentifierType);
    }

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType): Observable<number> {
        return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierTypeId, assetIdentifierType);
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
        return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId);
    }

}

