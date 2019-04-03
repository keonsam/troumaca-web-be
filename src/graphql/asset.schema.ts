// import { gql} from "apollo-server-express";
// import { getNumericValueOrDefault } from "../number.util";
// import { getStringValueOrDefault } from "../string.util";
// import { Direction } from "../util/direction";
// import { Order } from "../util/order";
// import { Sort } from "../util/sort";
// import { AssetOrchestrator } from "../asset/asset.orchestrator";
//
// const assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();
//
// export const typeDef = gql`
//     extend type Mutation {
//         addAsset(asset: AssetInput): Asset
//         updateAsset(assetId: ID!, asset: AssetInput): Int
//         deleteAsset(assetId: ID!): Int
//     }
//     extend type Query {
//         getAsset(assetId: ID!): Asset
//         getAssets(pageNumber: Int!, pageSize: Int!, sortOrder: String!): Assets
//         findAssets(searchStr: String!, pageSize: Int!): [Asset]
//     }
//     type Asset {
//         assetId: ID
//         name: String
//         description: String
//     }
//     type Assets {
//         assets: [Asset]
//         page: Page
//     }
//     input AssetInput {
//         assetTypeId: ID!
//         name: String!
//         description: String!
//         createdOn: String
//         destroyOn: String
//         discreteItem: DiscreteItemInput
//         inventoryItem: InventoryItemInput
//         building: BuildingInput
//         lot: LotInput
//     }
//     input DiscreteItemInput {
//         serialNumber: String
//     }
//     input InventoryItemInput {
//         inventoryID: String
//         quantity: Int
//     }
//     input BuildingInput {
//         buildingNumber: String
//     }
//     input LotInput {
//         lotNumber: String
//         numberOfShares: Int
//     }
// `;
//
// export const resolvers = {
//     Mutation: {
//         addAsset: async (_: any, {asset}: any) => {
//             return await assetOrchestrator.addAsset(asset).toPromise();
//         },
//         updateAsset: async (_: any, {assetId, asset}: any) => {
//             return await assetOrchestrator.updateAsset(assetId, asset).toPromise();
//         },
//         deleteAsset: async (_: any, {assetId}: any) => {
//             return await assetOrchestrator.deleteAsset(assetId).toPromise();
//         }
//     },
//     Query: {
//         getAsset: async (_: any, {assetId}: any) => {
//             return await assetOrchestrator.getAssetById(assetId).toPromise();
//         },
//         getAssets: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
//             return await assetOrchestrator.getAssets(number, size, sort).toPromise();
//         },
//         findAssets: async (_: any, {searchStr, pageSize}: any) => {
//             return await assetOrchestrator.findAssets(searchStr, undefined, pageSize).toPromise();
//         },
//     }
// };
