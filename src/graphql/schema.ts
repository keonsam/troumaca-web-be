// import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";
import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";

// import {makeExecutableSchema} from "graphql-tools";
import {
  typeDef as OrganizationProfile,
  resolvers as organizationProfileResolvers
} from './organization.profile';

import {
  typeDef as AssetNameType,
  resolvers as assetNameTypeResolvers
} from './asset.name.type'

// using: https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// other reference: https://graphql.org/learn/queries/
// other reference: https://www.howtographql.com/advanced/2-more-graphql-concepts/
// other reference: https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// other reference: https://www.apollographql.com/docs/apollo-server/essentials/data.html

// import {merge} from "rxjs";
// import { typeDef as Organization } from './organization';
// import { typeDef as PartyImage } from './party.image';
// import { typeDef as PartyImageType } from './party.image.type';
// import { typeDef as SiteType } from './site.type';
// import { typeDef as VirtualSite } from './virtual.site';
// import { typeDef as VirtualSiteType } from './virtual.site.type';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// let schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

let schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    OrganizationProfile,
    AssetNameType
  ],
  resolvers: merge(
    resolvers,
    organizationProfileResolvers,
    assetNameTypeResolvers
  ),
});

// const organizationProfileQuery = `
//   type Query {
//     organizationProfile(id: Int!): OrganizationProfile
//   }
//   `;

// ,
// book: () => {
//
// },

// ,
// Author: {
//   name: () => {
//
//   },
// },
// Book: {
//   title: () => {
//
//   },
// },

// const resolvers = {
  // Query: {
  //   partyId: () => "b11ce400-c8c7-4e95-b977-993eddc522d9"
  // }
// };

// ,
// Organization,
// PartyImage,
// PartyImageType,
// SiteType,
// VirtualSite,
// VirtualSiteType

// makeExecutableSchema({
//   typeDefs: [
//     organizationProfileQuery,
//     OrganizationProfile
//   ],
//   resolvers,
// });

export default schema;