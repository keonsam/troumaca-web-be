import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbLoginDataProvider} from "./db/nedb.login.data.provider";
import {RestLoginDataProvider} from "./rest/rest.login.data.provider";
import {LoginDataProvider} from "../../port/login.data.provider";


export function createLoginDataProvider(kind?: RepositoryKind): LoginDataProvider {
  const type: number = properties.get("login.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbLoginDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("login.host.port") as string;
      return new RestLoginDataProvider(uri);
    default:
      throw new Error(`Unknown Login Data Provider ${k}`);
  }
}
