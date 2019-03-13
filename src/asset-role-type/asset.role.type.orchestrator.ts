import {createAssetRoleTypeRepositoryFactory} from "../adapter/asset/asset.role.type.repository.factory";
import {shapeAssetRoleTypesResponse} from "./asset.role.type.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRoleTypeRepository} from "../repository/asset.role.type.repository";
import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class AssetRoleTypeOrchestrator {

    private assetRoleTypeRepository: AssetRoleTypeRepository;

    constructor(options?: any) {
        this.assetRoleTypeRepository = createAssetRoleTypeRepositoryFactory(options);
    }

    findAssetRoleTypes(searchStr: string, pageSize: number, options: any): Observable<AssetRoleType[]> {
        return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageSize, options);
    }

    getAssetRoleTypes(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetRoleTypeRepository
            .getAssetRoleTypes(number, size, sort, options)
            .pipe(switchMap((assetRoleTypes: AssetRoleType[]) => {
                return this.assetRoleTypeRepository
                    .getAssetRoleTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetRoleTypesResp: any = shapeAssetRoleTypesResponse(assetRoleTypes, number, size, assetRoleTypes.length, count, sort);
                        return new Result<any>(false, "assetRoleTypes", shapeAssetRoleTypesResp);
                    }));
            }));
    }

    getAssetRoleTypeById(assetRoleTypeId: string, options: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, options);
    }

    saveAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.saveAssetRoleType(assetRoleType, options);
    }

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options: any): Observable<number> {
        return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleTypeId, assetRoleType, options);
    }

    deleteAssetRoleType(assetRoleTypeId: string, options: any): Observable<number> {
        return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, options);
    }

}

