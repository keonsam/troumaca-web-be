import { gql, ApolloError } from "apollo-server-express";
import { ConfirmationOrchestrator } from "../../authentication/credential/confirmation/confirmation.orchestrator";

const confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        confirmation(confirmationId: ID!, credentialId: ID!, code: String!): Confirmation
    }
    extend type Confirmation {
        code: String
        status: String
    }
`;

export const resolvers = {
    Mutation: {
        confirmation: async (_: any, {confirmationId, credentialId, code}: any) => {
            return await confirmationOrchestrator
                .confirmCode(confirmationId, credentialId, code)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
    }
};
