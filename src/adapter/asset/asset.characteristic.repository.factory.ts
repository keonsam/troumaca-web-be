import {RepositoryKind} from "../../repository.kind";
import {AssetCharacteristicRepository} from "../../repository/asset.characteristic.repository";
import {properties} from "../../properties.helpers";
import {AssetCharacteristicRepositoryRestAdapter} from "./rest/asset.characteristic.repository.rest.adapter";
import {AssetCharacteristicRepositoryNeDbAdapter} from "./db/asset.characteristic.repository.db.adapter";

export function createAssetCharacteristicRepositoryFactory(kind?: RepositoryKind): AssetCharacteristicRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new AssetCharacteristicRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssetCharacteristicRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Characteristic Type Repository ${k}`);
  }

}