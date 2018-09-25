import { RepositoryKind } from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { DataTypeRepositoryNeDbAdapter } from "./data.type.repository.db.adapter";
import { DataTypeRepositoryRestAdapter } from "./data.type.repository.rest.adapter";

export function createDataTypeRepository(kind?: RepositoryKind) {
  const type: number = properties.get("data.type.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new DataTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new DataTypeRepositoryRestAdapter();
    default:
        throw new Error(`Unknown Data Type Repository Type ${k}`);
  }
}
