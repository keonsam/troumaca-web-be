import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AssetCharacteristicOrchestrator } from "../../application/service/asset/characteristic/asset.characteristic.orchestrator";
import { AssetCharacteristic } from "../../domain/model/asset/asset.characteristic";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicRequest } from "../../domain/model/asset/request/asset.characteristic.request";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import { AssetCharacteristics } from "../../domain/model/asset/asset.characteristics";
import { GetCharacteristicsRequest } from "../../domain/model/asset/request/get.characteristics.request";
import {Paging} from "../../domain/model/page/paging";

@Resolver()
export class AssetCharacteristicResolver {
    private assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();

    @Mutation( () => AssetCharacteristic)
    async addAssetCharacteristic(@Arg("data") assetCharacteristicInput: AssetCharacteristicRequest, @Ctx("req") req: any): Promise<AssetCharacteristic> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCharacteristicOrchestrator.saveAssetCharacteristic(assetCharacteristicInput, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetCharacteristics)
    async getAssetCharacteristics(@Arg("data") searchInfo: GetCharacteristicsRequest,
                                  @Arg("paging", () => Paging) paging: Paging,
                                  @Ctx("req") req?: any): Promise<AssetCharacteristics> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCharacteristicOrchestrator.getAssetCharacteristics(searchInfo.tab, searchInfo.search, searchInfo.selected, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetCharacteristic)
    async getAssetCharacteristicById(@Arg("assetCharacteristicId") assetCharacteristicId: string,
                                     @Ctx("req") req: any): Promise<AssetCharacteristic> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCharacteristicOrchestrator
            .getAssetCharacteristicById(assetCharacteristicId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateAssetCharacteristic(@Arg("assetCharacteristicId") assetCharacteristicId: string,
                                    @Arg("assetCharacteristic") assetCharacteristicInput: AssetCharacteristicRequest,
                                    @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const assetCharacteristic: AssetCharacteristic = new AssetCharacteristic();
        Object.assign(assetCharacteristic, assetCharacteristicInput);
        return await this.assetCharacteristicOrchestrator.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteAssetCharacteristic(@Arg("assetCharacteristicId") assetCharacteristicId: string,
                                    @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCharacteristicOrchestrator.deleteAssetCharacteristic(assetCharacteristicId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

}
