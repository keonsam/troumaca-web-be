import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import { AssetTypeOrchestrator } from "../../asset/asset-type/asset.type.orchestrator";
import { AssetType } from "../../data/asset/asset.type";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetTypeRequest } from "./dto/asset.type.request";
import { ApolloError } from "apollo-server-errors";
import { ERROR_CODE } from "../error.code";
import { AssetTypes } from "../../data/asset/asset.types";
import { GetAssetTypesRequest } from "./dto/get.asset.types.request";
import {Paging} from "../paging";

@Resolver()
export class AssetTypeResolver {
    private assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();

    @Mutation( () => AssetType)
    async addAssetType(@Arg("data") assetTypeInput: AssetTypeRequest, @Ctx("req") req: any): Promise<AssetType> {
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
    async getAssetTypes(@Arg("search", () => GetAssetTypesRequest) searchInfo: GetAssetTypesRequest,
                        @Arg("paging", () => Paging) paging: Paging,
                        @Ctx("req") req: any): Promise<AssetTypes> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator.getAssetTypes(searchInfo.tab, searchInfo.type, searchInfo.search, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetType)
    async getAssetTypeById(@Arg("assetTypeId", () => ID) assetTypeId: string, @Ctx("req") req: any): Promise<AssetType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetTypeOrchestrator.getAssetTypeById(assetTypeId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateAssetType(@Arg("assetTypeId", () => ID) assetTypeId: string,
                          @Arg("assetType") assetTypeInput: AssetTypeRequest,
                          @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator.updateAssetType(assetTypeId, assetTypeInput, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteAssetType(@Arg("assetTypeId", () => ID) assetTypeId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetTypeOrchestrator.deleteAssetType(assetTypeId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
