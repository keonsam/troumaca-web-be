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

    findAssetCharacteristics(searchStr: string, pageSize: number): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageSize);
    }

    getAssetCharacteristics(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
        const sort: string = getSortOrderOrDefault(field, direction);
        return this.assetCharacteristicRepository
            .getAssetCharacteristics(number, size, sort)
            .pipe(switchMap((assetCharacteristics: AssetCharacteristic[]) => {
                return this.assetCharacteristicRepository
                    .getAssetCharacteristicCount()
                    .pipe(map((count: number) => {
                        const shapeAssetCharacteristicsResp: any = shapeAssetCharacteristicsResponse(assetCharacteristics, number, size, assetCharacteristics.length, count, sort);
                        return new Result<any>(false, "assetCharacteristics", shapeAssetCharacteristicsResp);
                    }));
            }));
    }

    getTypes(): Observable<any[]> {
        return this.assetCharacteristicRepository.getTypes();
    }

    getAssetCharacteristicById(assetCharacteristicId: string): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.saveAssetCharacteristic(assetCharacteristic);
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic): Observable<number> {
        return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic);
    }

    deleteAssetCharacteristic(assetCharacteristicId: string): Observable<number> {
        return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId);
    }

}

