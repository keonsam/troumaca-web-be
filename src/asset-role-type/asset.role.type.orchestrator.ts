import {createAssetRoleTypeRepository} from "../adapter/asset/asset.role.type.repository.factory";
import {shapeAssetRoleTypesResponse} from "./asset.role.type.response.shaper";
// import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRoleTypeRepository} from "../repository/asset.role.type.repository";
import {AssetRoleType} from "../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";
import {Sort} from "../util/sort";
import {Affect} from "../data/affect";

export class AssetRoleTypeOrchestrator {

    private assetRoleTypeRepository: AssetRoleTypeRepository;

    constructor(options?: any) {
        this.assetRoleTypeRepository = createAssetRoleTypeRepository(options);
    }

    findAssetRoleTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, options?: any): Observable<AssetRoleType[]> {
        return this.assetRoleTypeRepository.findAssetRoleTypes(ownerPartyId, searchStr, pageNumber, pageSize, options);
    }

    getAssetRoleTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<Result<any>> {
        //const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetRoleTypeRepository
            .getAssetRoleTypes(ownerPartyId, pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetRoleTypes: AssetRoleType[]) => {
                return this.assetRoleTypeRepository
                    .getAssetRoleTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetRoleTypesResp: any = shapeAssetRoleTypesResponse(
                          assetRoleTypes, pageNumber, pageSize, assetRoleTypes.length, count, sort
                        );
                        return new Result<any>(false, "assetRoleTypes", shapeAssetRoleTypesResp);
                    }));
            }));
    }

    getAssetRoleTypeById(assetRoleTypeId: string, options: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, options);
    }

    saveAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType, options);
    }

    updateAssetRoleType(assetRoleType: AssetRoleType, options: any): Observable<Affect> {
        return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleType, options);
    }

    deleteAssetRoleType(assetRoleTypeId: string, options: any): Observable<Affect> {
        return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, options);
    }

}

