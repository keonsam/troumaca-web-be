import {RepositoryKind} from "../../repository.kind";
import {PersonDataProvider} from "../../port/person.data.provider";
import {NedbPersonDataProvider} from "./db/nedb.person.data.provider";
import {RestPersonDataProvider} from "./rest/rest.person.data.provider";
import {properties} from "../../properties.helpers";

export function createPersonDataProvider(kind?: RepositoryKind): PersonDataProvider {
  const type: number = properties.get("party.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbPersonDataProvider();
    case RepositoryKind.Rest:
      return new RestPersonDataProvider();
    default:
      throw new Error(`Unknown Person Data Provider ${k}`);
  }
}
