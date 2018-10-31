import {PhotoRepository} from "../../repository/photo.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {PhotoRepositoryNeDbAdapter} from "./photo.repository.db.adapter";
import {PhotoRepositoryRestAdapter} from "./photo.repository.rest.adapter";


export function createPhotoRepository(kind?: RepositoryKind): PhotoRepository {
  const type: number = properties.get("photo.repository.type") as number;
  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new PhotoRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new PhotoRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Photo Repository Type ${k}`);
  }
}
