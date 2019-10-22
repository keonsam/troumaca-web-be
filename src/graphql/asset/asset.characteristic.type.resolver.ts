import { Ctx, Query } from "type-graphql";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicTypeOrchestrator } from "../../asset/asset-characteristic-type/asset.characteristic.type.orchestrator";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { AssetCharacteristicTypes } from "../../data/asset/asset.characteristic.types";

export class AssetCharacteristicTypeResolver {
    private assetCharacteristicTypeOrchestrator: AssetCharacteristicTypeOrchestrator = new AssetCharacteristicTypeOrchestrator();
    @Query( () => AssetCharacteristicTypes)
    async getAssetCharacteristicTypes(@Ctx("req") req?: any): Promise<AssetCharacteristicTypes> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetCharacteristicTypeOrchestrator.getAssetCharacteristicTypes(headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });

    }
}
