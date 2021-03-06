import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../../domain/model/error/error.code";
import {Paging} from "../../domain/model/page/paging";
import {AssetRoleTypeOrchestrator} from "../../application/service/asset/role/asset.role.type.orchestrator";
import {AssetRoleType} from "../../domain/model/asset/asset.role.type";
import {AssetRoleTypeRequest} from "../../domain/model/asset/request/asset.role.type.request";
import {AssetRoleTypes} from "../../domain/model/asset/asset.role.types";

@Resolver()
export class AssetRoleTypeResolver {
    private assetRoleTypeOrchestrator: AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

    @Mutation( () => AssetRoleType)
    async addAssetRoleType(@Arg("data") assetRoleTypeInput: AssetRoleTypeRequest, @Ctx("req") req: any): Promise<AssetRoleType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const assetRoleType = new AssetRoleType(assetRoleTypeInput.name);
        return await this.assetRoleTypeOrchestrator.saveAssetRoleType(assetRoleType, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetRoleTypes)
    async getAssetRoleTypes(@Arg("search", { nullable: true }) searchInfo: string,
                        @Arg("paging", () => Paging) paging: Paging,
                        @Ctx("req") req: any): Promise<AssetRoleTypes> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetRoleTypeOrchestrator.getAssetRoleTypes(searchInfo, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetRoleType)
    async getAssetRoleTypeById(@Arg("assetRoleTypeId", () => ID) assetRoleTypeId: string, @Ctx("req") req: any): Promise<AssetRoleType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetRoleTypeOrchestrator.getAssetRoleTypeById(assetRoleTypeId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateAssetRoleType(@Arg("assetRoleTypeId", () => ID) assetRoleTypeId: string,
                          @Arg("assetRoleType") assetRoleTypeInput: AssetRoleTypeRequest,
                          @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const assetRoleType = new AssetRoleType(assetRoleTypeInput.name);
        return await this.assetRoleTypeOrchestrator.updateAssetRoleType(assetRoleTypeId, assetRoleType, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteAssetRoleType(@Arg("assetRoleTypeId", () => ID) assetRoleTypeId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetRoleTypeOrchestrator.deleteAssetRoleType(assetRoleTypeId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
