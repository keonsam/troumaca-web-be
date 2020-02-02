import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicAssignmentDataProvider} from "../../port/asset.characteristic.assignment.data.provider";
import {properties} from "../../properties.helpers";
import {RestAssetCharacteristicAssignmentDataProvider} from "./rest/rest.asset.characteristic.assignment.data.provider";
import {NedbAssetCharacteristicAssignmentDataProvider} from "./db/nedb.asset.characteristic.assignment.data.provider";

export function createAssetCharacteristicAssignmentDataProvider(kind?: RepositoryKind): AssetCharacteristicAssignmentDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbAssetCharacteristicAssignmentDataProvider();
    case RepositoryKind.Rest:
      return new RestAssetCharacteristicAssignmentDataProvider();
    default:
      throw new Error(`Unknown Asset Characteristic Assignment Data Provider ${k}`);
  }

}