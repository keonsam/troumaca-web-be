import {ResourcePermissionDataProvider} from "../../port/resource.permission.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbResourcePermissionDataProvider} from "./db/nedb.resource.permission.data.provider";
import {RestResourcePermissionDataProvider} from "./rest/rest.resource.permission.data.provider";
import {properties} from "../../properties.helpers";

export function createResourcePermissionDataProvider(kind?: RepositoryKind): ResourcePermissionDataProvider {
  const type: number = properties.get("permission.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (kind) {
    case RepositoryKind.Nedb:
      return new NedbResourcePermissionDataProvider();
    case RepositoryKind.Rest:
      return new RestResourcePermissionDataProvider();
    default:
      throw new Error(`Unknown Resource Permission Data Provider ${k}`);
  }
}



