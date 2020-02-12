import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import { AssetTypeOrchestrator } from "../../application/service/asset/assettype/asset.type.orchestrator";
import { AssetType } from "../../domain/model/asset/asset.type";
import { HeaderBaseOptions } from "../../header.base.options";
import { AssetTypeRequest } from "../../domain/model/asset/request/asset.type.request";
import { ApolloError } from "apollo-server-errors";
// import { ERROR_CODE } from "../../domain/model/error/error.code";
import { AssetTypes } from "../../domain/model/asset/asset.types";
import { GetAssetTypesRequest } from "../../domain/model/asset/request/get.asset.types.request";
import {Paging} from "../../domain/model/page/paging";

@Resolver()
export class AssetTypeResolver {

    private assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();

    @Mutation( () => AssetType, {nullable: true})
    async addAssetTypeRoot(@Arg("data") assetTypeRequest: AssetTypeRequest,
                           @Ctx("req") req: any)
      : Promise<AssetType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator
        .addAssetType(assetTypeRequest, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);

            let errorCodeStr:string =  "400";
            if (error.code) { errorCodeStr = error.code as string }

            let message = "Bad Request";
            if (error.message) { message = error.message; }

            throw new ApolloError(message, errorCodeStr);
        });
    }

    @Mutation( () => AssetType, {nullable: true})
    async addAssetType(@Arg("data") assetTypeRequest: AssetTypeRequest,
                       @Ctx("req") req: any): Promise<AssetType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator
        .addAssetType(assetTypeRequest, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);

            let errorCodeStr:string =  "400";
            if (error.code) { errorCodeStr = error.code as string }

            let message = "Bad Request";
            if (error.message) { message = error.message; }

            throw new ApolloError(message, errorCodeStr);
        });
    }

    @Query( () => [AssetType], {nullable: true})
    async findAssetTypes(@Arg("q") q: string,
                        @Arg("pageNumber") pageNumber: number,
                        @Arg("pageSize") pageSize: number,
                        @Ctx("req") req: any): Promise<AssetType[]> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator
          .findAssetTypes(q, pageNumber, pageSize, headerOptions)
          .toPromise()
          .then(res => {
              if (res == null) {
                return new Array<AssetType>();
              } else if (res.length <= 0) {
                return new Array<AssetType>();
              } else {
                return res;
              }
          }, error => {
              console.log(error);

              let errorCodeStr:string =  "400";
              if (error.code) { errorCodeStr = error.code as string }

              let message = "Bad Request";
              if (error.message) { message = error.message; }

              throw new ApolloError(message, errorCodeStr);
          });
    }

    @Query( () => AssetType, {nullable: true})
    async getAssetTypeById(@Arg("assetTypeId", () => ID) assetTypeId: string,
                           @Ctx("req") req: any): Promise<AssetType> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetTypeOrchestrator
          .getAssetTypeById(assetTypeId, headerOptions)
          .toPromise()
          .then(res => {
              return res;
          }, error => {
              console.log(error);

              let errorCodeStr:string =  "400";
              if (error.code) { errorCodeStr = error.code as string }

              let message = "Bad Request";
              if (error.message) { message = error.message; }

              throw new ApolloError(message, errorCodeStr);
          });
    }

    @Query( () => [AssetType], {nullable: true})
    async getAssetTypes(@Arg("pageNumber") pageNumber: number,
                        @Arg("pageSize") pageSize: number,
                        @Ctx("req") req: any): Promise<AssetType[]> {

        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator
        .getAssetTypes(pageNumber, pageSize, headerOptions)
        .toPromise()
        .then(res => {
            if (res == null) {
                return new Array<AssetType>();
            } else if (res.length <= 0) {
                return new Array<AssetType>();
            } else {
                return res;
            }
        }, error => {
            console.log(error);

            let errorCodeStr:string =  "400";
            if (error.code) { errorCodeStr = error.code as string }

            let message = "Bad Request";
            if (error.message) { message = error.message; }

            throw new ApolloError(message, errorCodeStr);
        });
    }

    @Mutation( () => Boolean)
    async updateAssetType(@Arg("assetTypeId", () => ID) assetTypeId: string,
                          @Arg("assetType") assetTypeInput: AssetTypeRequest,
                          @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.assetTypeOrchestrator
        .updateAssetType(assetTypeId, assetTypeInput, headerOptions)
        .toPromise()
        .then(res => {
            return !!res;
        }, error => {
            console.log(error);

            let errorCodeStr:string =  "400";
            if (error.code) { errorCodeStr = error.code as string }

            let message = "Bad Request";
            if (error.message) { message = error.message; }

            throw new ApolloError(message, errorCodeStr);
        });
    }

    @Mutation( () => Boolean)
    async deleteAssetType(@Arg("assetTypeId", () => ID) assetTypeId: string,
                          @Arg("version") version: string,
                          @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.assetTypeOrchestrator
        .deleteAssetType(assetTypeId, version, headerOptions)
        .toPromise()
        .then(res => {
            return !!res;
        }, error => {
            console.log(error);

            let errorCodeStr:string =  "400";
            if (error.code) { errorCodeStr = error.code as string }

            let message = "Bad Request";
            if (error.message) { message = error.message; }

            throw new ApolloError(message, errorCodeStr);
        });
    }

}
