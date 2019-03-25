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
import { AssetRoleTypes } from "../data/asset/asset.role.types";
import { Page } from "../data/page/page";

export class AssetRoleTypeOrchestrator {

    private assetRoleTypeRepository: AssetRoleTypeRepository;

    constructor(options?: any) {
        this.assetRoleTypeRepository = createAssetRoleTypeRepository(options);
    }

    findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, options?: any): Observable<AssetRoleType[]> {
        return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageNumber, pageSize, options);
    }

    getAssetRoleTypes(pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<AssetRoleTypes> {
        return this.assetRoleTypeRepository
            .getAssetRoleTypes(pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetRoleTypes: AssetRoleType[]) => {
                return this.assetRoleTypeRepository
                    .getAssetRoleTypeCount(options)
                    .pipe(map((count: number) => {
                        return new AssetRoleTypes(assetRoleTypes, new Page(pageNumber, pageSize, assetRoleTypes.length, count));
                    }));
            }));
    }

    getAssetRoleTypeById(assetRoleTypeId: string, options?: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, options);
    }

    saveAssetRoleType(assetRoleType: AssetRoleType, options?: any): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType, options);
    }

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options?: any): Observable<number> {
        return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleTypeId, assetRoleType, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetRoleType(assetRoleTypeId: string, options?: any): Observable<number> {
        return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, options)
            .pipe(map(aff => aff.affected));
    }

}

