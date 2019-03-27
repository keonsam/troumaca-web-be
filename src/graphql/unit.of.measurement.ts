import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { UnitOfMeasurementOrchestrator } from "../unit-of-measurement/unit.of.measurement.orchestrator";
import { UnitOfMeasurement } from "../data/unit-of-measurement/unit.of.measurement";

const unitOfMeasureOrch: UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addUnitOfMeasurement(name: String!, description: String!): UnitOfMeasurement
        updateUnitOfMeasurement(unitOfMeasurementId: ID!, name: String!, description: String!): Int
        deleteUnitOfMeasurement(unitOfMeasurementId: ID!): Int
    }
    extend type Query {
        getUnitOfMeasurement(unitOfMeasurementId: ID!): UnitOfMeasurement
        getUnitOfMeasurements(pageNumber: Int!, pageSize: Int!, sortOrder: String!): UnitOfMeasurements
        findUnitOfMeasurements(searchStr: String!, pageSize: Int!): [UnitOfMeasurement]
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
`;

export const resolvers = {
    Mutation: {
        addUnitOfMeasurement: async (_: any, {name, description}: any) => {
            return await unitOfMeasureOrch.addUnitOfMeasurement(new UnitOfMeasurement(name, description)).toPromise();
        },
        updateUnitOfMeasurement: async (_: any, {unitOfMeasurementId, name, description}: any) => {
            return await unitOfMeasureOrch.updateUnitOfMeasurement(unitOfMeasurementId, new UnitOfMeasurement(name, description)).toPromise();
        },
        deleteUnitOfMeasurement: async (_: any, {unitOfMeasurementId}: any) => {
            return await unitOfMeasureOrch.deleteUnitOfMeasurement(unitOfMeasurementId).toPromise();
        }
    },
    Query: {
        getUnitOfMeasurement: async (_: any, {unitOfMeasurementId}: any) => {
            return await unitOfMeasureOrch.getUnitOfMeasurementById(unitOfMeasurementId).toPromise();
        },
        getUnitOfMeasurements: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
            return await unitOfMeasureOrch.getUnitOfMeasurements(number, size, sort).toPromise();
        },
        findUnitOfMeasurements: async (_: any, {searchStr, pageSize}: any) => {
            return await unitOfMeasureOrch.findUnitOfMeasurements(searchStr, undefined, pageSize).toPromise();
        },
    }
};
