import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../error.code";
import {Paging} from "../paging";
import {BrandOrchestrator} from "../../asset/brand/brand.orchestrator";
import {Brand} from "../../data/asset/brand";
import {BrandInput} from "./dto/brand.input";
import {Brands} from "../../data/asset/brands";

@Resolver()
export class BrandResolver {
    private brandOrchestrator: BrandOrchestrator = new BrandOrchestrator();

    @Mutation( () => Brand)
    async addBrand(@Arg("data") brandInput: BrandInput, @Ctx("req") req: any): Promise<Brand> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const brand = new Brand(brandInput.name, brandInput.description);
        return await this.brandOrchestrator.saveBrand(brand, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Brands)
    async getBrands(@Arg("search", { nullable: true }) searchInfo: string,
                            @Arg("paging", () => Paging) paging: Paging,
                            @Ctx("req") req: any): Promise<Brands> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.brandOrchestrator.getBrands(searchInfo, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Brand)
    async getBrandById(@Arg("brandId", () => ID) brandId: string, @Ctx("req") req: any): Promise<Brand> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.brandOrchestrator.getBrandById(brandId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateBrand(@Arg("brandId", () => ID) brandId: string,
                              @Arg("brand") brandInput: BrandInput,
                              @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const brand = new Brand(brandInput.name, brandInput.description);
        return await this.brandOrchestrator.updateBrand(brandId, brand, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteBrand(@Arg("brandId", () => ID) brandId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.brandOrchestrator.deleteBrand(brandId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
