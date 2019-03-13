import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicAssignmentRepository} from "../../repository/asset.characteristic.assignment.repository";
import {properties} from "../../properties.helpers";
import {AssetCharacteristicAssignmentRepositoryRestAdapter} from "./rest/asset.characteristic.assignment.repository.rest.adapter";
import {AssetCharacteristicAssignmentRepositoryNeDbAdapter} from "./db/asset.characteristic.assignment.repository.db.adapter";

export function createAssetCharacteristicAssignmentRepository(kind?: RepositoryKind): AssetCharacteristicAssignmentRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetCharacteristicAssignmentRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetCharacteristicAssignmentRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Characteristic Assignment Repository ${k}`);
  }

}