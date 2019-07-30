import {RepositoryKind} from "../../repository.kind";
import {CredentialRepository} from "../../repository/credential.repository";
import {properties} from "../../properties.helpers";
import {CredentialRepositoryNeDbAdapter} from "./credential.repository.db.adapter";
import {CredentialRepositoryRestAdapter} from "./credential.repository.rest.adapter";


export function createCredentialRepositoryFactory(kind?: RepositoryKind): CredentialRepository {
  const type: number = properties.get("credential.repository.type") as number;
  console.log(type);

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new CredentialRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new CredentialRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
