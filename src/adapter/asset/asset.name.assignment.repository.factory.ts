import {RepositoryKind} from "../../repository.kind";
import {AssetNameAssignmentRepository} from "../../repository/asset.name.assignment.repository";
import {properties} from "../../properties.helpers";
import {AssetNameAssignmentRepositoryRestAdapter} from "./rest/asset.name.assignment.repository.rest.adapter";
import {AssetNameAssignmentRepositoryNeDbAdapter} from "./db/asset.name.assignment.repository.db.adapter";

export function createAssetNameAssignmentRepository(kind?: RepositoryKind): AssetNameAssignmentRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetNameAssignmentRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetNameAssignmentRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Name Assignment Repository ${k}`);
  }

}