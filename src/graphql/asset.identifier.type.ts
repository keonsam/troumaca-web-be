import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { AssetIdentifierTypeOrchestrator } from "../asset-identifier-type/asset.identifier.type.orchestrator";
import { AssetIdentifierType } from "../data/asset/asset.identifier.type";

const assetIdentifierTypeOrchestrator: AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetIdentifierType(name: String!, description: String!): AssetIdentifierType
        updateAssetIdentifierType(assetIdentifierTypeId: ID!, name: String!, description: String!): Int
        deleteAssetIdentifierType(assetIdentifierTypeId: ID!): Int
    }
    extend type Query {
        getAssetIdentifierType(assetIdentifierTypeId: ID!): AssetIdentifierType
        getAssetIdentifierTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetIdentifierTypes
        findAssetIdentifierTypes(searchStr: String!, pageSize: Int!): [AssetIdentifierType]
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
`;

export const resolvers = {
    Mutation: {
        addAssetIdentifierType: async (_: any, {name, description}: any) => {
            return await assetIdentifierTypeOrchestrator.saveAssetIdentifierType(new AssetIdentifierType(name, description)).toPromise();
        },
        updateAssetIdentifierType: async (_: any, {assetIdentifierTypeId, name, description}: any) => {
            return await assetIdentifierTypeOrchestrator.updateAssetIdentifierType(assetIdentifierTypeId, new AssetIdentifierType(name, description)).toPromise();
        },
        deleteAssetIdentifierType: async (_: any, {assetIdentifierTypeId}: any) => {
            return await assetIdentifierTypeOrchestrator.deleteAssetIdentifierType(assetIdentifierTypeId).toPromise();
        }
    },
    Query: {
        getAssetIdentifierType: async (_: any, {assetIdentifierTypeId}: any) => {
            return await assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(assetIdentifierTypeId).toPromise();
        },
        getAssetIdentifierTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
            return await assetIdentifierTypeOrchestrator.getAssetIdentifierTypes(number, size, sort).toPromise();
        },
        findAssetIdentifierTypes: async (_: any, {searchStr, pageSize}: any) => {
            return await assetIdentifierTypeOrchestrator.findAssetIdentifierTypes(searchStr, undefined, pageSize).toPromise();
        },
    }
};
