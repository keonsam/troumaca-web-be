// using: https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// other reference: https://graphql.org/learn/queries/
// other reference: https://www.howtographql.com/advanced/2-more-graphql-concepts/
// other reference: https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// other reference: https://www.apollographql.com/docs/apollo-server/essentials/data.html

import { CredentialResolver } from "./authentication/credential.resolver";
import { ConfirmationResolver } from "./authentication/confirmation.resolver";
import { SessionResolver } from "./authorization/session.resolver";

const RESOLVERS: any[] = [CredentialResolver, ConfirmationResolver, SessionResolver];
export default RESOLVERS;
