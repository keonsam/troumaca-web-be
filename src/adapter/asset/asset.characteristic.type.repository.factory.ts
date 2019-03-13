import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicTypeRepository} from "../../repository/asset.characteristic.type.repository";
import {properties} from "../../properties.helpers";
import {AssetCharacteristicTypeRepositoryRestAdapter} from "./rest/asset.characteristic.type.repository.rest.adapter";
import {AssetCharacteristicTypeRepositoryNeDbAdapter} from "./db/asset.characteristic.type.repository.db.adapter";

export function createAssetCharacteristicTypeRepository(kind?: RepositoryKind): AssetCharacteristicTypeRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetCharacteristicTypeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetCharacteristicTypeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Characteristic Type Repository ${k}`);
  }

}