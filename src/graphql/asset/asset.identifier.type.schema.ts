import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { AssetIdentifierTypeOrchestrator } from "../../asset/asset-identifier-type/asset.identifier.type.orchestrator";
import { HeaderBaseOptions } from "../../header.base.options";

const assetIdentifierTypeOrchestrator: AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetIdentifierType(assetIdentifierType: AssetIdentifierTypeInput): AssetIdentifierType @requireAuth
        updateAssetIdentifierType(assetIdentifierTypeId: ID!, assetIdentifierType: AssetIdentifierTypeInput): Int @requireAuth
        deleteAssetIdentifierType(assetIdentifierTypeId: ID!): Int @requireAuth
    }
    extend type Query {
        getAssetIdentifierType(assetIdentifierTypeId: ID!): AssetIdentifierType @requireAuth
        getAssetIdentifierTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetIdentifierTypes @requireAuth
        findAssetIdentifierTypes(searchStr: String!, pageSize: Int!): [AssetIdentifierType] @requireAuth
    }
    type AssetIdentifierType {
        assetIdentifierTypeId: ID
        name: String
        description: String
    }
    type AssetIdentifierTypes {
        assetIdentifierTypes: [AssetIdentifierType]
        page: Page
    }
    input AssetIdentifierTypeInput {
        name: String!
        description: String!
    }
`;

export const resolvers = {
    Mutation: {
        addAssetIdentifierType: async (_: any, {assetIdentifierType}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetIdentifierTypeOrchestrator.saveAssetIdentifierType(assetIdentifierType, headerOptions).toPromise();
        },
        updateAssetIdentifierType: async (_: any, {assetIdentifierTypeId, assetIdentifierType}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetIdentifierTypeOrchestrator.updateAssetIdentifierType(assetIdentifierTypeId, assetIdentifierType, headerOptions).toPromise();
        },
        deleteAssetIdentifierType: async (_: any, {assetIdentifierTypeId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetIdentifierTypeOrchestrator.deleteAssetIdentifierType(assetIdentifierTypeId, headerOptions).toPromise();
        }
    },
    Query: {
        getAssetIdentifierType: async (_: any, {assetIdentifierTypeId}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(assetIdentifierTypeId).toPromise();
        },
        getAssetIdentifierTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
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
            return await assetIdentifierTypeOrchestrator.getAssetIdentifierTypes(number, size, sort, headerOptions).toPromise();
        },
        findAssetIdentifierTypes: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
            const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
            return await assetIdentifierTypeOrchestrator.findAssetIdentifierTypes(searchStr, undefined, pageSize, headerOptions).toPromise();
        },
    }
};
