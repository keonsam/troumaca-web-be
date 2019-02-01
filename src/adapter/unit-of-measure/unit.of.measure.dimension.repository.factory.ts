import {UnitOfMeasureDimensionRepository} from "../../repository/unit.of.measure.dimension.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasureDimensionRepositoryNeDbAdapter} from "./unit.of.measure.dimension.repository.db.adapter";
import {UnitOfMeasureDimensionRepositoryRestAdapter} from "./unit.of.measure.dimension.repository.rest.adapter";

export function createUnitOfMeasureDimensionRepository(kind?: RepositoryKind): UnitOfMeasureDimensionRepository {
  const type: number = properties.get("unit.of.measure.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasureDimensionRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasureDimensionRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure Dimension Repository Type ${k}`);
  }
}
