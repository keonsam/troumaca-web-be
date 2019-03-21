import { gql} from "apollo-server-express";
import { CredentialOrchestrator } from "../authentication/credential/credential.orchestrator";
import { map } from "rxjs/operators";
import { Credential } from "../data/authentication/credential";
import { Person } from "../data/party/person";
import { ConfirmationOrchestrator } from "../authentication/credential/confirmation/confirmation.orchestrator";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();
const confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();

export const typeDef = gql`
    type Mutation {
        validateUsername(username: String!): ValidRes
        validatePassword(password: String!): ValidRes
        register(username: String!, password: String!, firstName: String!, lastName: String!): Confirmation
        confirmation(confirmationId: ID!, credentialId: ID!, code: String!): Confirmation
        login(username: String!, password: String!): Authenticate
#        forgetPassword(username: String!): Confirmation
#        changePassword(password: String!, confirmationId: String!, code: String!): Boolean
  }
    type ValidRes {
        valid: Boolean
    }
    type Confirmation {
        confirmationId: ID
        credentialId: ID
        status: String
    }
    type Authenticate {
        authenticateStatus: String!
    }
#    type Credential {
#        ownerPartyId: ID
#        partyId: ID
#        credentialId: ID
#        username: String
#        password: String
#        status: String
#  }
`;


// organizationProfile(partyId: Int!): OrganizationProfile

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
        confirmation: async (_: any, {confirmationId, credentialId, code}: any) => {
            return await confirmationOrchestrator.confirmCode(confirmationId, credentialId, code).toPromise();
        },
        login: async (_: any, {username, password}: any, {req}: any) => {
            const auth = await credentialOrchestrator.authenticate(new Credential(username, password)).pipe().toPromise();
            if (auth && auth.partyId) {
                req.session.partyId = auth.partyId;
            }
            return auth;
        }
    }
};
