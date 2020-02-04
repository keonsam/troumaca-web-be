import {UnitOfMeasurementConversionDataProvider} from "../../port/unit.of.measurement.conversion.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbUnitOfMeasurementConversionDataProvider} from "./db/nedb.unit.of.measurement.conversion.data.provider";
import {RestUnitOfMeasurementConversionDataProvider} from "./rest/rest.unit.of.measurement.conversion.data.provider";

export function createUnitOfMeasurementConversionRepository(kind?: RepositoryKind): UnitOfMeasurementConversionDataProvider {
  const type: number = properties.get("unit.of.measurement.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUnitOfMeasurementConversionDataProvider();
    case RepositoryKind.Rest:
      return new RestUnitOfMeasurementConversionDataProvider();
    default:
      throw new Error(`Unknown Unit Of Measure Conversion Data Provider ${k}`);
  }
}
