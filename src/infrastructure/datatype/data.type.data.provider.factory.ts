import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbDataTypeDataProvider} from "./db/nedb.data.type.data.provider";
import {RestDataTypeDataProvider} from "./rest/rest.data.type.data.provider";
import {DataTypeDataProvider} from "../../port/data.type.data.provider";

export function createDataTypeDataProvider(kind?: RepositoryKind):DataTypeDataProvider {
  const type: number = properties.get("data.type.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbDataTypeDataProvider();
    case RepositoryKind.Rest:
      return new RestDataTypeDataProvider();
    default:
      throw new Error(`Unknown Data Type Repository Type ${k}`);
  }
}
