import {createAssetNameTypeRepositoryFactory} from "../adapter/asset/asset.name.type.repository.factory";
import {shapeAssetNameTypesResponse} from "./asset.name.type.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetNameTypeRepository} from "../repository/asset.name.type.repository";
import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class AssetNameTypeOrchestrator {

    private assetNameTypeRepository: AssetNameTypeRepository;

    constructor(options?: any) {
        this.assetNameTypeRepository = createAssetNameTypeRepositoryFactory(options);
    }

    findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
        return this.assetNameTypeRepository.findAssetNameTypes(searchStr, pageSize);
    }

    getAssetNameTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetNameTypeRepository
            .getAssetNameTypes(number, size, sort)
            .pipe(switchMap((assetNameTypes: AssetNameType[]) => {
                return this.assetNameTypeRepository
                    .getAssetNameTypeCount()
                    .pipe(map((count: number) => {
                        const shapeAssetNameTypesResp: any = shapeAssetNameTypesResponse(assetNameTypes, number, size, assetNameTypes.length, count, sort);
                        return new Result<any>(false, "assetNameTypes", shapeAssetNameTypesResp);
                    }));
            }));
    }

    getAssetNameTypeById(assetNameTypeId: string): Observable<AssetNameType> {
        return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId);
    }

    saveAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
        return this.assetNameTypeRepository.saveAssetNameType(assetNameType);
    }

    updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType): Observable<number> {
        return this.assetNameTypeRepository.updateAssetNameType(assetNameTypeId, assetNameType);
    }

    deleteAssetNameType(assetNameTypeId: string): Observable<number> {
        return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId);
    }

}

