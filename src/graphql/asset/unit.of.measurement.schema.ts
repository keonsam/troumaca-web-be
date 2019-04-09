import { gql, ApolloError } from "apollo-server-express";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { UnitOfMeasurementOrchestrator } from "../../asset/unit-of-measurement/unit.of.measurement.orchestrator";
import { HeaderBaseOptions } from "../../header.base.options";

const unitOfMeasureOrch: UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addUnitOfMeasurement(unitOfMeasurement: UnitOfMeasurementInput): UnitOfMeasurement @requireAuth
        updateUnitOfMeasurement(unitOfMeasurementId: ID!, unitOfMeasurement: UnitOfMeasurementInput): Int @requireAuth
        deleteUnitOfMeasurement(unitOfMeasurementId: ID!): Int @requireAuth
    }
    extend type Query {
        getUnitOfMeasurement(unitOfMeasurementId: ID!): UnitOfMeasurement @requireAuth
        getUnitOfMeasurements(pageNumber: Int!, pageSize: Int!, sortOrder: String!): UnitOfMeasurements @requireAuth
        findUnitOfMeasurements(searchStr: String!, pageSize: Int!): [UnitOfMeasurement] @requireAuth
    }
    type UnitOfMeasurement {
        unitOfMeasurementId: ID
        name: String
        description: String
    }
    type UnitOfMeasurements {
        unitOfMeasures: [UnitOfMeasurement]
        page: Page
    }
    input UnitOfMeasurementInput {
        name: String!
        description: String
    }
`;

export const resolvers = {
    Mutation: {
        addUnitOfMeasurement: async (_: any, {unitOfMeasurement}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasureOrch
                .addUnitOfMeasurement(unitOfMeasurement, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        updateUnitOfMeasurement: async (_: any, {unitOfMeasurementId, unitOfMeasurement}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasureOrch
                .updateUnitOfMeasurement(unitOfMeasurementId, unitOfMeasurement, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        deleteUnitOfMeasurement: async (_: any, {unitOfMeasurementId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasureOrch
                .deleteUnitOfMeasurement(unitOfMeasurementId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        }
    },
    Query: {
        getUnitOfMeasurement: async (_: any, {unitOfMeasurementId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasureOrch
                .getUnitOfMeasurementById(unitOfMeasurementId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        getUnitOfMeasurements: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
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
            return await unitOfMeasureOrch
                .getUnitOfMeasurements(number, size, sort, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        findUnitOfMeasurements: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasureOrch
                .findUnitOfMeasurements(searchStr, undefined, pageSize, headerOptions)
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
