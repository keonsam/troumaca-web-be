import { gql, ApolloError } from "apollo-server-express";
import { HeaderBaseOptions } from "../../header.base.options";
import { UserOrchestrator } from "../../party/user/user.orchestrator";

export const typeDef = gql`
    extend type Mutation {
        updateUser(user: UserInput!, credential: CredentialInput!): Int @requireAuth
    }
    extend type Query {
        getUser: User @requireAuth
    }
    type User {
        firstName: String
        middleName: String
        lastName: String
        username: String
        version: String
    }
    input UserInput {
        firstName: String!
        middleName: String
        lastName: String!
        version: String!
    }
`;

const userOrchestrator: UserOrchestrator = new UserOrchestrator();
const errorCode = "500";

export const resolvers = {
    Mutation: {
        updateUser: async (_: any, {user, credential}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await userOrchestrator
                .updateUserMe(user, credential, headerOptions)
                .toPromise()
                .then(res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
    },
    Query: {
        getUser: async (_: any, __: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await userOrchestrator
                .getUserMe(headerOptions)
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
