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

    findAssetIdentifierTypes(searchStr: string, pageSize: number, options: any): Observable<AssetIdentifierType[]> {
        return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(searchStr, pageSize, options);
    }

    getAssetIdentifierTypes(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetIdentifierTypeRepository
            .getAssetIdentifierTypes(number, size, sort, options)
            .pipe(switchMap((assetIdentifierTypes: AssetIdentifierType[]) => {
                return this.assetIdentifierTypeRepository
                    .getAssetIdentifierTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetIdentifierTypesResp: any = shapeAssetIdentifierTypesResponse(assetIdentifierTypes, number, size, assetIdentifierTypes.length, count, sort);
                        return new Result<any>(false, "assetIdentifierTypes", shapeAssetIdentifierTypesResp);
                    }));
            }));
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string, options: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId, options);
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.saveAssetIdentifierType(assetIdentifierType, options);
    }

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options: any): Observable<number> {
        return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierTypeId, assetIdentifierType, options);
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string, options: any): Observable<number> {
        return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId, options);
    }

}

