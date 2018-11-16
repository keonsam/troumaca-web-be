import {RepositoryKind} from "../../repository.kind";
import {PersonRepository} from "../../repository/person.repository";
import {PersonDbRepositoryAdapter} from "./person.db.repository.adapter";
import {PersonRepositoryRestAdapter} from "./person.repository.rest.adapter";
import {properties} from "../../properties.helpers";

export function createPersonRepository(kind?: RepositoryKind): PersonRepository {
  const type: number = properties.get("party.repository.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new PersonDbRepositoryAdapter();
    case RepositoryKind.Rest:
      return new PersonRepositoryRestAdapter();
    default:
      return new PersonDbRepositoryAdapter();
  }
}
