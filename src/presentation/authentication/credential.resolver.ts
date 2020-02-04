import { ApolloError } from "apollo-server-express";
import { map } from "rxjs/operators";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CredentialOrchestrator } from "../../application/service/authentication/credential/credential.orchestrator";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import { Confirmation } from "../../domain/model/authentication/confirmation";
import { RegisterRequest } from "../../domain/model/authentication/request/register.request";
import { AuthenticatedCredential } from "../../domain/model/authentication/authenticated.credential";
import { ChangePasswordRequest } from "../../domain/model/authentication/request/change.password.request";
import { HeaderBaseOptions } from "../../header.base.options";
import { IsValid } from "../../domain/model/is-valid";
import {Service} from "typedi";
import {CreatedCredential} from "../../domain/model/authentication/dto/created.credential";

@Service()
@Resolver()
export class CredentialResolver {
    private credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

    @Query(() => IsValid)
    async validateUsername(@Arg("username") username: string, @Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator.isValidUsername(username, headerOptions).pipe(
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
        return await this.credentialOrchestrator.isValidPassword(password, headerOptions).pipe(
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
    async register(@Arg("data") registerRequest: RegisterRequest, @Ctx("req") req: any): Promise<CreatedCredential> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        // remove in the future to front-end
        if (!registerRequest.organizationName) {
            registerRequest.organizationName = registerRequest.firstName;
        }
        return await this.credentialOrchestrator
            .addCredential(registerRequest, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => AuthenticatedCredential)
    async login(@Arg("username") username: string,
                @Arg("password") password: string,
                @Ctx("req") req: any): Promise<AuthenticatedCredential> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.credentialOrchestrator
            .authenticate({username, password}, headerOptions)
            .toPromise()
            .then(authenticatedCredential => {
                if (authenticatedCredential.sessionId) {
                    req.session.sessionId = authenticatedCredential.sessionId;
                }
                return authenticatedCredential;
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
