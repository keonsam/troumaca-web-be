import {Arg, Ctx, Query, Resolver, UseMiddleware} from "type-graphql";
import {isAuth} from "../../middleware/isAuth";
import {HeaderBaseOptions} from "../../header.base.options";
import {ApolloError} from "apollo-server-errors";
import {ERROR_CODE} from "../../domain/model/error/error.code";
import {AccessRoleOrchestrator} from "../../application/service/authorization/access.role.orchestrator";
import {AccessRole} from "../../domain/model/authorization/access.role";
import {AccessRoles} from "../../domain/model/authorization/access.roles";
import {AccessRoleInput} from "./dto/access.role.input";

@Resolver()
export class AccessRoleResolver {

    private accessRoleOrchestrator: AccessRoleOrchestrator = new AccessRoleOrchestrator();

    @UseMiddleware(isAuth)
    @Query(() => AccessRoles)
    async findAccessRoles(@Arg("searchStr", {nullable: true}) searchStr?: string,
                          @Ctx("req") req?: any): Promise<AccessRoles> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.accessRoleOrchestrator.findAccessRoles(searchStr, 10, headerOptions)
            .toPromise()
            .then(res => {
                const accessRoles: AccessRoles = new AccessRoles();
                accessRoles.accessRoles = res;
                return accessRoles;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query(() => AccessRole)
    async getAccessRole(
        @Arg("accessRoleId") accessRoleId: string,
        @Ctx("req") req?: any
    ): Promise<AccessRole> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.accessRoleOrchestrator.getAccessRoleById(accessRoleId, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query(() => AccessRole)
    async addAccessRole(
        @Arg("accessRole", () => AccessRole) accessRole: AccessRoleInput,
        @Ctx("req") req?: any
    ): Promise<AccessRole> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const access: AccessRole = new AccessRole();
        Object.assign(access, accessRole);
        return await this.accessRoleOrchestrator.addAccessRole(access, headerOptions)
            .toPromise()
            .then(res => {
                return res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query(() => Boolean)
    async updateAccessRole(
        @Arg("accessRoleId") accessRoleId: string,
        @Arg("accessRole", () => AccessRole) accessRole: AccessRoleInput,
        @Ctx("req") req?: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        const access: AccessRole = new AccessRole();
        Object.assign(access, accessRole);
        return await this.accessRoleOrchestrator.updateAccessRole(accessRoleId, access, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }

    @UseMiddleware(isAuth)
    @Query(() => Boolean)
    async deleteAccessRole(
        @Arg("accessRoleId") accessRoleId: string,
        @Ctx("req") req?: any
    ): Promise<boolean> {
        const headerOptions: HeaderBaseOptions = new HeaderBaseOptions(req);
        return await this.accessRoleOrchestrator.deleteAccessRole(accessRoleId, headerOptions)
            .toPromise()
            .then(res => {
                return !!res;
            }, error => {
                console.log(error);
                throw new ApolloError(error, ERROR_CODE);
            });
    }
}
