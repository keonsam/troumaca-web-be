import { ConfirmationRepository } from "../../repository/confirmation.repository";
import { RepositoryKind } from "../../repository.kind";
import { ConfirmationRepositoryNeDbAdapter } from "./confirmation.repository.db.adapter";
import { ConfirmationRepositoryRestAdapter } from "./confirmation.repository.rest.adapter";
import { properties } from "../../properties.helpers";

export function createCredentialConfirmationRepositoryFactory(kind?: RepositoryKind): ConfirmationRepository {

    const type: number = properties.get("confirmation.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

    switch (k) {
    case RepositoryKind.Nedb:
      return new ConfirmationRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new ConfirmationRepositoryRestAdapter();
    default:
        throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
