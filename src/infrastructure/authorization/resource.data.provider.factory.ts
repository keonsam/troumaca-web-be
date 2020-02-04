import {ResourceDataProvider} from "../../port/resource.data.provider";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { NedbResourceDataProvider } from "./db/nedb.resource.data.provider";
import { RestResourceDataProvider } from "./rest/rest.resource.data.provider";


export function createResourceDataProvider(kind?: RepositoryKind): ResourceDataProvider {
    const type: number = properties.get("resource.data.provider.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbResourceDataProvider();
    case RepositoryKind.Rest:
      return new RestResourceDataProvider();
    default:
      throw new Error(`Unknown Resource Data Provider ${k}`);
  }
}

