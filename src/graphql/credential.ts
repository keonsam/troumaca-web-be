import { gql} from "apollo-server-express";
import { CredentialOrchestrator } from "../authentication/credential/credential.orchestrator";
import { map } from "rxjs/operators";
import { Credential } from "../data/authentication/credential";
import { Person } from "../data/party/person";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        validateUsername(username: String!): ValidRes
        validatePassword(password: String!): ValidRes
        register(username: String!, password: String!, firstName: String!, lastName: String!): Confirmation
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
                .toPromise();
        },
        validatePassword: async (_: any, {password}: any) => {
            return await credentialOrchestrator.isValidPassword(password).pipe(
                map( value => {
                    return {valid : value};
                }))
                .toPromise();
        },
        register: async (_: any, {username, password, firstName, lastName}: any) => {
            return await credentialOrchestrator.addCredential(new Credential(username, password), new Person(firstName, lastName)).toPromise();
        },
        login: async (_: any, {username, password}: any, {req}: any) => {
            const auth = await credentialOrchestrator.authenticate(new Credential(username, password)).toPromise();
            if (auth && auth.sessionId) {
                req.session.sessionId = auth.sessionId;
            }
            return auth;
        }
    }
};
