import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import { AssetOrchestrator } from "../../asset/asset.orchestrator";
import { Asset } from "../../data/asset/asset";
import { AssetInput } from "./dto/asset.input";
import { HeaderBaseOptions } from "../../header.base.options";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { Assets } from "../../data/asset/assets";
import {Paging} from "../paging";

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
    async getAssets(@Arg("search", { nullable: true }) search: string,
                    @Arg("paging", () => Paging) paging: Paging,
                    @Ctx("req") req: any): Promise<Assets> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.getAssets(search, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Asset)
    async getAssetById(@Arg("assetId", () => ID) assetId: string, @Ctx("req") req: any): Promise<Asset> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.getAssetById(assetId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteAsset(@Arg("assetId", () => ID) assetId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.deleteAsset(assetId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateAsset(
        @Arg("assetId", () => ID) assetId: string,
        @Arg("asset", ) assetInput: AssetInput,
        @Ctx("req") req: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator.updateAsset(assetId, assetInput, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
