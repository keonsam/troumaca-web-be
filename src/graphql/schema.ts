import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import { typeDef as  AuthType, resolvers as AuthResolvers } from "./authentication";
import { typeDef as MeType, resolvers as MeResolvers } from "./me";
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
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const schema = makeExecutableSchema({
  typeDefs: [
      typeDefs,
      AuthType,
      MeType
    // OrganizationProfile,
    // AssetNameType
  ],
  resolvers: merge(
      resolvers,
      AuthResolvers,
      MeResolvers
    // organizationProfileResolvers,
    // assetNameTypeResolvers
  ),
});

export default schema;
