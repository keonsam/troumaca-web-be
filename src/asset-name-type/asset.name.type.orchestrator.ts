import {createAssetNameTypeRepository} from "../adapter/asset/asset.name.type.repository.factory";
import {AssetNameTypeRepository} from "../repository/asset.name.type.repository";
import {AssetNameType} from "../data/asset/asset.name.type";
import { Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Sort} from "../util/sort";
import { AssetNameTypes } from "../data/asset/asset.name.types";
import { Page } from "../data/page/page";

export class AssetNameTypeOrchestrator {

    private assetNameTypeRepository: AssetNameTypeRepository;

    constructor(options?: any) {
        this.assetNameTypeRepository = createAssetNameTypeRepository(options);
    }

    findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, options?: any): Observable<AssetNameType[]> {
        return this.assetNameTypeRepository.findAssetNameTypes(searchStr, pageNumber, pageSize, options);
    }

    getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<AssetNameTypes> {
        return this.assetNameTypeRepository
            .getAssetNameTypes(pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetNameTypes: AssetNameType[]) => {
                return this.assetNameTypeRepository
                    .getAssetNameTypeCount(options)
                    .pipe(map((count: number) => {
                        return new AssetNameTypes(assetNameTypes, new Page(pageNumber, pageSize, assetNameTypes.length, count));
                    }));
            }));
    }

    getAssetNameTypeById(assetNameTypeId: string, options?: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId, options);
    }

    saveAssetNameType(assetNameType: AssetNameType, options?: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.addAssetNameType(assetNameType, options);
    }

    updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, options?: any): Observable<number> {
        return this.assetNameTypeRepository.updateAssetNameType(assetNameTypeId, assetNameType, options);
    }

    deleteAssetNameType(assetNameTypeId: string, options?: any): Observable<number> {
        return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId, options)
            .pipe(map(aff => aff.affected));
    }

}

