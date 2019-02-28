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

    findAssetNameTypes(searchStr: string, pageSize: number, options: any): Observable<AssetNameType[]> {
        return this.assetNameTypeRepository.findAssetNameTypes(searchStr, pageSize, options);
    }

    getAssetNameTypes(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetNameTypeRepository
            .getAssetNameTypes(number, size, sort, options)
            .pipe(switchMap((assetNameTypes: AssetNameType[]) => {
                return this.assetNameTypeRepository
                    .getAssetNameTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetNameTypesResp: any = shapeAssetNameTypesResponse(assetNameTypes, number, size, assetNameTypes.length, count, sort);
                        return new Result<any>(false, "assetNameTypes", shapeAssetNameTypesResp);
                    }));
            }));
    }

    getAssetNameTypeById(assetNameTypeId: string, options: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId, options);
    }

    saveAssetNameType(assetNameType: AssetNameType, options: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.saveAssetNameType(assetNameType, options);
    }

    updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options: any): Observable<number> {
        return this.assetNameTypeRepository.updateAssetNameType(assetNameTypeId, assetNameType, options);
    }

    deleteAssetNameType(assetNameTypeId: string, options: any): Observable<number> {
        return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId, options);
    }

}

