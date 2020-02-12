import { ApolloError } from "apollo-server-express";
import { map } from "rxjs/operators";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CredentialOrchestrator } from "../../../application/service/authentication/credential/credential.orchestrator";
import { ERROR_CODE } from "../../../domain/model/error/error.code";
import { Confirmation } from "../../../domain/model/authentication/confirmation";
import { ChangePasswordRequest } from "../../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../../header.base.options";
import { IsValid } from "../../../domain/model/is-valid";
import {Service} from "typedi";

@Service()
@Resolver()
export class CredentialResolver {

    private credentialOrchestrator: CredentialOrchestrator;

    constructor(credentialOrchestrator?: CredentialOrchestrator) {
        if (credentialOrchestrator != null) {
            this.credentialOrchestrator = credentialOrchestrator;
        } else {
            this.credentialOrchestrator = new CredentialOrchestrator();
        }
    }

    @Query(() => IsValid)
    async validateUsername(@Arg("username") username: string, @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator
        .isValidUsername(username, headerOptions).pipe(
        map(value => {
            return new IsValid(value);
        }))
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });
    }

    @Query(() => IsValid)
    async validatePassword(@Arg("password") password: string, @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator
        .isValidPassword(password, headerOptions).pipe(
        map(value => {
            return new IsValid(value);
        }))
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            console.log(error);
            throw new ApolloError(error, ERROR_CODE);
        });
    }

    @Mutation(() => Confirmation)
    async forgetPassword(@Arg("username") username: string, @Ctx("req") req: any): Promise<Confirmation> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator
        .forgetPassword(username, headerOptions)
        .toPromise()
        .then(res => {
            return res;
        }, error => {
            throw new ApolloError(error, ERROR_CODE);
        });
    }

    @Mutation(() => IsValid)
    async changePassword(@Arg("data") changePasswordRequest: ChangePasswordRequest, @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator
        .changePassword(changePasswordRequest, headerOptions)
        .toPromise()
        .then(res => {
            return new IsValid(res);
        }, error => {
            throw new ApolloError(error, ERROR_CODE);
        });
    }
}
