import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierAssignmentRepository} from "../../repository/asset.identifier.assignment.repository";
import {properties} from "../../properties.helpers";
import {AssetIdentifierAssignmentRepositoryRestAdapter} from "./rest/asset.identifier.assignment.repository.rest.adapter";
import {AssetIdentifierAssignmentRepositoryNeDbAdapter} from "./db/asset.identifier.assignment.repository.db.adapter";

export function createAssetIdentifierAssignmentRepository(kind?: RepositoryKind): AssetIdentifierAssignmentRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetIdentifierAssignmentRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetIdentifierAssignmentRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Identifier Assignment Repository ${k}`);
  }

}