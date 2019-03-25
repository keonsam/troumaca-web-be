import { gql} from "apollo-server-express";
import { AssetNameTypeOrchestrator } from "../asset-name-type/asset.name.type.orchestrator";
import { AssetNameType } from "../data/asset/asset.name.type";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { Direction } from "../util/direction";
import { Order } from "../util/order";
import { Sort } from "../util/sort";

const assetNameTypeOrchestrator: AssetNameTypeOrchestrator = new AssetNameTypeOrchestrator();

export const typeDef = gql`
  extend type Mutation {
    addAssetNameType(name: String!, description: String!): AssetNameType
    updateAssetNameType(assetNameTypeId: ID!, name: String!, description: String!): Int
    deleteAssetNameType(assetNameTypeId: ID!): Int
  }
  extend type Query {
    getAssetNameType(assetNameTypeId: ID!): AssetNameType
    getAssetNameTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetNameTypes
    findAssetNameTypes(searchStr: String!, pageSize: Int!): [AssetNameType]
  }
  type AssetNameType {
    assetNameTypeId: ID
    name: String
    description: String
  }
  type AssetNameTypes {
    assetNameTypes: [AssetNameType]
    page: Page
  }
`;

export const resolvers = {
  Mutation: {
    addAssetNameType: async (_: any, {name, description}: any) => {
      return await assetNameTypeOrchestrator.saveAssetNameType(new AssetNameType(name, description)).toPromise();
    },
    updateAssetNameType: async (_: any, {assetNameTypeId, name, description}: any) => {
      return await assetNameTypeOrchestrator.updateAssetNameType(assetNameTypeId, new AssetNameType(name, description)).toPromise();
    },
    deleteAssetNameType: async (_: any, {assetNameTypeId}: any) => {
      return await assetNameTypeOrchestrator.deleteAssetNameType(assetNameTypeId).toPromise();
    }
  },
  Query: {
    getAssetNameType: async (_: any, {assetNameTypeId}: any) => {
      return await assetNameTypeOrchestrator.getAssetNameTypeById(assetNameTypeId).toPromise();
    },
    getAssetNameTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any) => {
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
      return await assetNameTypeOrchestrator.getAssetNameTypes(number, size, sort).toPromise();
    },
    findAssetNameTypes: async (_: any, {searchStr, pageSize}: any) => {
      return await assetNameTypeOrchestrator.findAssetNameTypes(searchStr, undefined, pageSize).toPromise();
    },
  }
};
