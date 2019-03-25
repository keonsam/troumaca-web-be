import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import { typeDef as  Credential, resolvers as CredentialResolvers } from "./credential";
// import { typeDef as MeType, resolvers as MeResolvers } from "./me";
import { typeDef as Confirmation, resolvers as ConfirmationResolvers} from "./confirmation";
import { typeDef as AssetNameType, resolvers as AssetNameTypeResolvers} from "./asset.name.type";
import { typeDef as AssetIdentifierType, resolvers as AssetIdentifierTypeResolvers} from "./asset.identifier.type";
import { typeDef as AssetRoleType, resolvers as AssetRoleTypeResolvers} from "./asset.role.type";
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
      AssetNameType,
      AssetIdentifierType,
      AssetRoleType
      // MeType
    // OrganizationProfile,
    // AssetNameType
  ],
  resolvers: merge(
      resolvers,
      CredentialResolvers,
      ConfirmationResolvers,
      AssetNameTypeResolvers,
      AssetIdentifierTypeResolvers,
      AssetRoleTypeResolvers
      // MeResolvers
    // organizationProfileResolvers,
    // assetNameTypeResolvers
  ),
});

export default schema;
