import { gql, ApolloError } from "apollo-server-express";
import { SessionOrchestrator } from "../../session/session.orchestrator";
import { Ctx, Query, Resolver } from "type-graphql";
import { IsValid } from "../../data/isValid";
import { HeaderBaseOptions } from "../../header.base.options";
import { map } from "rxjs/operators";
import { ERROR_CODE } from "../error.code";

export const typeDef = gql`
    extend type Query {
        isValidSession: ValidSession
    }
    type ValidSession {
        valid: Boolean
        partyId: String
        ownerPartyId: String
    }
`;

const sessionOrchestrator: SessionOrchestrator = new SessionOrchestrator();
const errorCode = "500";

export const resolvers = {
    Query: {
        isValidSession: async (_: any, __: any, {req}: any) => {
            return await sessionOrchestrator
                .isValidSession(req.session.sessionId)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
    }
};

@Resolver()
export class SessionResolver {
    private sessionOrchestrator: SessionOrchestrator = new SessionOrchestrator();

    @Query(() => IsValid)
    async isValidSession(@Ctx("req") req: any): Promise<IsValid> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.sessionOrchestrator
            .isValidSession(req.session.sessionId, headerOptions).pipe(
                map(value => {
                    return new IsValid(value.valid);
                }))
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
