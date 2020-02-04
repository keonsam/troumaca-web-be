import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import { UnitOfMeasurementDataProvider } from "../../port/unit.of.measurement.data.provider";
import { NedbUnitOfMeasurementDataProvider } from "../unit-of-measurement/db/nedb.unit.of.measurement.data.provider";
import { RestUnitOfMeasurementDataProvider } from "../unit-of-measurement/rest/rest.unit.of.measurement.data.provider";


export function createUnitOfMeasureDataProvider(kind?: RepositoryKind): UnitOfMeasurementDataProvider {
  const type: number = properties.get("asset.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUnitOfMeasurementDataProvider();
    case RepositoryKind.Rest:
      return new RestUnitOfMeasurementDataProvider();
    default:
      throw new Error(`Unknown Asset Role Type Data Provider ${k}`);
  }
}
