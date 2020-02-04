import {UnitOfMeasurementDataProvider} from "../../port/unit.of.measurement.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbUnitOfMeasurementDataProvider} from "./db/nedb.unit.of.measurement.data.provider";
import {RestUnitOfMeasurementDataProvider} from "./rest/rest.unit.of.measurement.data.provider";

export function createUnitOfMeasurementRepository(kind?: RepositoryKind): UnitOfMeasurementDataProvider {
  const type: number = properties.get("unit.of.measurement.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUnitOfMeasurementDataProvider();
    case RepositoryKind.Rest:
      return new RestUnitOfMeasurementDataProvider();
    default:
      throw new Error(`Unknown Unit Of Measure Data Provider ${k}`);
  }
}
