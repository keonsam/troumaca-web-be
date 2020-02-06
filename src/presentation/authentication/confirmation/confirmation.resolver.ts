import { ApolloError } from "apollo-server-express";
import { ConfirmationOrchestrator } from "../../../application/service/authentication/confirmation/confirmation.orchestrator";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { ConfirmationRequest } from "../../../domain/model/authentication/request/confirmation.request";
import { ERROR_CODE } from "../../../domain/model/error/error.code";
import { HeaderBaseOptions } from "../../../header.base.options";
import { IsValid } from "../../../domain/model/is-valid";

@Resolver()
export class ConfirmationResolver {

    private confirmationOrchestrator: ConfirmationOrchestrator;

    constructor(confirmationOrchestrator?: ConfirmationOrchestrator) {
        if (confirmationOrchestrator != null) {
            this.confirmationOrchestrator = confirmationOrchestrator;
        } else {
            this.confirmationOrchestrator = new ConfirmationOrchestrator();
        }
    }

    @Mutation(() => IsValid)
    async confirmation(@Arg("data") confirmationInput: ConfirmationRequest, @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.confirmationOrchestrator
            .confirmCode(confirmationInput, headerOptions)
            .toPromise()
            .then(res => {
                return new IsValid(!!res);
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => IsValid)
    async resendCode(@Arg("confirmationId", () => ID) confirmationId: string,
                     @Arg("credentialId", () => ID) credentialId: string,
                     @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.confirmationOrchestrator
            .resendConfirmCode(confirmationId, credentialId, headerOptions)
            .toPromise()
            .then( res => {
                return new IsValid(!!res.confirmationId);
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
