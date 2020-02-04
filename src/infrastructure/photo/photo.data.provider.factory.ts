import {PhotoDataProvider} from "../../port/photo.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbPhotoDataProvider} from "./db/nedb.photo.data.provider";
import {RestPhotoDataProvider} from "./rest/rest.photo.data.provider";


export function createPhotoDataProvider(kind?: RepositoryKind): PhotoDataProvider {
  const type: number = properties.get("photo.data.provider.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbPhotoDataProvider();
    case RepositoryKind.Rest:
      return new RestPhotoDataProvider();
    default:
      throw new Error(`Unknown Photo Data Provider ${k}`);
  }
}
