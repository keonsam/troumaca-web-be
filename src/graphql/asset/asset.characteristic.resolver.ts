import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AssetCharacteristicOrchestrator } from "../../asset/asset-characteristic/asset.characteristic.orchestrator";
import { AssetCharacteristic } from "../../data/asset/asset.characteristic";
import { ConfirmationInput } from "../authentication/dto/confirmation.input";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicInput } from "./dto/asset.characteristic.input";
import { map } from "rxjs/operators";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { AssetCharacteristics } from "../../data/asset/asset.characteristics";

@Resolver()
export class AssetCharacteristicResolver {
    private assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();

    @Mutation( () => AssetCharacteristic)
    async addAssetCharacteristic(@Arg("data") assetCharacteristicInput: AssetCharacteristicInput, @Ctx("req") req: any): Promise<AssetCharacteristic> {
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
    async getAssetCharacteristics(@Ctx("req") req: any): Promise<AssetCharacteristics> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCharacteristicOrchestrator.getAssetCharacteristics(undefined, undefined, undefined, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

}
