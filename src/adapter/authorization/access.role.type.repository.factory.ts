import {AccessRoleTypeRepository} from "../../repository/access.role.type.repository";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { AccessRoleTypeRepositoryDbAdapter } from "./access.role.type.repository.db.adapter";
import { AccessRoleTypeRepositoryRestAdapter } from "./access.role.type.repository.rest.adapter";

export function createAccessRoleTypeRepositoryFactory(kind?: RepositoryKind): AccessRoleTypeRepository {
    const type: number = properties.get("access.role.type.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new AccessRoleTypeRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new AccessRoleTypeRepositoryRestAdapter();
    default:
      return new AccessRoleTypeRepositoryDbAdapter();
  }
}
