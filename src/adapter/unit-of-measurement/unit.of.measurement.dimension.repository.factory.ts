import {UnitOfMeasurementDimensionRepository} from "../../repository/unit.of.measurement.dimension.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasurementDimensionRepositoryNeDbAdapter} from "./db/unit.of.measurement.dimension.repository.db.adapter";
import {UnitOfMeasurementDimensionRepositoryRestAdapter} from "./rest/unit.of.measurement.dimension.repository.rest.adapter";

export function createUnitOfMeasurementDimensionRepository(kind?: RepositoryKind): UnitOfMeasurementDimensionRepository {
  const type: number = properties.get("unit.of.measurement.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasurementDimensionRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasurementDimensionRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure Dimension Repository Type ${k}`);
  }
}
