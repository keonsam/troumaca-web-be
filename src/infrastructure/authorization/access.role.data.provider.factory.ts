import {AccessRoleDataProvider} from "../../port/access.role.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbAccessRoleDataProvider} from "./db/nedb.access.role.data.provider";
import {RestAccessRoleDataProvider} from "./rest/rest.access.role.data.provider";
import {properties} from "../../properties.helpers";


export function createAccessRoleDataProvider(kind?: RepositoryKind): AccessRoleDataProvider {
  const type: number = properties.get("access.role.type.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAccessRoleDataProvider();
    case RepositoryKind.Rest:
      return new RestAccessRoleDataProvider();
    default:
      throw new Error(`Unknown Access Role Data Provider ${k}`);
  }
}
