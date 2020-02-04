import { gql, ApolloError } from "apollo-server-express";
import { HeaderBaseOptions } from "../../header.base.options";
import { OrganizationOrchestrator } from "../../party/organization/organization.orchestrator";


export const typeDef = gql`
    extend type Mutation {
        addCompany(company: CompanyInput!): Company @requireAuth
        updateCompany(company: CompanyInput!): Int @requireAuth
    }
    extend type Query {
        getCompany: Company @requireAuth
    }
    type Company {
        partyId: ID
        name: String
        purpose: String
        version: String
    }
    input CompanyInput {
        name: String!
        purpose: String!
        version: String!
    }
`;

const organizationOrchestrator: OrganizationOrchestrator = new OrganizationOrchestrator();
const errorCode = "500";

export const resolvers = {
    Mutation: {
        addCompany: async (_: any, {company}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await organizationOrchestrator
                .saveOrganization(company, headerOptions)
                .toPromise()
                .then(res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
        updateCompany: async (_: any, {company}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await organizationOrchestrator
                .updateOrganization(company, headerOptions)
                .toPromise()
                .then(res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        }
    },
    Query: {
        getCompany: async (_: any, __: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await organizationOrchestrator
                .getOrganization(headerOptions)
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
