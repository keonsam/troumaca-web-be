import {properties} from "../../properties.helpers";
import {RepositoryKind} from "../../repository.kind";
import {RestRegistrarDataProvider} from "./rest/rest.registrar.data.provider";
import {NedbRegistrarDataProvider} from "./db/nedb.registrar.data.provider";
import {RegisterDataProvider} from "../../port/register.data.provider";

export function createRegistrarDataProvider(): RegisterDataProvider {
  const type: number = properties.get("registrar.data.provider.type") as number;
  const k: RepositoryKind = (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbRegistrarDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("registrar.host.port") as string;
      return new RestRegistrarDataProvider(uri);
    default:
      throw new Error(`Unknown Registrar Data Provider ${k}`);
  }
}
