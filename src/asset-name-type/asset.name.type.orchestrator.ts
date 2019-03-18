import {createAssetNameTypeRepository} from "../adapter/asset/asset.name.type.repository.factory";
import {shapeAssetNameTypesResponse} from "./asset.name.type.response.shaper";
// import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetNameTypeRepository} from "../repository/asset.name.type.repository";
import {AssetNameType} from "../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";
import {Sort} from "../util/sort";
import {Affect} from "../data/affect";

export class AssetNameTypeOrchestrator {

    private assetNameTypeRepository: AssetNameTypeRepository;

    constructor(options?: any) {
        this.assetNameTypeRepository = createAssetNameTypeRepository(options);
    }

    findAssetNameTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, options?:any): Observable<AssetNameType[]> {
        return this.assetNameTypeRepository.findAssetNameTypes(ownerPartyId, searchStr, pageNumber, pageSize, options);
    }

    getAssetNameTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<Result<any>> {
        //const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetNameTypeRepository
            .getAssetNameTypes(ownerPartyId, pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetNameTypes: AssetNameType[]) => {
                return this.assetNameTypeRepository
                    .getAssetNameTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetNameTypesResp: any = shapeAssetNameTypesResponse(
                          assetNameTypes, pageNumber, pageSize, assetNameTypes.length, count, sort
                        );
                        return new Result<any>(false, "assetNameTypes", shapeAssetNameTypesResp);
                    }));
            }));
    }

    getAssetNameTypeById(assetNameTypeId: string, options: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.getAssetNameTypeById(assetNameTypeId, options);
    }

    saveAssetNameType(assetNameType: AssetNameType, options: any): Observable<AssetNameType> {
        return this.assetNameTypeRepository.addAssetNameType(assetNameType, options);
    }

    updateAssetNameType(assetNameType: AssetNameType, options: any): Observable<Affect> {
        return this.assetNameTypeRepository.updateAssetNameType(assetNameType, options);
    }

    deleteAssetNameType(assetNameTypeId: string, options: any): Observable<Affect> {
        return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId, options);
    }

}

