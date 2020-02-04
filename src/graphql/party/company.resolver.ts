import {Arg, Ctx, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Organization} from "../../data/party/organization";
import {OrganizationOrchestrator} from "../../party/organization/organization.orchestrator";
import {HeaderBaseOptions} from "../../header.base.options";
import {map} from "rxjs/operators";
import {ApolloError} from "apollo-server-express";
import {ERROR_CODE} from "../error.code";
import {isAuth} from "../../middleware/isAuth";
import {UpdateCompanyInput} from "./dto/update.company.input";

@Resolver()
export class CompanyResolver {

    private companyOrchestrator: OrganizationOrchestrator = new OrganizationOrchestrator();

    @UseMiddleware(isAuth)
    @Query( () => Organization)
    async getCompany(@Ctx("req") req: any): Promise<Organization> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.companyOrchestrator.getOrganization(headerOptions).pipe(
            map(value => {
                return value;
            }))
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Mutation( () => Boolean)
    async updateCompany(
        @Arg("company", () => UpdateCompanyInput) data: UpdateCompanyInput,
        @Ctx("req") req: any): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const company: Organization = new Organization();
        Object.assign(company, data);
        return await this.companyOrchestrator.updateOrganization(company, headerOptions).pipe(
            map(value => {
                return value;
            }))
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
