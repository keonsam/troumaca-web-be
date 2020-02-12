import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import { AssetOrchestrator } from "../../application/service/asset/asset.orchestrator";
import { Asset } from "../../domain/model/asset/asset";
import { AssetRequest } from "../../domain/model/asset/request/asset.request";
import { HeaderBaseOptions } from "../../header.base.options";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import { Assets } from "../../domain/model/asset/assets";
import {Paging} from "../../domain/model/page/paging";

@Resolver()
export class AssetResolver {

    private assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();

    @Mutation( () => Asset)
    async addAsset(@Arg("data") assetRequest: AssetRequest,
                   @Ctx("req") req: any
    ): Promise<Asset> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator
        .addAsset(assetRequest, headerOptions)
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
                    @Ctx("req") req: any
    ): Promise<Assets> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator
        .getAssets(search, paging.pageNumber, paging.pageSize, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });
    }

    @Query( () => Asset)
    async getAssetById(@Arg("assetId", () => ID) assetId: string,
                       @Arg("version") version: string,
                       @Ctx("req") req: any
    ): Promise<Asset> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator
        .getAssetById(assetId, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });
    }

    @Mutation( () => Boolean)
    async deleteAsset(@Arg("assetId", () => ID) assetId: string,
                      @Ctx("req") req: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator
        .deleteAsset(assetId, headerOptions)
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
        @Arg("asset", ) assetRequest: AssetRequest,
        @Ctx("req") req: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetOrchestrator
        .updateAsset(assetId, assetRequest, headerOptions)
        .toPromise()
        .then(res => {
            return !!res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });
    }
}
