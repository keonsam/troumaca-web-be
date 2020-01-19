import {Arg, Ctx, ID, Mutation, Query, Resolver} from "type-graphql";
import {SiteOrchestrator} from "../../site/site.orchestrator";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../error.code";
import {Paging} from "../paging";
import {Sites} from "../../data/site/sites";
import {Site} from "../../data/site/site";
import {SiteInput} from "./dto/site.input";

@Resolver()
export class SiteResolver {
    private siteOrchestrator: SiteOrchestrator = new SiteOrchestrator();

    @Query( () => Sites)
    async findSites(@Arg("searchStr", { nullable: true }) searchStr?: string,
                   @Ctx("req") req?: any): Promise<Sites> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.siteOrchestrator.findSite(searchStr, headerOptions)
            .toPromise()
            .then(res => {
                return new Sites(res);
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Site)
    async addSite(@Arg("data") siteInput: SiteInput, @Ctx("req") req: any): Promise<Site> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const site = new Site(siteInput.name, siteInput.description);
        return await this.siteOrchestrator.saveSite(site, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Sites)
    async getSites(@Arg("search", { nullable: true }) searchInfo: string,
                    @Arg("paging", () => Paging) paging: Paging,
                    @Ctx("req") req: any): Promise<Sites> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.siteOrchestrator.getSites(searchInfo, paging.pageNumber, paging.pageSize, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Query( () => Site)
    async getSiteById(@Arg("siteId", () => ID) siteId: string, @Ctx("req") req: any): Promise<Site> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.siteOrchestrator.getSiteById(siteId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async updateSite(@Arg("siteId", () => ID) siteId: string,
                      @Arg("site") siteInput: SiteInput,
                      @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const site = new Site(siteInput.name, siteInput.description);
        return await this.siteOrchestrator.updateSite(siteId, site, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation( () => Boolean)
    async deleteSite(@Arg("siteId", () => ID) siteId: string, @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return this.siteOrchestrator.deleteSite(siteId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
