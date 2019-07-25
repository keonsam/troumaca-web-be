import { ApolloError } from "apollo-server-express";
import { ConfirmationOrchestrator } from "../../authentication/credential/confirmation/confirmation.orchestrator";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import { Confirmation } from "../../data/authentication/confirmation";
import { ConfirmationInput } from "./dto/confirmation.input";
import { ERROR_CODE } from "../error.code";
import { HeaderBaseOptions } from "../../header.base.options";
import { IsValid } from "../../data/isValid";

@Resolver()
export class ConfirmationResolver {
    private confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();

    @Mutation(() => IsValid)
    async confirmation(@Arg("data") confirmationInput: ConfirmationInput, @Ctx("req") req: any): Promise<IsValid> {
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
