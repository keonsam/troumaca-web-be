import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AssetCharacteristicOrchestrator } from "../../asset/asset-characteristic/asset.characteristic.orchestrator";
import { AssetCharacteristic } from "../../data/asset/asset.characteristic";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicRequest } from "./dto/asset.characteristic.request";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";
import { GetCharacteristicsRequest } from "./dto/get.characteristics.request";
import {Paging} from "../paging";

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
