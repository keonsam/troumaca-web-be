import {UnitOfMeasurementSystemRepository} from "../../repository/unit.of.measurement.system.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasurementSystemRepositoryNeDbAdapter} from "./db/unit.of.measurement.system.repository.db.adapter";
import {UnitOfMeasurementSystemRepositoryRestAdapter} from "./rest/unit.of.measurement.system.repository.rest.adapter";

export function createUnitOfMeasurementSystemRepository(kind?: RepositoryKind): UnitOfMeasurementSystemRepository {
  const type: number = properties.get("unit.of.measurement.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasurementSystemRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasurementSystemRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure System Repository Type ${k}`);
  }
}
