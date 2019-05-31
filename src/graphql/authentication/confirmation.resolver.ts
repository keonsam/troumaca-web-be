import { ApolloError } from "apollo-server-express";
import { ConfirmationOrchestrator } from "../../authentication/credential/confirmation/confirmation.orchestrator";
import { Arg, Args, ID, Mutation, Resolver } from "type-graphql";
import { Confirmation } from "../../data/authentication/confirmation";
import { ConfirmationInput } from "./dto/confirmation.input";
import { ERROR_CODE } from "../error.code";

@Resolver()
export class ConfirmationResolver {
    private confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();

    @Mutation(() => Confirmation)
    async confirmation(@Arg("data") confirmationInput: ConfirmationInput) {
        return await this.confirmationOrchestrator
            .confirmCode(confirmationInput)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => Confirmation)
    async resendCode(@Arg("confirmationId", () => ID) confirmationId: string,
                     @Arg("credentialId", () => ID) credentialId: string) {
        return await this.confirmationOrchestrator
            .resendConfirmCode(confirmationId, credentialId)
            .toPromise()
            .then( res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
