import {ConfirmationRepository} from "./confirmation.repository";
import {RepositoryKind} from "../../../repository.kind";
import {ConfirmationRepositoryNeDbAdapter} from "./adapter/confirmation.repository.db.adapter";
import {ConfirmationRepositoryRestAdapter} from "./adapter/confirmation.repository.rest.adapter";

export function createCredentialConfirmationRepositoryFactory(kind?:RepositoryKind):ConfirmationRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ConfirmationRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new ConfirmationRepositoryRestAdapter();
    default:
      return new ConfirmationRepositoryNeDbAdapter();
  }
}
