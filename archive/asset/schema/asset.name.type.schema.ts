import { gql, ApolloError } from "apollo-server-express";
import { AssetNameTypeOrchestrator } from "../../asset/asset-name-type/asset.name.type.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { Direction } from "../../util/direction";
import { Order } from "../../util/order";
import { Sort } from "../../util/sort";
import { HeaderBaseOptions } from "../../header.base.options";

const assetNameTypeOrchestrator: AssetNameTypeOrchestrator = new AssetNameTypeOrchestrator();

const errorCode = "500";
export const typeDef = gql`
  extend type Mutation {
    addAssetNameType(assetNameType: AssetNameTypeInput): AssetNameType @requireAuth
    updateAssetNameType(assetNameTypeId: ID!, assetNameType: AssetNameTypeInput): Int @requireAuth
    deleteAssetNameType(assetNameTypeId: ID!): Int @requireAuth
  }
  extend type Query {
    getAssetNameType(assetNameTypeId: ID!): AssetNameType @requireAuth
    getAssetNameTypes(pageNumber: Int!, pageSize: Int!, sortOrder: String!): AssetNameTypes @requireAuth
    findAssetNameTypes(searchStr: String!, pageSize: Int!): [AssetNameType] @requireAuth
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
  input AssetNameTypeInput {
      name: String!
      description: String
      version: String!
  }
`;

export const resolvers = {
  Mutation: {
    addAssetNameType: async (_: any, {assetNameType}: any, {req}: any) => {
      const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
      return await assetNameTypeOrchestrator
          .saveAssetNameType(assetNameType, headerOptions)
          .toPromise()
          .then( assetNameType => {
            return assetNameType;
          }, error => {
            console.log(error);
            throw new ApolloError(error, errorCode);
          });
    },
    updateAssetNameType: async (_: any, {assetNameTypeId, assetNameType}: any, {req}: any) => {
      const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
      return await assetNameTypeOrchestrator
          .updateAssetNameType(assetNameTypeId, assetNameType, headerOptions)
          .toPromise()
          .then( res => {
            return res;
          }, error => {
            console.log(error);
            throw new ApolloError(error);
          });
    },
    deleteAssetNameType: async (_: any, {assetNameTypeId}: any, {req}: any) => {
      const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
      return await assetNameTypeOrchestrator
          .deleteAssetNameType(assetNameTypeId, headerOptions)
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
    getAssetNameType: async (_: any, {assetNameTypeId}: any, {req}: any) => {
      const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
      return await assetNameTypeOrchestrator
          .getAssetNameTypeById(assetNameTypeId, headerOptions)
          .toPromise()
          .then( res => {
            return res;
          }, error => {
            console.log(error);
            throw new ApolloError(error);
          });
    },
    getAssetNameTypes: async (_: any, {pageNumber, pageSize, sortOrder}: any, {req}: any) => {
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
      return await assetNameTypeOrchestrator
          .getAssetNameTypes(number, size, sort, headerOptions)
          .toPromise()
          .then( res => {
            return res;
          }, error => {
            console.log(error);
            throw new ApolloError(error);
          });
    },
    findAssetNameTypes: async (_: any, {searchStr, pageSize}: any, {req}: any) => {
      const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
      return await assetNameTypeOrchestrator
          .findAssetNameTypes(searchStr, undefined, pageSize, headerOptions)
          .toPromise()
          .then( res => {
            return res;
          }, error => {
            console.log(error);
            throw new ApolloError(error);
          });
    },
  }
};
