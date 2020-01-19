import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../error.code";
import {Paging} from "../paging";
import {AssetCategoryLegalValue} from "../../data/asset/asset.category.legal.value";
import {AssetCategoryLegalValues} from "../../data/asset/asset.category.legal.values";
import {AssetCategoryLegalValueInput} from "./dto/asset.category.legal.value.input";
import {AssetCategoryLegalValueOrchestrator} from "../../asset/asset-category-legal-value/asset.category.legal.value.orchestrator";

@Resolver()
export class AssetCategoryLegalValueResolver {
    private assetCategoryLegalValueOrchestrator: AssetCategoryLegalValueOrchestrator = new AssetCategoryLegalValueOrchestrator();

    @Mutation( () => AssetCategoryLegalValue)
    async addAssetCategoryLegalValue(@Arg("data") assetCategoryLegalValueInput: AssetCategoryLegalValueInput, @Ctx("req") req: any): Promise<AssetCategoryLegalValue> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const assetCategoryLegalValue = new AssetCategoryLegalValue(assetCategoryLegalValueInput.name, assetCategoryLegalValueInput.description);
        return await this.assetCategoryLegalValueOrchestrator.addAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetCategoryLegalValues)
    async getAssetCategoryLegalValues(@Arg("search", { nullable: true }) searchInfo: string,
                    @Arg("paging", () => Paging) paging: Paging,
                    @Ctx("req") req: any): Promise<AssetCategoryLegalValues> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetCategoryLegalValueOrchestrator.getAssetCategoryLegalValues(searchInfo, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => AssetCategoryLegalValue)
    async getAssetCategoryLegalValueById(@Arg("assetCategoryLegalValueId", () => ID) assetCategoryLegalValueId: string, @Ctx("req") req: any): Promise<AssetCategoryLegalValue> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetCategoryLegalValueOrchestrator.getAssetCategoryLegalValueById(assetCategoryLegalValueId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateAssetCategoryLegalValue(@Arg("assetCategoryLegalValueId", () => ID) assetCategoryLegalValueId: string,
                      @Arg("assetCategoryLegalValue") assetCategoryLegalValueInput: AssetCategoryLegalValueInput,
                      @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const assetCategoryLegalValue = new AssetCategoryLegalValue(assetCategoryLegalValueInput.name, assetCategoryLegalValueInput.description);
        assetCategoryLegalValue.assetCategoryLegalValueId = assetCategoryLegalValueId;
        return await this.assetCategoryLegalValueOrchestrator.updateAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteAssetCategoryLegalValue(@Arg("assetCategoryLegalValueId", () => ID) assetCategoryLegalValueId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetCategoryLegalValueOrchestrator.deleteAssetCategoryLegalValue(assetCategoryLegalValueId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
