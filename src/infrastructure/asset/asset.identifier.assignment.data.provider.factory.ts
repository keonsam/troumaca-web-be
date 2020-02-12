import {RepositoryKind} from "../../repository.kind";
import {AssetIdentifierAssignmentDataProvider} from "../../port/asset.identifier.assignment.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetIdentifierAssignmentDataProvider} from "./rest/rest.asset.identifier.assignment.data.provider";
import {NedbAssetIdentifierAssignmentDataProvider} from "./db/nedb.asset.identifier.assignment.data.provider";

export function createAssetIdentifierAssignmentDataProvider(kind?: RepositoryKind): AssetIdentifierAssignmentDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetIdentifierAssignmentDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetIdentifierAssignmentDataProvider();
    default:
      throw new Error(`Unknown Asset Identifier Assignment Data Provider ${k}`);
  }

}