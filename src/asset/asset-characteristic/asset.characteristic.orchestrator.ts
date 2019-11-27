import {createAssetCharacteristicRepository} from "../../adapter/asset/asset.characteristic.repository.factory";
import {AssetCharacteristicRepository} from "../../repository/asset.characteristic.repository";
import {AssetCharacteristic} from "../../data/asset/asset.characteristic";
import {Observable} from "rxjs";
import {switchMap, map} from "rxjs/operators";
import {Sort} from "../../util/sort";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";
import { Page } from "../../data/page/page";
import { CharacteristicType } from "../../data/asset/characteristic.type";
import { HeaderBaseOptions } from "../../header.base.options";
import { RepositoryKind } from "../../repository.kind";
import { AssetCharacteristicInput } from "../../graphql/asset/dto/asset.characteristic.input";

export class AssetCharacteristicOrchestrator {

    private assetCharacteristicRepository: AssetCharacteristicRepository;

    constructor(options?: RepositoryKind) {
        this.assetCharacteristicRepository = createAssetCharacteristicRepository(options);
    }

    findAssetCharacteristics(searchStr: string, pageNumber: number, pageSize: number, options?: HeaderBaseOptions): Observable<AssetCharacteristic[]> {
        return this.assetCharacteristicRepository.findAssetCharacteristics(searchStr, pageNumber, pageSize, options);
    }

    getAssetCharacteristics(tab?: string, search?: string, selected?: string[], options?: HeaderBaseOptions): Observable<AssetCharacteristics> {
        return this.assetCharacteristicRepository.getAssetCharacteristics(tab, search, selected, options);
    }

    getAssetCharacteristicById(assetCharacteristicId: string, options?: HeaderBaseOptions): Observable<AssetCharacteristic> {
        return this.assetCharacteristicRepository.getAssetCharacteristicById(assetCharacteristicId, options);
    }

    saveAssetCharacteristic(assetCharacteristic: AssetCharacteristicInput, options?: HeaderBaseOptions): Observable<AssetCharacteristic> {
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

