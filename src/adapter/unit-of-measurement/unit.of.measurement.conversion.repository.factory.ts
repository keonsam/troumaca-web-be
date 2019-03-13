import {UnitOfMeasurementConversionRepository} from "../../repository/unit.of.measurement.conversion.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasurementConversionRepositoryNeDbAdapter} from "./db/unit.of.measurement.conversion.repository.db.adapter";
import {UnitOfMeasurementConversionRepositoryRestAdapter} from "./rest/unit.of.measurement.conversion.repository.rest.adapter";

export function createUnitOfMeasurementConversionRepository(kind?: RepositoryKind): UnitOfMeasurementConversionRepository {
  const type: number = properties.get("unit.of.measurement.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasurementConversionRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasurementConversionRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure Conversion Repository Type ${k}`);
  }
}
