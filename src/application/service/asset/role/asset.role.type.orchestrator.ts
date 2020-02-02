import {createAssetRoleTypeDataProvider} from "../../../../infrastructure/asset/asset.role.type.data.provider.factory";
// import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetRoleTypeDataProvider} from "../../../../port/asset.role.type.data.provider";
import {AssetRoleType} from "../../../../domain/model/asset/asset.role.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
// import {Result} from "../../../../result.success";
// import {Sort} from "../../../../util/sort";
// import {Affect} from "../../../../domain/model/affect";
import { AssetRoleTypes } from "../../../../domain/model/asset/asset.role.types";
// import { Page } from "../../domain/model/page/page";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RepositoryKind } from "../../../../repository.kind";

export class AssetRoleTypeOrchestrator {

    private assetRoleTypeRepository: AssetRoleTypeDataProvider;

    constructor(options?: RepositoryKind) {
        this.assetRoleTypeRepository = createAssetRoleTypeDataProvider(options);
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

