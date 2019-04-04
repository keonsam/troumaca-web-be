import {createAssetIdentifierTypeRepository} from "../../adapter/asset/asset.identifier.type.repository.factory";
import {AssetIdentifierTypeRepository} from "../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Sort} from "../../util/sort";
import { AssetIdentifierTypes } from "../../data/asset/asset.identifier.types";
import { Page } from "../../data/page/page";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";

export class AssetIdentifierTypeOrchestrator {

    private assetIdentifierTypeRepository: AssetIdentifierTypeRepository;

    constructor(options?: RepositoryKind) {
        this.assetIdentifierTypeRepository = createAssetIdentifierTypeRepository(options);
    }

    findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType[]> {
        return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(searchStr, pageNumber, pageSize, headerOptions);
    }

    getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, options?: HeaderBaseOptions): Observable<AssetIdentifierTypes> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypes(pageNumber, pageSize, sort, options);
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string, options?: HeaderBaseOptions): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId, options);
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options?: HeaderBaseOptions): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.addAssetIdentifierType(assetIdentifierType, options);
    }

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options?: HeaderBaseOptions): Observable<number> {
        return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierTypeId, assetIdentifierType, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string, options?: HeaderBaseOptions): Observable<number> {
        return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId, options)
            .pipe(map(aff => aff.affected));
    }
}

