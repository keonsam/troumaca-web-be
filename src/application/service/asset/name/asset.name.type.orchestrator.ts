import {createAssetNameTypeDataProvider} from "../../../../infrastructure/asset/asset.name.type.data.provider.factory";
import {AssetNameTypeDataProvider} from "../../../../port/asset.name.type.data.provider";
import {AssetNameType} from "../../../../domain/model/asset/asset.name.type";
import { Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Sort} from "../../../../util/sort";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RepositoryKind } from "../../../../repository.kind";
import { Page } from "../../../../util/page";
import { AssetNameTypes } from "../../../../domain/model/asset/asset.name.types";

export class AssetNameTypeOrchestrator {

    private assetNameTypeRepository: AssetNameTypeDataProvider;

    constructor(options?: RepositoryKind) {
        this.assetNameTypeRepository = createAssetNameTypeDataProvider(options);
    }

    findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<AssetNameType[]> {
        return this.assetNameTypeRepository.findAssetNameTypes(searchStr, pageNumber, pageSize, options);
    }

    getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, options?: HeaderBaseOptions): Observable<AssetNameTypes> {
        return this.assetNameTypeRepository.getAssetNameTypes(pageNumber, pageSize, sort, options);
    }

    getAssetNameTypeById(assetNameTypeId: string, options?: HeaderBaseOptions): Observable<AssetNameType> {
        return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId, options);
    }

    saveAssetNameType(assetNameType: AssetNameType, options?: HeaderBaseOptions): Observable<AssetNameType> {
        return this.assetNameTypeRepository.addAssetNameType(assetNameType, options);
    }

    updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options?: HeaderBaseOptions): Observable<number> {
        return this.assetNameTypeRepository.updateAssetNameType(assetNameTypeId, assetNameType, options);
    }

    deleteAssetNameType(assetNameTypeId: string, options?: HeaderBaseOptions): Observable<number> {
        return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId, options)
            .pipe(map(aff => aff.affected));
    }

}

