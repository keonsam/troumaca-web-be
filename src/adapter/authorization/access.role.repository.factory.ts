import { AccessRoleRepository } from "../../repository/access.role.repository";
import { RepositoryKind } from "../../repository.kind";
import {AccessRoleDBRepository} from "./access.role.db.repository";
import {AccessRoleRestRepository} from "./access.role.rest.repository";


export function createAccessRoleRepository(kind?: RepositoryKind): AccessRoleRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new AccessRoleDBRepository();
    case RepositoryKind.Rest:
      return new AccessRoleRestRepository();
    default:
      return new AccessRoleDBRepository();
  }
}
