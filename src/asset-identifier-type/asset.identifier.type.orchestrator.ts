import {createAssetIdentifierTypeRepository} from "../adapter/asset/asset.identifier.type.repository.factory";
import {AssetIdentifierTypeRepository} from "../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Sort} from "../util/sort";
import { AssetIdentifierTypes } from "../data/asset/asset.identifier.types";
import { Page } from "../data/page/page";

export class AssetIdentifierTypeOrchestrator {

    private assetIdentifierTypeRepository: AssetIdentifierTypeRepository;

    constructor(options?: any) {
        this.assetIdentifierTypeRepository = createAssetIdentifierTypeRepository(options);
    }

    findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]> {
        return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(searchStr, pageNumber, pageSize, headerOptions);
    }

    getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<AssetIdentifierTypes> {
        return this.assetIdentifierTypeRepository
            .getAssetIdentifierTypes(pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetIdentifierTypes: AssetIdentifierType[]) => {
                return this.assetIdentifierTypeRepository
                    .getAssetIdentifierTypeCount(options)
                    .pipe(map((count: number) => {
                        return new AssetIdentifierTypes(assetIdentifierTypes, new Page(pageNumber, pageSize, assetIdentifierTypes.length, count));
                    }));
            }));
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string, options?: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId, options);
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options?: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.addAssetIdentifierType(assetIdentifierType, options);
    }

    updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, options?: any): Observable<number> {
        return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierTypeId, assetIdentifierType, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string, options?: any): Observable<number> {
        return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId, options)
            .pipe(map(aff => aff.affected));
    }
}

