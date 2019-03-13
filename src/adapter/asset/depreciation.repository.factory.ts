import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {DepreciationRepository} from "../../repository/depreciation.repository";
import {DepreciationRepositoryNeDbAdapter} from "./db/depreciation.repository.db.adapter";
import {DepreciationRepositoryRestAdapter} from "./rest/depreciation.repository.rest.adapter";

export function createDepreciationRepository(kind?: RepositoryKind): DepreciationRepository {
  const type: number = properties.get("depreciation.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new DepreciationRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new DepreciationRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Credential Repository Type ${k}`);
  }
}
