import { Ctx, Query } from "type-graphql";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetCharacteristicTypeOrchestrator } from "../../application/service/asset/characteristic/asset.characteristic.type.orchestrator";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import {CharacteristicTypes} from "../../domain/model/asset/characteristic.types";

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
