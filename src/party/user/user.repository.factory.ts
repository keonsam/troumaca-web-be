import { UserRepository } from "./user.repository";
import { RepositoryKind } from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { UserRepositoryNeDbAdapter } from "./adapter/user.repository.db.adapter";
import { UserRepositoryRestAdapter } from "./adapter/user.repository.rest.adapter";

export function createUserRepository(kind?: RepositoryKind): UserRepository {
  const type: number = properties.get("user.repository.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new UserRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UserRepositoryRestAdapter();
    default:
      throw new Error(`Unknown User Repository Type ${k}`);
  }
}
