import {Ctx, Query, Resolver} from "type-graphql";

@Resolver()
export class AccountsResolver {

    @Query()
    getAccountsMenu(@Ctx("req") req?: any) {

    }
}
