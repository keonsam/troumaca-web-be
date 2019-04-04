import { gql} from "apollo-server-express";
import { HeaderBaseOptions } from "../../header.base.options";
import { OrganizationOrchestrator } from "../../party/organization/organization.orchestrator";

const organizationOrchestrator: OrganizationOrchestrator = new OrganizationOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addCompany(company: CompanyInput): Company @requireAuth
    }
    type Company {
        partyId: ID
        name: String
        purpose: String
    }
    input CompanyInput {
        name: String!
        purpose: String!
    }
`;

export const resolvers = {
    Mutation: {
        addCompany: async (_: any, {company}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await organizationOrchestrator.saveOrganization(company, headerOptions).toPromise();
        }
    },
};
