import { gql, ApolloError } from "apollo-server-express";
import { getNumericValueOrDefault} from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { HeaderBaseOptions } from "../../header.base.options";
import { PersonOrchestrator } from "../../party/person/person.orchestrator";

export const typeDef = gql`
    extend type Mutation {
        addPerson(person: PersonInput!, credential: CredentialInput, partyAccessRoles: PartyAccessRoleInput): Person @requireAuth
        updatePerson(partyId: ID!, person: PersonInput!, credential: CredentialInput, partyAccessRoles: PartyAccessRoleInput): Int @requireAuth
        deletePerson(partyId: ID!): Int @requireAuth
    }
    extend type Query {
        getPerson(partyId: ID!): Person @requireAuth
        getPersons(pageNumber: Int!, pageSize: Int!, sortOrder: String!): Persons @requireAuth
        findPeople(searchStr: String!, pageSize: Int!): [Person] @requireAuth
    }
    type Person {
        partyId: ID
        firstName: String!
        middleName: String
        lastName: String!
        username: String
        version: String!
        partyAccessRoles: PartyAccessRole
    }
    type PartyAccessRole {
        accessRoleId: String
        accessRole: AccessRole
    }
    type Persons {
        persons: [Person]
        page: Page
    }
    input PersonInput {
        firstName: String!
        middleName: String
        lastName: String!
        version: String!
    }
    input PartyAccessRoleInput {
        accessRoleId: String,
        version: String
    }
    input CredentialInput {
        username: String,
        password: String,
        version: String
    }
`;

const personOrchestrator: PersonOrchestrator = new PersonOrchestrator();
const errorCode = "500";

export const resolvers = {
    Mutation: {
        addPerson: async (_: any, {person, credential, partyAccessRoles}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await personOrchestrator
                .savePerson(person, credential, partyAccessRoles, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
        updatePerson: async (_: any, {partyId, person, credential, partyAccessRoles }: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await personOrchestrator
                .updatePerson(partyId, person, credential, partyAccessRoles, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
        deletePerson: async (_: any, {partyId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await personOrchestrator
                .deletePerson(partyId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        }
    },
    Query: {
        getPerson: async (_: any, {partyId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await personOrchestrator
                .getPerson(partyId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
        getPersons: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            const number = getNumericValueOrDefault(pageNumber, 1);
            const size = getNumericValueOrDefault(pageSize, 10);
            const field = getStringValueOrDefault(undefined, "");
            const direction = getStringValueOrDefault(sortOrder, "");

            const asc: string = Direction[Direction.ASC];
            const desc: string = Direction[Direction.DESC];

            const order = new Order();
            if (direction == asc) {
                order.property = field;
                order.direction = Direction.ASC;
            } else if (direction == desc) {
                order.property = field;
                order.direction = Direction.DESC;
            } else {
                order.property = field;
                order.direction = Direction.ASC;
            }

            const sort = new Sort();
            sort.add(order);
            return await personOrchestrator
                .getPersons(number, size, sort, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error, errorCode);
                });
        },
        findPeople: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await personOrchestrator
                .findPeople(searchStr, pageSize, headerOptions)
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
