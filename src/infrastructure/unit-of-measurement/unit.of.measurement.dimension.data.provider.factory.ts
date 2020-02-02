import {UnitOfMeasurementDimensionDataProvider} from "../../port/unit.of.measurement.dimension.data.provider";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {NedbUnitOfMeasurementDimensionDataProvider} from "./db/nedb.unit.of.measurement.dimension.data.provider";
import {RestUnitOfMeasurementDimensionDataProvider} from "./rest/rest.unit.of.measurement.dimension.data.provider";

export function createUnitOfMeasurementDimensionRepository(kind?: RepositoryKind): UnitOfMeasurementDimensionDataProvider {
  const type: number = properties.get("unit.of.measurement.data.provider.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new NedbUnitOfMeasurementDimensionDataProvider();
    case RepositoryKind.Rest:
      return new RestUnitOfMeasurementDimensionDataProvider();
    default:
      throw new Error(`Unknown Unit Of Measure Dimension Data Provider ${k}`);
  }
}
