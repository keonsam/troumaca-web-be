import {createAssetNameTypeRepository} from "../../adapter/asset/asset.name.type.repository.factory";
import {AssetNameTypeRepository} from "../../repository/asset.name.type.repository";
import {AssetNameType} from "../../data/asset/asset.name.type";
import { Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Sort} from "../../util/sort";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";
import { Page } from "../../util/page";
import { AssetNameTypes } from "../../data/asset/asset.name.types";

export class AssetNameTypeOrchestrator {

    private assetNameTypeRepository: AssetNameTypeRepository;

    constructor(options?: RepositoryKind) {
        this.assetNameTypeRepository = createAssetNameTypeRepository(options);
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

