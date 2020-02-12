import { ApolloError } from "apollo-server-express";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginOrchestrator } from "../../application/service/login/login.orchestrator";
import { ERROR_CODE } from "../../domain/model/error/error.code";
import { AuthenticatedCredential } from "../../domain/model/authentication/authenticated.credential";
import { HeaderBaseOptions } from "../../header.base.options";
import {Service} from "typedi";

@Service()
@Resolver()
export class LoginResolver {

    private loginOrchestrator: LoginOrchestrator;

    constructor(loginOrchestrator?: LoginOrchestrator) {
        if (loginOrchestrator != null) {
            this.loginOrchestrator = loginOrchestrator;
        } else {
            this.loginOrchestrator = new LoginOrchestrator();
        }
    }

    @Mutation(() => AuthenticatedCredential)
    async login(@Arg("username") username: string,
                @Arg("password") password: string,
                @Ctx("req") req: any): Promise<AuthenticatedCredential> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.loginOrchestrator
        .authenticate(username, password, headerOptions)
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

}
