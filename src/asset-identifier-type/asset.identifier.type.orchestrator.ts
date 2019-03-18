import {createAssetIdentifierTypeRepository} from "../adapter/asset/asset.identifier.type.repository.factory";
import {shapeAssetIdentifierTypesResponse} from "./asset.identifier.type.response.shaper";
import {AssetIdentifierTypeRepository} from "../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";
import {Sort} from "../util/sort";
import {Affect} from "../data/affect";

export class AssetIdentifierTypeOrchestrator {

    private assetIdentifierTypeRepository: AssetIdentifierTypeRepository;

    constructor(options?: any) {
        this.assetIdentifierTypeRepository = createAssetIdentifierTypeRepository(options);
    }

    findAssetIdentifierTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]> {
        return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
    }

    getAssetIdentifierTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<Result<any>> {
        //const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetIdentifierTypeRepository
            .getAssetIdentifierTypes(ownerPartyId, pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetIdentifierTypes: AssetIdentifierType[]) => {
                return this.assetIdentifierTypeRepository
                    .getAssetIdentifierTypeCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetIdentifierTypesResp: any = shapeAssetIdentifierTypesResponse(
                          assetIdentifierTypes, pageNumber, pageSize, assetIdentifierTypes.length, count, sort
                        );
                        return new Result<any>(false, "assetIdentifierTypes", shapeAssetIdentifierTypesResp);
                    }));
            }));
    }

    getAssetIdentifierTypeById(assetIdentifierTypeId: string, options: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.getAssetIdentifierTypeById(assetIdentifierTypeId, options);
    }

    saveAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<AssetIdentifierType> {
        return this.assetIdentifierTypeRepository.addAssetIdentifierType(assetIdentifierType, options);
    }

    updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType, options: any): Observable<Affect> {
        return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierType, options);
    }

    deleteAssetIdentifierType(assetIdentifierTypeId: string, options: any): Observable<Affect> {
        return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId, options);
    }

}

