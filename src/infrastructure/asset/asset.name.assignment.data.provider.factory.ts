import {RepositoryKind} from "../../repository.kind";
import {AssetNameAssignmentDataProvider} from "../../port/asset.name.assignment.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetNameAssignmentDataProvider} from "./rest/rest.asset.name.assignment.data.provider";
import {NedbAssetNameAssignmentDataProvider} from "./db/nedb.asset.name.assignment.data.provider";

export function createAssetNameAssignmentDataProvider(kind?: RepositoryKind): AssetNameAssignmentDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetNameAssignmentDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetNameAssignmentDataProvider();
    default:
      throw new Error(`Unknown Asset Name Assignment Data Provider ${k}`);
  }

}