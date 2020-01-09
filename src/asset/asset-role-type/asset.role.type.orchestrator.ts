import {createAssetRoleTypeRepository} from "../../adapter/asset/asset.role.type.repository.factory";
// import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRoleTypeRepository} from "../../repository/asset.role.type.repository";
import {AssetRoleType} from "../../data/asset/asset.role.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../../result.success";
import {Sort} from "../../util/sort";
import {Affect} from "../../data/affect";
import { AssetRoleTypes } from "../../data/asset/asset.role.types";
import { Page } from "../../data/page/page";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";

export class AssetRoleTypeOrchestrator {

    private assetRoleTypeRepository: AssetRoleTypeRepository;

    constructor(options?: RepositoryKind) {
        this.assetRoleTypeRepository = createAssetRoleTypeRepository(options);
    }

    findAssetRoleTypes(searchStr: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<AssetRoleType[]> {
        return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageNumber, pageSize, options);
    }

    getAssetRoleTypes(search: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<AssetRoleTypes> {
        return this.assetRoleTypeRepository.getAssetRoleTypes(search, pageNumber, pageSize, options);
            // .pipe(switchMap((assetRoleTypes: AssetRoleType[]) => {
            //     return this.assetRoleTypeRepository
            //         .getAssetRoleTypeCount(options)
            //         .pipe(map((count: number) => {
            //             return new AssetRoleTypes(assetRoleTypes, new Page(pageNumber, pageSize, assetRoleTypes.length, count));
            //         }));
            // }));
    }

    getAssetRoleTypeById(assetRoleTypeId: string, options?: HeaderBaseOptions): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.getAssetRoleTypeById(assetRoleTypeId, options);
    }

    saveAssetRoleType(assetRoleType: AssetRoleType, options?: HeaderBaseOptions): Observable<AssetRoleType> {
        return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType, options);
    }

    updateAssetRoleType(assetRoleTypeId: string, assetRoleType: AssetRoleType, options?: HeaderBaseOptions): Observable<number> {
        return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleTypeId, assetRoleType, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetRoleType(assetRoleTypeId: string, options?: HeaderBaseOptions): Observable<number> {
        return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId, options)
            .pipe(map(aff => aff.affected));
    }

}

