import { gql} from "apollo-server-express";
import { UserOrchestrator } from "../party/user/user.orchestrator";

const userOrchestrator: UserOrchestrator = new UserOrchestrator();

export const typeDef = gql`
    extend type Query {
        me: Person
    }
    type Person {
        firstName: String
        lastName: String
    }
`;

export const resolvers = {
    Query: {
        me: async (_: any, __: any, {req}: any) => {
            console.log(req.session.partyId);
            return await userOrchestrator.getUser(req.session.partyId).toPromise();
        },
    }
};
