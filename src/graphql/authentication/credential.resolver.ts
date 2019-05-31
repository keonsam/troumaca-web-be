import { ApolloError } from "apollo-server-express";
import { map } from "rxjs/operators";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CredentialOrchestrator } from "../../authentication/credential/credential.orchestrator";
import { ERROR_CODE } from "../error.code";
import { Confirmation } from "../../data/authentication/confirmation";
import { RegisterInput } from "./dto/register.input";
import { AuthenticatedCredential } from "../../data/authentication/authenticated.credential";
import { ChangePasswordInput } from "./dto/change.password.input";

@Resolver()
export class CredentialResolver {
    private credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

    @Query(() => Boolean)
    async validateUsername(@Arg("username") username: string) {
        return await this.credentialOrchestrator.isValidUsername(username).pipe(
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

    @Query(() => Boolean)
    async validatePassword(@Arg("password") password: string) {
        return await this.credentialOrchestrator.isValidPassword(password).pipe(
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

    @Mutation(() => Confirmation)
    async register(@Arg("data") registerInput: RegisterInput) {
        return await this.credentialOrchestrator
            .addCredential(registerInput)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => AuthenticatedCredential)
    async login(@Arg("username") username: string, @Arg("password") password: string, @Ctx("req") req: any) {
        return await this.credentialOrchestrator
            .authenticate({username, password})
            .toPromise()
            .then(auth => {
                if (auth && auth.sessionId) {
                    req.session.sessionId = auth.sessionId;
                }
                return auth;
            }, error => {
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => Confirmation)
    async forgetPassword(@Arg("username") username: string) {
        return await this.credentialOrchestrator
            .forgetPassword(username)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @Mutation(() => Boolean)
    async changePassword(@Arg("data") changePasswordInput: ChangePasswordInput) {
        return await this.credentialOrchestrator
            .changePassword(changePasswordInput)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                throw new ApolloError(error, "404");
            });
    }
}
