import {ConfirmationDataProvider} from "../../../port/confirmation.data.provider";
import {RepositoryKind} from "../../../repository.kind";
import {NedbConfirmationDataProvider} from "./db/nedb.confirmation.data.provider";
import {RestConfirmationDataProvider} from "./rest/rest.confirmation.data.provider";
import {properties} from "../../../properties.helpers";

export function createConfirmationDataProvider(kind?: RepositoryKind): ConfirmationDataProvider {
  const type: number = properties.get("confirmation.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbConfirmationDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("credential.host.port") as string;
      return new RestConfirmationDataProvider(uri);
    default:
      throw new Error(`Unknown Confirmation Data Provider ${k}`);
  }
}
