import { gql, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
// import { typeDef as  Credential, resolvers as CredentialResolvers } from "./authentication/credential.resolver";
// import { typeDef as Confirmation, resolvers as ConfirmationResolvers} from "./authentication/confirmation.resolver";
import { typeDef as Company, resolvers as CompanyResolvers} from "./party/company.schema";
import { typeDef as AssetNameType, resolvers as AssetNameTypeResolvers} from "./asset/asset.name.type.schema";
import { typeDef as AssetIdentifierType, resolvers as AssetIdentifierTypeResolvers} from "./asset/asset.identifier.type.schema";
import { typeDef as AssetRoleType, resolvers as AssetRoleTypeResolvers} from "./asset/asset.role.type.schema";
import { typeDef as Brand, resolvers as BrandResolvers} from "./asset/brand.schema";
import { typeDef as UnitOfMeasure, resolvers as UnitOfMeasureResolvers} from "./asset/unit.of.measurement.schema";
import { typeDef as AssetCharacteristic, resolvers as AssetCharacteristicResolvers} from "./asset/asset.characteristic.schema";
import { typeDef as AssetType, resolvers as AssetTypeResolvers} from "./asset/asset.type.schema";
import { typeDef as Asset, resolvers as AssetResolvers } from "./asset/asset.schema";
import {typeDef as AccessRole, resolvers as AccessRoleResolvers } from "./authorization/access.role.schema";
import { typeDef as People, resolvers as PeopleResolvers } from "./party/people.schema";
import { typeDef as User, resolvers as UserResolvers } from "./party/user.schema";
import { typeDef as Session, resolvers as SessionResolvers } from "./authorization/session.schema";

// Directives
import { RequireAuth } from "../middleware/require.auth";
import { buildSchema, buildTypeDefsAndResolvers, ResolverInterface } from "type-graphql";

// using: https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// other reference: https://graphql.org/learn/queries/
// other reference: https://www.howtographql.com/advanced/2-more-graphql-concepts/
// other reference: https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// other reference: https://www.apollographql.com/docs/apollo-server/essentials/data.html

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//     directive @requireAuth on FIELD_DEFINITION
//     type Query {
//         hello: String
//     }
//     type Mutation {
//         hello(name: String): String
//     }
//     type Page {
//         number: Int
//         size: Int
//         items: Int
//         totalItems: Int
//     }
// `;

// const resolvers = {
//     Query: {
//         hello: () => "Hello world!",
//     },
//     Mutation: {
//         hello: (_: any, {name}: any) => `Hello ${name}`
//     }
// };


//
// const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
//     resolvers: [CredentialResolver],
// });
//
// const schema = makeExecutableSchema({ typeDefs, resolvers });

//
// const schema = buildSchema({
//     resolvers: [CredentialResolver]
// });
// const schema = makeExecutableSchema({
//   typeDefs: [
//       typeDefs,
//       Credential,
//       Confirmation,
//       Session,
//       Company,
//       AssetNameType,
//       AssetIdentifierType,
//       AssetRoleType,
//       Brand,
//       UnitOfMeasure,
//       AssetCharacteristic,
//       AssetType,
//       Asset,
//       AccessRole,
//       People,
//       User
//   ],
//   resolvers: merge(
//       resolvers,
//       CredentialResolvers,
//       ConfirmationResolvers,
//       SessionResolvers,
//       CompanyResolvers,
//       AssetNameTypeResolvers,
//       AssetIdentifierTypeResolvers,
//       AssetRoleTypeResolvers,
//       BrandResolvers,
//       UnitOfMeasureResolvers,
//       AssetCharacteristicResolvers,
//       AssetTypeResolvers,
//       AssetResolvers,
//       AccessRoleResolvers,
//       PeopleResolvers,
//       UserResolvers
//   ),
//     schemaDirectives: {
//         requireAuth: RequireAuth
//     }
// });

import { CredentialResolver } from "./authentication/credential.resolver";
import { ConfirmationResolver } from "./authentication/confirmation.resolver";

const RESOLVERS: any[] = [CredentialResolver, ConfirmationResolver];
export default RESOLVERS;