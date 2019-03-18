import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import { UnitOfMeasurementRepository } from "../../repository/unit.of.measurement.repository";
import { UnitOfMeasurementRepositoryNeDbAdapter } from "../unit-of-measurement/db/unit.of.measurement.repository.db.adapter";
import { UnitOfMeasurementRepositoryRestAdapter } from "../unit-of-measurement/rest/unit.of.measurement.repository.rest.adapter";


export function createUnitOfMeasureRepositoryFactory(kind?: RepositoryKind): UnitOfMeasurementRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasurementRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasurementRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Role Type Repository Type ${k}`);
  }
}
