import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import { UnitOfMeasureRepository } from "../../repository/unit.of.measure.repository";
import { UnitOfMeasureRepositoryDbAdapter } from "./unit.of.measure.repository.db.adapter";
import { UnitOfMeasureRepositoryRestAdapter} from "./unit.of.measure.repository.rest.adapter";


export function createUnitOfMeasureRepositoryFactory(kind?: RepositoryKind): UnitOfMeasureRepository {
  const type: number = properties.get("asset.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasureRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasureRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Asset Role Type Repository Type ${k}`);
  }
}
