import { gql, ApolloError } from "apollo-server-express";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { AssetCharacteristicOrchestrator } from "../../asset/asset-characteristic/asset.characteristic.orchestrator";
import { UnitOfMeasurementOrchestrator } from "../../asset/unit-of-measurement/unit.of.measurement.orchestrator";
import { AssetCharacteristic } from "../../data/asset/asset.characteristic";
import { HeaderBaseOptions } from "../../header.base.options";

const assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();
const unitOfMeasurementOrchestrator: UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetCharacteristic(assetCharacteristic: AssetCharacteristicInput!): AssetCharacteristic! @requireAuth
        updateAssetCharacteristic(assetCharacteristicId: ID!, assetCharacteristic: AssetCharacteristicInput!): Int! @requireAuth
        deleteAssetCharacteristic(assetCharacteristicId: ID!): Int! @requireAuth
    }
    extend type Query {
        getAssetCharacteristic(assetCharacteristicId: ID!): AssetCharacteristic! @requireAuth
        getAssetCharacteristics(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetCharacteristics! @requireAuth
        findAssetCharacteristics(searchStr: String!, pageSize: Int!): [AssetCharacteristic]! @requireAuth
        getAssetCharacteristicTypes: [AssetCharacteristicType] @requireAuth
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
        description: String
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
        async unitOfMeasurement(assetCharacteristic: AssetCharacteristic, _: any, {req}: any) {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await unitOfMeasurementOrchestrator
                .getUnitOfMeasurementById(assetCharacteristic.unitOfMeasurementId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        async assetCharacteristicType(assetCharacteristic: AssetCharacteristic) {
            return await assetCharacteristicOrchestrator
                .getAssetCharacteristicType(assetCharacteristic.assetCharacteristicTypeId)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        }
    },
    Mutation: {
        addAssetCharacteristic: async (_: any, {assetCharacteristic}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetCharacteristicOrchestrator
                .saveAssetCharacteristic(assetCharacteristic, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        updateAssetCharacteristic: async (_: any, {assetCharacteristicId, assetCharacteristic}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetCharacteristicOrchestrator
                .updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        deleteAssetCharacteristic: async (_: any, {assetCharacteristicId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetCharacteristicOrchestrator
                .deleteAssetCharacteristic(assetCharacteristicId, headerOptions)
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
        getAssetCharacteristic: async (_: any, {assetCharacteristicId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetCharacteristicOrchestrator
                .getAssetCharacteristicById(assetCharacteristicId, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        getAssetCharacteristics: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
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
            return await assetCharacteristicOrchestrator
                .getAssetCharacteristics(number, size, sort, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        findAssetCharacteristics: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetCharacteristicOrchestrator
                .findAssetCharacteristics(searchStr, undefined, pageSize, headerOptions)
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        },
        getAssetCharacteristicTypes: async ( ) => {
            return await assetCharacteristicOrchestrator
                .getAssetCharacteristicTypes()
                .toPromise()
                .then( res => {
                    return res;
                }, error => {
                    console.log(error);
                    throw new ApolloError(error);
                });
        }
    }
};
