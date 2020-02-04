import {RepositoryKind} from "../../repository.kind";
import {NedbPostOfficeBoxDataProvider} from "./db/nedb.post.office.box.data.provider";
import {RestPostOfficeBoxDataProvider} from "./rest/rest.post.office.box.data.provider";
import {properties} from "../../properties.helpers";
import {PostOfficeBoxDataProvider} from "../../port/post.office.box.data.provider";


export function createPostOfficeBoxDataProvider(kind?: RepositoryKind): PostOfficeBoxDataProvider {
  const type: number = properties.get("site.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbPostOfficeBoxDataProvider();
    case RepositoryKind.Rest:
      return new RestPostOfficeBoxDataProvider();
    default:
      throw new Error(`Unknown Email Data Provider ${k}`);

  }
}
