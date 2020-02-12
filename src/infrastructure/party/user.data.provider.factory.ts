import {UserDataProvider} from "../../port/user.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbUserDataProvider} from "./db/nedb.user.data.provider";
import {RestUserDataProvider} from "./rest/rest.user.data.provider";

export function createUserRepository(kind?: RepositoryKind): UserDataProvider {
  const type: number = properties.get("user.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUserDataProvider();
    case RepositoryKind.Rest:
      return new RestUserDataProvider();
    default:
      throw new Error(`Unknown User Data Provider ${k}`);
  }
}
