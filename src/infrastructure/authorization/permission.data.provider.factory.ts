import {PermissionDataProvider} from "../../port/permission.data.provider";
import {RepositoryKind} from "../../repository.kind";
import { NedbPermissionDataProvider } from "./db/nedb.permission.data.provider";
import { RestPermissionDataProvider } from "./rest/rest.permission.data.provider";
import { properties } from "../../properties.helpers";

export function createPermissionDataProvider(kind?: RepositoryKind): PermissionDataProvider {
    const type: number = properties.get("permission.data.provider.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
    switch (k) {
      case RepositoryKind.Nedb:
        return new NedbPermissionDataProvider();
      case RepositoryKind.Rest:
        return new RestPermissionDataProvider();
      default:
        throw new Error(`Unknown Permission Data Provider ${k}`);
  }
}



