import {UnitOfMeasurementRepository} from "../../repository/unit.of.measurement.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasurementRepositoryNeDbAdapter} from "./db/unit.of.measurement.repository.db.adapter";
import {UnitOfMeasurementRepositoryRestAdapter} from "./rest/unit.of.measurement.repository.rest.adapter";

export function createUnitOfMeasurementRepository(kind?: RepositoryKind): UnitOfMeasurementRepository {
  const type: number = properties.get("unit.of.measurement.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasurementRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasurementRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure Repository Type ${k}`);
  }
}
