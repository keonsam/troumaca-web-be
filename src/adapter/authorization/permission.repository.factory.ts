import {PermissionRepository} from "../../repository/permission.repository";
import {RepositoryKind} from "../../repository.kind";
import { PermissionRepositoryDbAdapter } from "./permission.repository.db.adapter";
import { PermissionRepositoryRestAdapter } from "./permission.repository.rest.adapter";
import { properties } from "../../properties.helpers";

export function createPermissionRepositoryFactory(kind?: RepositoryKind): PermissionRepository {
    const type: number = properties.get("permission.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new PermissionRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new PermissionRepositoryRestAdapter();
    default:
      return new PermissionRepositoryDbAdapter();
  }
}



