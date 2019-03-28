import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { AssetCharacteristicOrchestrator } from "../asset-characteristic/asset.characteristic.orchestrator";
import { UnitOfMeasurementOrchestrator } from "../unit-of-measurement/unit.of.measurement.orchestrator";
import { AssetCharacteristic } from "../data/asset/asset.characteristic";

const assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();
const unitOfMeasurementOrchestrator: UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetCharacteristic(assetCharacteristic: AssetCharacteristicInput!): AssetCharacteristic!
        updateAssetCharacteristic(assetCharacteristicId: ID!, assetCharacteristic: AssetCharacteristicInput!): Int!
        deleteAssetCharacteristic(assetCharacteristicId: ID!): Int!
    }
    extend type Query {
        getAssetCharacteristic(assetCharacteristicId: ID!): AssetCharacteristic!
        getAssetCharacteristics(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetCharacteristics!
        findAssetCharacteristics(searchStr: String!, pageSize: Int!): [AssetCharacteristic]!
        getAssetCharacteristicTypes: AssetCharacteristicType
    }
    type AssetCharacteristic {
        assetCharacteristicId: ID!
        name: String
        assetCharacteristicTypeId: ID
        assetCharacteristicType: AssetCharacteristicType
        defaultValue: String
        description: String
        unitOfMeasurementId: ID
        unitOfMeasurement: UnitOfMeasurement
        formula: String
        calculationLevel: String
        maximumValue: String
        minimumValue: String
        categoryValue: String
        effectiveDate: String
        untilDate: String
    }
    type AssetCharacteristics {
        assetCharacteristics: [AssetCharacteristic]!
        page: Page!
    }
    type AssetCharacteristicType {
        assetCharacteristicTypeId: String!
        name: String!
    }
    input AssetCharacteristicInput {
        name: String!
        assetCharacteristicTypeId: ID!
        defaultValue: String
        description: String!
        unitOfMeasurementId: ID
        formula: String
        calculationLevel: String
        maximumValue: String
        minimumValue: String
        categoryValue: String
        effectiveDate: String
        untilDate: String
    }
`;

export const resolvers = {
    AssetCharacteristic: {
        async unitOfMeasurement(assetCharacteristic: AssetCharacteristic) {
            return await unitOfMeasurementOrchestrator.getUnitOfMeasurementById(assetCharacteristic.unitOfMeasurementId);
        },
        async assetCharacteristicType(assetCharacteristic: AssetCharacteristic) {
            return await assetCharacteristicOrchestrator.getAssetCharacteristicById(assetCharacteristic.assetCharacteristicTypeId);
        }
    },
    Mutation: {
        addAssetCharacteristic: async (_: any, {assetCharacteristic}: any) => {
            return await assetCharacteristicOrchestrator.saveAssetCharacteristic(assetCharacteristic).toPromise();
        },
        updateAssetCharacteristic: async (_: any, {assetCharacteristicId, assetCharacteristic}: any) => {
            return await assetCharacteristicOrchestrator.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic).toPromise();
        },
        deleteAssetCharacteristic: async (_: any, {assetCharacteristicId}: any) => {
            return await assetCharacteristicOrchestrator.deleteAssetCharacteristic(assetCharacteristicId).toPromise();
        }
    },
    Query: {
        getAssetCharacteristic: async (_: any, {assetCharacteristicId}: any) => {
            return await assetCharacteristicOrchestrator.getAssetCharacteristicById(assetCharacteristicId).toPromise();
        },
        getAssetCharacteristics: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
            return await assetCharacteristicOrchestrator.getAssetCharacteristics(number, size, sort).toPromise();
        },
        findAssetCharacteristics: async (_: any, {searchStr, pageSize}: any) => {
            return await assetCharacteristicOrchestrator.findAssetCharacteristics(searchStr, undefined, pageSize).toPromise();
        },
        getAssetCharacteristicTypes: async () => {
            return await assetCharacteristicOrchestrator.getAssetCharacteristicTypes();
        }
    }
};
