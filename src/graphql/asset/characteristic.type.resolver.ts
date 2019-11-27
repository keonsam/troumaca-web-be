import { Ctx, Query } from "type-graphql";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicTypeOrchestrator } from "../../asset/asset-characteristic-type/asset.characteristic.type.orchestrator";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import {CharacteristicTypes} from "../../data/asset/characteristic.types";

export class CharacteristicTypeResolver {
    private assetCharacteristicTypeOrchestrator: AssetCharacteristicTypeOrchestrator = new AssetCharacteristicTypeOrchestrator();

    @Query( () => CharacteristicTypes)
    async getCharacteristicTypes(@Ctx("req") req?: any): Promise<CharacteristicTypes> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetCharacteristicTypeOrchestrator.getCharacteristicTypes(headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });

    }
}
