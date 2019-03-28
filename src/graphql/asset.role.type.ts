import { gql} from "apollo-server-express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";
import { AssetRoleTypeOrchestrator } from "../asset-role-type/asset.role.type.orchestrator";
import { AssetRoleType } from "../data/asset/asset.role.type";

const assetRoleTypeOrchestrator: AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

export const typeDef = gql`
    extend type Mutation {
        addAssetRoleType(assetRoleType: AssetRoleTypeInput): AssetRoleType
        updateAssetRoleType(assetRoleTypeId: ID!, assetRoleType: AssetRoleTypeInput): Int
        deleteAssetRoleType(assetRoleTypeId: ID!): Int
    }
    extend type Query {
        getAssetRoleType(assetRoleTypeId: ID!): AssetRoleType
        getAssetRoleTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetRoleTypes
        findAssetRoleTypes(searchStr: String!, pageSize: Int!): [AssetRoleType]
    }
    type AssetRoleType {
        assetRoleTypeId: ID
        name: String
        description: String
    }
    type AssetRoleTypes {
        assetRoleTypes: [AssetRoleType]
        page: Page
    }
    input AssetRoleTypeInput {
        name: String!
        description: String!
    }
`;

export const resolvers = {
    Mutation: {
        addAssetRoleType: async (_: any, {assetRoleType}: any) => {
            return await assetRoleTypeOrchestrator.saveAssetRoleType(assetRoleType).toPromise();
        },
        updateAssetRoleType: async (_: any, {assetRoleTypeId, assetRoleType}: any) => {
            return await assetRoleTypeOrchestrator.updateAssetRoleType(assetRoleTypeId, assetRoleType).toPromise();
        },
        deleteAssetRoleType: async (_: any, {assetRoleTypeId}: any) => {
            return await assetRoleTypeOrchestrator.deleteAssetRoleType(assetRoleTypeId).toPromise();
        }
    },
    Query: {
        getAssetRoleType: async (_: any, {assetRoleTypeId}: any) => {
            return await assetRoleTypeOrchestrator.getAssetRoleTypeById(assetRoleTypeId).toPromise();
        },
        getAssetRoleTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
            return await assetRoleTypeOrchestrator.getAssetRoleTypes(number, size, sort).toPromise();
        },
        findAssetRoleTypes: async (_: any, {searchStr, pageSize}: any) => {
            return await assetRoleTypeOrchestrator.findAssetRoleTypes(searchStr, undefined, pageSize).toPromise();
        },
    }
};
