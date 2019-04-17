import { gql, ApolloError } from "apollo-server-express";
import { HeaderBaseOptions } from "../../header.base.options";
import { AccessRoleOrchestrator } from "../../authorization/access-role/access.role.orchestrator";

export const typeDef = gql`
    extend type Query {
        findAccessRoles(searchStr: String!, pageSize: Int!): [AccessRole] @requireAuth
    }
    type AccessRole {
        name: String
        accessRoleId: ID
        description: String
    }
`;

const accessRoleOrchestrator: AccessRoleOrchestrator = new AccessRoleOrchestrator();
const errorCode = "500";

export const resolvers = {
    Query: {
        findAccessRoles: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await accessRoleOrchestrator
                .findAccessRoles(searchStr, pageSize, headerOptions)
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
