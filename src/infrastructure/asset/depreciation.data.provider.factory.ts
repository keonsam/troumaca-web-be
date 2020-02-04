import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {DepreciationDataProvider} from "../../port/depreciation.data.provider";
import {NedbDepreciationDataProvider} from "./db/nedb.depreciation.data.provider";
import {RestDepreciationDataProvider} from "./rest/rest.depreciation.data.provider";

export function createDepreciationDataProvider(kind?: RepositoryKind): DepreciationDataProvider {
  const type: number = properties.get("depreciation.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbDepreciationDataProvider();
    case RepositoryKind.Rest:
      return new RestDepreciationDataProvider();
    default:
      throw new Error(`Unknown Depreciation Data Provider ${k}`);
  }
}
