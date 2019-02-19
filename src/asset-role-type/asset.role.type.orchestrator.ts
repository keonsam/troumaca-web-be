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

    findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
        return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageSize);
    }

    getAssetRoleTypes(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetRoleTypeRepository
            .getAssetRoleTypes(number, size, sort)
            .pipe(switchMap((assetRoleTypes: AssetRoleType[]) => {
                return this.assetRoleTypeRepository
                    .getAssetRoleTypeCount()
                    .pipe(map((count: number) => {
                        const shapeAssetRoleTypesResp: any = shapeAssetRoleTypesResponse(assetRoleTypes, number, size, assetRoleTypes.length, count, sort);
                        return new Result<any>(false, "assetRoleTypes", shapeAssetRoleTypesResp);
                    }));
            }));
    }

    getAssetRoleTypeById(assetRoleTypeId: string): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId);
    }

    saveAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.saveAssetRoleType(assetRoleType);
    }

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType): Observable<number> {
        return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleTypeId, assetRoleType);
    }

    deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
        return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId);
    }

}

