import {RepositoryKind} from "../../repository.kind";
import {CredentialRepository} from "./credential.repository";
import {properties} from "../../properties.helpers";
import {CredentialRepositoryNeDbAdapter} from "./adapter/credential.repository.db.adapter";
import {CredentialRepositoryRestAdapter} from "./adapter/credential.repository.rest.adapter";





export function createCredentialRepositoryFactory(kind?:RepositoryKind):CredentialRepository {
  let type:number = properties.get("credential.repository.type") as number;

  let k:RepositoryKind = (kind) ? kind : (type == 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new CredentialRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new CredentialRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
