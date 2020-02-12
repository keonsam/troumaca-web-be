import {UnitOfMeasurementSystemDataProvider} from "../../port/unit.of.measurement.system.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbUnitOfMeasurementSystemDataProvider} from "./db/nedb.unit.of.measurement.system.data.provider";
import {RestUnitOfMeasurementSystemDataProvider} from "./rest/rest.unit.of.measurement.system.data.provider";

export function createUnitOfMeasurementSystemRepository(kind?: RepositoryKind): UnitOfMeasurementSystemDataProvider {
  const type: number = properties.get("unit.of.measurement.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUnitOfMeasurementSystemDataProvider();
    case RepositoryKind.Rest:
      return new RestUnitOfMeasurementSystemDataProvider();
    default:
      throw new Error(`Unknown Unit Of Measure System Data Provider ${k}`);
  }
}
