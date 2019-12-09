import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AssetTypeOrchestrator } from "../../asset/asset-type/asset.type.orchestrator";
import { AssetType } from "../../data/asset/asset.type";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetTypeInput } from "./dto/asset.type.input";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { AssetTypes } from "../../data/asset/asset.types";
import { GetAssetTypesInput } from "./dto/get.asset.types.input";

@Resolver()
export class AssetTypeResolver {
    private assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();

    @Mutation( () => AssetType)
    async addAssetType(@Arg("data") assetTypeInput: AssetTypeInput, @Ctx("req") req: any): Promise<AssetType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator.addAssetType(assetTypeInput, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetTypes)
    async getAssetTypes(@Arg("data") searchInfo: GetAssetTypesInput, @Ctx("req") req: any): Promise<AssetTypes> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator.getAssetTypes(searchInfo.tab, searchInfo.search, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
