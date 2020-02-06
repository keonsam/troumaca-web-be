import {RepositoryKind} from "../../../repository.kind";
import {CredentialDataProvider} from "../../../port/credential.data.provider";
import {properties} from "../../../properties.helpers";
import {NedbCredentialDataProvider} from "./db/nedb.credential.data.provider";
import {RestCredentialDataProvider} from "./rest/rest.credential.data.provider";


export function createCredentialDataProvider(kind?: RepositoryKind): CredentialDataProvider {
  const type: number = properties.get("credential.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbCredentialDataProvider();
    case RepositoryKind.Rest:
      const uri: string = properties.get("credential.host.port") as string;
      return new RestCredentialDataProvider(uri);
    default:
      throw new Error(`Unknown Credential Data Provider ${k}`);
  }
}
