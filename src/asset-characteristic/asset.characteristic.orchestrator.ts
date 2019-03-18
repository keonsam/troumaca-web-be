import {createAssetCharacteristicRepository} from "../adapter/asset/asset.characteristic.repository.factory";
import {shapeAssetCharacteristicsResponse} from "./asset.characteristic.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetCharacteristicRepository} from "../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";
import {Sort} from "../util/sort";
import {Affect} from "../data/affect";

export class AssetCharacteristicOrchestrator {

    private assetCharacteristicRepository: AssetCharacteristicRepository;

    constructor(options?: any) {
        this.assetCharacteristicRepository = createAssetCharacteristicRepository(options);
    }

    findAssetCharacteristics(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, options?:any): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(ownerPartyId, searchStr, pageNumber, pageSize, options);
    }

    getAssetCharacteristics(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<Result<any>> {
        // const sort: string = getSortOrderOrDefault(sort, direction);
        return this.assetCharacteristicRepository
            .getAssetCharacteristics(ownerPartyId, pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetCharacteristics: AssetCharacteristic[]) => {
                return this.assetCharacteristicRepository
                    .getAssetCharacteristicCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetCharacteristicsResp: any = shapeAssetCharacteristicsResponse(assetCharacteristics, pageNumber, pageSize, assetCharacteristics.length, count, sort);
                        return new Result<any>(false, "assetCharacteristics", shapeAssetCharacteristicsResp);
                    }));
            }));
    }

    getTypes(options: any): Observable<any[]> {
        return null //this.assetCharacteristicRepository.getTypes(options);
    }

    getAssetCharacteristicById(assetCharacteristicId: string, options: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, options);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic, options: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.addAssetCharacteristic(assetCharacteristic, options);
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options: any): Observable<Affect> {
        return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristic, options);
    }

    deleteAssetCharacteristic(assetCharacteristicId: string, options: any): Observable<Affect> {
        return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId, options);
    }
}

