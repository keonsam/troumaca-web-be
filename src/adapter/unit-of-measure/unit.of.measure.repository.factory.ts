import {UnitOfMeasureRepository} from "../../repository/unit.of.measure.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasureRepositoryNeDbAdapter} from "./unit.of.measure.repository.db.adapter";
import {UnitOfMeasureRepositoryRestAdapter} from "./unit.of.measure.repository.rest.adapter";

export function createUnitOfMeasureRepository(kind?: RepositoryKind): UnitOfMeasureRepository {
  const type: number = properties.get("unit.of.measure.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasureRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasureRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure Repository Type ${k}`);
  }
}
