// using: https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
// other reference: https://graphql.org/learn/queries/
// other reference: https://www.howtographql.com/advanced/2-more-graphql-concepts/
// other reference: https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// other reference: https://www.apollographql.com/docs/apollo-server/essentials/data.html

import { CredentialResolver } from "../../presentation/authentication/credential/credential.resolver";
import { ConfirmationResolver } from "../../presentation/authentication/confirmation/confirmation.resolver";
import { SessionResolver } from "../../presentation/session/session.resolver";
import { AssetCharacteristicResolver } from "../../presentation/asset/asset.characteristic.resolver";
import { AssetTypeResolver } from "../../presentation/asset/asset.type.resolver";
import { AssetResolver } from "../../presentation/asset/asset.resolver";
import {CharacteristicTypeResolver} from "../../presentation/asset/characteristic.type.resolver";
import {PeopleResolver} from "../../presentation/party/people.resolver";
import {SiteResolver} from "../../presentation/site/site.resolver";
import {AssetRoleTypeResolver} from "../../presentation/asset/asset.role.type.resolver";
import {BrandResolver} from "../../presentation/asset/brand.resolver";
import {AssetCategoryLegalValueResolver} from "../../presentation/asset/asset.category.legal.value.resolver";
import {RegisterResolver} from "../../presentation/register/register.resolver";
import {LoginResolver} from "../../presentation/login/login.resolver";

const RESOLVERS: any[] = [
    //Verified
    RegisterResolver,
    LoginResolver,
    CredentialResolver,
    ConfirmationResolver,

    // Partially verified
    AssetTypeResolver,
    AssetResolver,
    SessionResolver,

    // Others
    AssetCharacteristicResolver,
    CharacteristicTypeResolver,
    AssetRoleTypeResolver,

    PeopleResolver,
    SiteResolver,
    BrandResolver,
    AssetCategoryLegalValueResolver
];

export default RESOLVERS;
