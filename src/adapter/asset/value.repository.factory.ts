import {ValueRepository} from "../../repository/value.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {ValueRepositoryNeDbAdapter} from "./value.repository.db.adapter";
import {ValueRepositoryRestAdapter} from "./value.repository.rest.adapter";


export function createValueRepository(kind?: RepositoryKind): ValueRepository {
  const type: number = properties.get("value.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new ValueRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new ValueRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Value Repository Type ${k}`);
  }
}
