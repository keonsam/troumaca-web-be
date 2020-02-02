import {ConfirmationDataProvider} from "../../port/confirmation.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {NedbConfirmationDataProvider} from "./db/nedb.confirmation.data.provider";
import {RestConfirmationDataProvider} from "./rest/rest.confirmation.data.provider";
import {properties} from "../../properties.helpers";

export function createCredentialConfirmationRepositoryFactory(kind?: RepositoryKind): ConfirmationDataProvider {

  const type: number = properties.get("confirmation.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbConfirmationDataProvider();
    case RepositoryKind.Rest:
      return new RestConfirmationDataProvider();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
