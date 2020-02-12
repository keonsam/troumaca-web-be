import {AccessRole} from "./access.role";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class AccessRoles {
    @Field( () => [AccessRole])
    accessRoles: AccessRole[];
}
