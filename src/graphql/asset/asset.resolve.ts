import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AssetOrchestrator } from "../../asset/asset.orchestrator";
import { Asset } from "../../data/asset/asset";
import { AssetTypeInput } from "./dto/asset.type.input";
import { AssetInput } from "./dto/asset.input";
import { HeaderBaseOptions } from "../../header.base.options";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { Assets } from "../../data/asset/assets";

@Resolver()
export class AssetResolve {
    private assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();

    @Mutation( () => Asset)
    async addAsset(@Arg("data") assetInput: AssetInput, @Ctx("req") req: any): Promise<Asset> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.addAsset(assetInput, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Assets)
    async getAssets(@Arg("search", { nullable: true }) search: string, @Ctx("req") req: any): Promise<Assets> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.getAssets(search, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
