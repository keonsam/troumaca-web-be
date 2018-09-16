import { SessionRepository } from "../../repository/session.repository";
import { RepositoryKind } from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { SessionRepositoryNeDbAdapter } from "./session.repository.db.adapter";
import { SessionRepositoryRestAdapter } from "./session.repository.rest.adapter";

export function createSessionRepositoryFactory(kind?: RepositoryKind): SessionRepository {
    const type: number = properties.get("session.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new SessionRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new SessionRepositoryRestAdapter();
    default:
        throw new Error(`Unknown Session Repository Type ${k}`);
  }
}
