import {Arg, Ctx, Query, Resolver} from "type-graphql";
import {SiteOrchestrator} from "../../site/site.orchestrator";
import {Sites} from "../../data/site/sites";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../error.code";

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
}
