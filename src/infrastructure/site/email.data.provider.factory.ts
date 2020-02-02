import {RepositoryKind} from "../../repository.kind";
import {NedbEmailDataProvider} from "./db/nedb.email.data.provider";
import {RestEmailDataProvider} from "./rest/rest.email.data.provider";
import {properties} from "../../properties.helpers";
import {EmailDataProvider} from "../../port/email.data.provider";


export function createEmailRepository(kind?: RepositoryKind): EmailDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbEmailDataProvider();
    case RepositoryKind.Rest:
      return new RestEmailDataProvider();
    default:
      throw new Error(`Unknown Email Data Provider ${k}`);

  }
}
