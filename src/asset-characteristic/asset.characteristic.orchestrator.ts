import {createAssetCharacteristicRepository} from "../adapter/asset/asset.characteristic.repository.factory";
import {AssetCharacteristicRepository} from "../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Sort} from "../util/sort";
import { AssetCharacteristics } from "../data/asset/asset.characteristics";
import { Page } from "../data/page/page";
import { AssetCharacteristicType } from "../data/asset/asset.characteristic.type";

export class AssetCharacteristicOrchestrator {

    private assetCharacteristicRepository: AssetCharacteristicRepository;

    constructor(options?: any) {
        this.assetCharacteristicRepository = createAssetCharacteristicRepository(options);
    }

    findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, options?: any): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageNumber, pageSize, options);
    }

    getAssetCharacteristics(pageNumber: number, pageSize: number, sort: Sort, options?: any): Observable<AssetCharacteristics> {
        // const sort: string = getSortOrderOrDefault(sort, direction);
        return this.assetCharacteristicRepository
            .getAssetCharacteristics(pageNumber, pageSize, sort, options)
            .pipe(switchMap((assetCharacteristics: AssetCharacteristic[]) => {
                return this.assetCharacteristicRepository
                    .getAssetCharacteristicCount(options)
                    .pipe(map((count: number) => {
                        return new AssetCharacteristics(assetCharacteristics, new Page(pageNumber, pageSize, assetCharacteristics.length, count));
                    }));
            }));
    }

    getAssetCharacteristicById(assetCharacteristicId: string, options?: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, options);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristic, options?: any): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.addAssetCharacteristic(assetCharacteristic, options);
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options?: any): Observable<number> {
        return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetCharacteristic(assetCharacteristicId: string, options?: any): Observable<number> {
        return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId, options)
            .pipe(map(aff => aff.affected));
    }

    getAssetCharacteristicTypes(options?: any): Observable<AssetCharacteristicType[]> {
        return this.assetCharacteristicRepository.getAssetCharacteristicTypes(options);
    }

    getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: any): Observable<AssetCharacteristicType> {
        return this.assetCharacteristicRepository.getAssetCharacteristicType(assetCharacteristicTypeId, options);
    }
}

