import {createAssetCharacteristicDataProvider} from "../../../../infrastructure/asset/asset.characteristic.data.provider.factory";
import {AssetCharacteristicDataProvider} from "../../../../port/asset.characteristic.data.provider";
import {AssetCharacteristic} from "../../../../domain/model/asset/asset.characteristic";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
// import {Sort} from "../../util/sort";
import { AssetCharacteristics } from "../../../../domain/model/asset/asset.characteristics";
// import { Page } from "../../../../domain/model/page/page";
import { CharacteristicType } from "../../../../domain/model/asset/characteristic.type";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { RepositoryKind } from "../../../../repository.kind";
import { AssetCharacteristicRequest } from "../../../../domain/model/asset/request/asset.characteristic.request";

export class AssetCharacteristicOrchestrator {

    private assetCharacteristicRepository: AssetCharacteristicDataProvider;

    constructor(options?: RepositoryKind) {
        this.assetCharacteristicRepository = createAssetCharacteristicDataProvider(options);
    }

    findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageNumber, pageSize, options);
    }

    getAssetCharacteristics(tab?: string, search?: string, selected?: string[], pageNumber?: number, pageSize?: number, options?: HeaderBaseOptions): Observable<AssetCharacteristics> {
        return this.assetCharacteristicRepository.getAssetCharacteristics(tab, search, selected, pageNumber, pageSize, options);
    }

    getAssetCharacteristicById(assetCharacteristicId: string, options?: HeaderBaseOptions): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, options);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristicRequest, options?: HeaderBaseOptions): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.addAssetCharacteristic(assetCharacteristic, options);
    }

    updateAssetCharacteristic(assetCharacteristicId: string, assetCharacteristic: AssetCharacteristic, options?: HeaderBaseOptions): Observable<number> {
        return this.assetCharacteristicRepository.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic, options)
            .pipe(map(aff => aff.affected));
    }

    deleteAssetCharacteristic(assetCharacteristicId: string, options?: HeaderBaseOptions): Observable<number> {
        return this.assetCharacteristicRepository.deleteAssetCharacteristic(assetCharacteristicId, options)
            .pipe(map(aff => aff.affected));
    }

    getAssetCharacteristicTypes(options?: HeaderBaseOptions): Observable<CharacteristicType[]> {
        return this.assetCharacteristicRepository.getAssetCharacteristicTypes(options);
    }

    getAssetCharacteristicType(assetCharacteristicTypeId: string, options?: HeaderBaseOptions): Observable<CharacteristicType> {
        return this.assetCharacteristicRepository.getAssetCharacteristicType(assetCharacteristicTypeId, options);
    }
}

