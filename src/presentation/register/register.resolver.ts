import { ApolloError } from "apollo-server-express";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import { HeaderBaseOptions } from "../../header.base.options";
import {Inject, Service} from "typedi";
import {RegisterOrchestrator} from "../../application/service/register/register.orchestrator";
import {RegisterCustomerRequest} from "../../domain/model/register/request/register.customer.request";
import {RegisterCustomerResponse} from "../../domain/model/register/dto/register.customer.response";

@Service()
@Resolver()
export class RegisterResolver {

    private registerOrchestrator: RegisterOrchestrator;

    constructor(@Inject() registerOrchestrator?: RegisterOrchestrator) {
        if (registerOrchestrator != null) {
            this.registerOrchestrator = registerOrchestrator;
        } else {
            this.registerOrchestrator = new RegisterOrchestrator();
        }

    }

    @Mutation(() => RegisterCustomerResponse)
    async register(@Arg("data") registerCustomerRequest: RegisterCustomerRequest, @Ctx("req") req: any)
    : Promise<RegisterCustomerResponse> {

        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);

        // remove in the future to front-end
        if (!registerCustomerRequest.organizationName) {
            registerCustomerRequest.organizationName = registerCustomerRequest.firstName;
        }

        return await this.registerOrchestrator
        .registerCustomer(registerCustomerRequest, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });

    }

}
