// import { gql, ApolloError } from "apollo-server-express";
// import { getNumericValueOrDefault} from "../../number.util";
// import { getStringValueOrDefault } from "../../string.util";
// import { Direction } from "../../util/direction";
// import { Order } from "../../util/order";
// import { Sort } from "../../util/sort";
// import { AssetOrchestrator } from "../../asset/asset.orchestrator";
// import { HeaderBaseOptions } from "../../header.base.options";
// import { Asset } from "../../domain/model/asset/asset";
// import { AssetTypeOrchestrator } from "../../asset/asset-type/asset.type.orchestrator";
//
// const assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();
//
// export const typeDef = gql`
//     extend type Mutation {
//         addAsset(asset: AssetInput): Asset @requireAuth
//         updateAsset(assetId: ID!, asset: AssetInput): Int @requireAuth
//         deleteAsset(assetId: ID!): Int @requireAuth
//     }
//     extend type Query {
//         getAsset(assetId: ID!): Asset @requireAuth
//         getAssets(pageNumber: Int!, pageSize: Int!, sortOrder: String!): Assets @requireAuth
//         findAssets(searchStr: String!, pageSize: Int!): [Asset] @requireAuth
//     }
//     type Asset {
//         assetId: ID
//         assetTypeId: ID
//         assetType: AssetType
//         name: String
//         description: String
//         createdOn: String
//         destroyOn: String
//         discreteItem: DiscreteItem
//         inventoryItem: InventoryItem
//         building: Building
//         lot: Lot
//         version: String
//     }
//     type DiscreteItem {
//         serialNumber: String
//     }
//     type InventoryItem {
//         inventoryID: String
//         quantity: String
//     }
//     type Building {
//         buildingNumber: String
//     }
//     type Lot {
//         lotNumber: String
//         numberOfShares: String
//     }
//     type Assets {
//         assets: [Asset]
//         page: Page
//     }
//     input AssetInput {
//         name: String!
//         assetTypeId: ID!
//         description: String
//         createdOn: String
//         destroyOn: String
//         discreteItem: DiscreteItemInput
//         inventoryItem: InventoryItemInput
//         building: BuildingInput
//         lot: LotInput
//         version: String!
//     }
//     input DiscreteItemInput {
//         serialNumber: String
//     }
//     input InventoryItemInput {
//         inventoryID: String
//         quantity: String
//     }
//     input BuildingInput {
//         buildingNumber: String
//     }
//     input LotInput {
//         lotNumber: String
//         numberOfShares: String
//     }
// `;
//
// const assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();
// const errorCode = "500";
//
// export const resolvers = {
//     Asset: {
//         async assetType(asset: Asset, _: any, {req}: any) {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return assetTypeOrchestrator
//                 .getAssetTypeById(asset.assetTypeId, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         }
//     },
//     Mutation: {
//         addAsset: async (_: any, {asset}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return await assetOrchestrator
//                 .addAsset(asset, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         },
//         updateAsset: async (_: any, {assetId, asset}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return await assetOrchestrator
//                 .updateAsset(assetId, asset, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         },
//         deleteAsset: async (_: any, {assetId}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return await assetOrchestrator
//                 .deleteAsset(assetId, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         }
//     },
//     Query: {
//         getAsset: async (_: any, {assetId}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return await assetOrchestrator
//                 .getAssetById(assetId, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         },
//         getAssets: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
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
//             return await assetOrchestrator
//                 .getAssets(number, size, sort, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         },
//         findAssets: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
//             const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
//             return await assetOrchestrator
//                 .findAssets(searchStr, undefined, pageSize, headerOptions)
//                 .toPromise()
//                 .then( res => {
//                     return res;
//                 }, error => {
//                     console.log(error);
//                     throw new ApolloError(error, errorCode);
//                 });
//         },
//     }
// };
