// import { gql} from "apollo-server-express";
// import { getNumericValueOrDefault } from "../number.util";
// import { getStringValueOrDefault } from "../string.util";
// import { Direction } from "../util/direction";
// import { Order } from "../util/order";
// import { Sort } from "../util/sort";
// import { AssetCharacteristicOrchestrator } from "../asset-characteristic/asset.characteristic.orchestrator";
//
// const assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();
//
// export const typeDef = gql`
//     extend type Mutation {
//         addAssetCharacteristic(assetCharacteristic: AssetCharacteristic!): AssetCharacteristic!
//         updateAssetCharacteristic(assetCharacteristicId: ID!): Int!
//         deleteAssetCharacteristic(assetCharacteristicId: ID!): Int!
//     }
//     extend type Query {
//         getAssetCharacteristic(assetCharacteristicId: ID!): AssetCharacteristic!
//         getAssetCharacteristics(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetCharacteristics!
//         findAssetCharacteristics(searchStr: String!, pageSize: Int!): [AssetCharacteristic]!
//     }
//     type AssetCharacteristic {
//         assetCharacteristicId: ID!
//         name: String!
//         kind: String!
//         defaultValue: String!
//         unitOfMeasure: UnitOfMeasurement!
//         formula: String!
//         calculationLevel: String!
//         maximumValue: String!
//         minimumValue: String!
//         categoryValue: String!
//         effectiveDate: String!
//         untilDate: String!
//         description: String!
//     }
//     type AssetCharacteristics {
//         assetCharacteristics: [AssetCharacteristic]!
//         page: Page!
//     }
// `;
//
// export const resolvers = {
//     Mutation: {
//         addAssetCharacteristic: async (_: any, {assetCharacteristic}: any) => {
//             return await assetCharacteristicOrchestrator.saveAssetCharacteristic(assetCharacteristic).toPromise();
//         },
//         updateAssetCharacteristic: async (_: any, {assetCharacteristicId, assetCharacteristic}: any) => {
//             return await assetCharacteristicOrchestrator.updateAssetCharacteristic(assetCharacteristicId, assetCharacteristic).toPromise();
//         },
//         deleteAssetCharacteristic: async (_: any, {assetCharacteristicId}: any) => {
//             return await assetNameTypeOrchestrator.deleteAssetCharacteristic(assetCharacteristicId).toPromise();
//         }
//     },
//     Query: {
//         getAssetCharacteristic: async (_: any, {assetCharacteristicId}: any) => {
//             return await assetNameTypeOrchestrator.getAssetCharacteristicById(assetCharacteristicId).toPromise();
//         },
//         getAssetCharacteristics: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
//             const number = getNumericValueOrDefault(pageNumber, 1);
//             const size = getNumericValueOrDefault(pageSize, 10);
//             const field = getStringValueOrDefault(undefined, "");
//             const direction = getStringValueOrDefault(sortOrder, "");
//
//             const asc: string = Direction[Direction.ASC];
//             const desc: string = Direction[Direction.DESC];
//
//             const order = new Order();
//             if (direction == asc) {
//                 order.property = field;
//                 order.direction = Direction.ASC;
//             } else if (direction == desc) {
//                 order.property = field;
//                 order.direction = Direction.DESC;
//             } else {
//                 order.property = field;
//                 order.direction = Direction.ASC;
//             }
//
//             const sort = new Sort();
//             sort.add(order);
//             return await assetNameTypeOrchestrator.getAssetCharacteristics(number, size, sort).toPromise();
//         },
//         findAssetCharacteristics: async (_: any, {searchStr, pageSize}: any) => {
//             return await assetNameTypeOrchestrator.findAssetCharacteristics(searchStr, undefined, pageSize).toPromise();
//         },
//     }
// };
