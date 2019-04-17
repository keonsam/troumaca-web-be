import { gql, ApolloError } from "apollo-server-express";
import { SessionOrchestrator } from "../../session/session.orchestrator";

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
