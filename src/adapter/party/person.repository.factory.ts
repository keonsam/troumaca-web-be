import {RepositoryKind} from "../../repository.kind";
import {PersonRepository} from "../../repository/person.repository";
import {PersonDbRepositoryAdapter} from "./person.db.repository.adapter";
import {PersonRestRepositoryAdapter} from "./person.rest.repository.adapter";

export function createPersonRepository(kind?: RepositoryKind): PersonRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new PersonDbRepositoryAdapter();
    case RepositoryKind.Rest:
      return new PersonRestRepositoryAdapter();
    default:
      return new PersonDbRepositoryAdapter();
  }
}
