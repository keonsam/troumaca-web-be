import {ResourceTypeDataProvider} from "../../port/resource.type.data.provider";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { NedbResourceTypeDataProvider } from "./db/nedb.resource.type.data.provider";
import { RestResourceTypeDataProvider } from "./rest/rest.resource.type.data.provider";

export function createResourceTypeDataProvider(kind?: RepositoryKind): ResourceTypeDataProvider {
    const type: number = properties.get("resource.type.data.provider.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
    switch (k) {
      case RepositoryKind.Nedb:
        return new NedbResourceTypeDataProvider();
      case RepositoryKind.Rest:
        return new RestResourceTypeDataProvider();
      default:
        throw new Error(`Unknown Resource Type Data Provider ${k}`);
    }
}

