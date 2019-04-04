import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import { typeDef as  Credential, resolvers as CredentialResolvers } from "./authentication/credential.schema";
import { typeDef as Confirmation, resolvers as ConfirmationResolvers} from "./authentication/confirmation.schema";
import { typeDef as Company, resolvers as CompanyResolvers} from "./party/company";
import { typeDef as AssetNameType, resolvers as AssetNameTypeResolvers} from "./asset/asset.name.type.schema";
import { typeDef as AssetIdentifierType, resolvers as AssetIdentifierTypeResolvers} from "./asset/asset.identifier.type.schema";
import { typeDef as AssetRoleType, resolvers as AssetRoleTypeResolvers} from "./asset/asset.role.type.schema";
import { typeDef as Brand, resolvers as BrandResolvers} from "./asset/brand.schema";
import { typeDef as UnitOfMeasure, resolvers as UnitOfMeasureResolvers} from "./asset/unit.of.measurement.schema";
import { typeDef as AssetCharacteristic, resolvers as AssetCharacteristicResolvers} from "./asset/asset.characteristic.schema";
import { typeDef as AssetType, resolvers as AssetTypeResolvers} from "./asset.type.schema";
import { RequireAuth } from "../middleware/require.auth";
// import {
//   typeDef as OrganizationProfile,
//   resolvers as organizationProfileResolvers
// } from "./organization.profile";
//
// import {
//   typeDef as AssetNameType,
//   resolvers as assetNameTypeResolvers
// } from "./asset.name.type";

// using: https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// other reference: https://graphql.org/learn/queries/
// other reference: https://www.howtographql.com/advanced/2-more-graphql-concepts/
// other reference: https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// other reference: https://www.apollographql.com/docs/apollo-server/essentials/data.html

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    directive @requireAuth on FIELD_DEFINITION
    type Query {
        hello: String
    }
    type Mutation {
        hello(name: String): String
    }
    type Page {
        number: Int
        size: Int
        items: Int
        totalItems: Int
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
    Mutation: {
        hello: (_: any, {name}: any) => `Hello ${name}`
    }
};

const schema = makeExecutableSchema({
  typeDefs: [
      typeDefs,
      Credential,
      Confirmation,
      Company,
      AssetNameType,
      AssetIdentifierType,
      AssetRoleType,
      Brand,
      UnitOfMeasure,
      AssetCharacteristic,
      // AssetType
      // MeType
    // OrganizationProfile,
    // AssetNameType
  ],
  resolvers: merge(
      resolvers,
      CredentialResolvers,
      ConfirmationResolvers,
      CompanyResolvers,
      AssetNameTypeResolvers,
      AssetIdentifierTypeResolvers,
      AssetRoleTypeResolvers,
      BrandResolvers,
      UnitOfMeasureResolvers,
      AssetCharacteristicResolvers,
      // AssetTypeResolvers
      // MeResolvers
    // organizationProfileResolvers,
    // assetNameTypeResolvers
  ),
    schemaDirectives: {
        requireAuth: RequireAuth
    }
});

export default schema;
