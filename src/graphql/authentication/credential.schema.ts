import { gql, ApolloError } from "apollo-server-express";
import { CredentialOrchestrator } from "../../authentication/credential/credential.orchestrator";
import { map } from "rxjs/operators";
import { Credential } from "../../data/authentication/credential";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        validateUsername(username: String!): ValidRes
        validatePassword(password: String!): ValidRes
        register(username: String!, companyName: String, accountType: String!, usernameType: String!, password: String!, confirmedPassword: String!): Confirmation
        login(username: String!, password: String!): Authenticate
  }
    type ValidRes {
        valid: Boolean
    }
    type Confirmation {
        confirmationId: ID
        credentialId: ID
    }
    type Authenticate {
        authenticateStatus: String!
    }
`;

export const resolvers = {
    Mutation: {
        validateUsername: async (_: any, {username}: any) => {
            return await credentialOrchestrator.isValidUsername(username).pipe(
                map( value => {
                    return {valid : value};
                    }))
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        validatePassword: async (_: any, {password}: any) => {
            return await credentialOrchestrator.isValidPassword(password).pipe(
                map( value => {
                    return {valid : value};
                }))
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        register: async (_: any, {username, companyName, accountType, usernameType,  password, confirmedPassword }: any) => {
            return await credentialOrchestrator
                .addCredential(new Credential(username, companyName, accountType, usernameType, password, confirmedPassword))
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        login: async (_: any, {username, password}: any, {req}: any) => {
            return await credentialOrchestrator.
            authenticate({username, password}).
            toPromise()
                .then( auth => {
                    if (auth && auth.sessionId) {
                        req.session.sessionId = auth.sessionId;
                    }
                    return auth;
                }, error => {
                    throw new ApolloError(error, "404");
                });
        }
    }
};
