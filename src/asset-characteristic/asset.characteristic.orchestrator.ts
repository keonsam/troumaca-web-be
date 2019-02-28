import {createAssetCharacteristicRepositoryFactory} from "../adapter/asset/asset.characteristic.repository.factory";
import {shapeAssetCharacteristicsResponse} from "./asset.characteristic.response.shaper";
import {getSortOrderOrDefault} from "../sort.order.util";
import {AssetCharacteristicRepository} from "../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Result} from "../result.success";

export class AssetCharacteristicOrchestrator {

    private assetCharacteristicRepository: AssetCharacteristicRepository;

    constructor(options?: any) {
        this.assetCharacteristicRepository = createAssetCharacteristicRepositoryFactory(options);
    }

    findAssetCharacteristics(searchStr: string, pageSize: number, options: any): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageSize, options);
    }

    getAssetCharacteristics(number: number, size: number, field: string, direction: string, options: any): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetCharacteristicRepository
            .getAssetCharacteristics(number, size, sort, options)
            .pipe(switchMap((assetCharacteristics: AssetCharacteristic[]) => {
                return this.assetCharacteristicRepository
                    .getAssetCharacteristicCount(options)
                    .pipe(map((count: number) => {
                        const shapeAssetCharacteristicsResp: any = shapeAssetCharacteristicsResponse(assetCharacteristics, number, size, assetCharacteristics.length, count, sort);
                        return new Result<any>(false, "assetCharacteristics", shapeAssetCharacteristicsResp);
                    }));
            }));
    }

    getTypes(options: any): Observable<any[]> {
        return this.assetCharacteristicRepository.getTypes(options);
    }

    getAssetCharacteristicById(assetCharacteristicId: string, options: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, options);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic, options: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.saveAssetCharacteristic(assetCharacteristic, options);
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options: any): Observable<number> {
        return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic, options);
    }

    deleteAssetCharacteristic(assetCharacteristicId: string, options: any): Observable<number> {
        return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId, options);
    }
}

