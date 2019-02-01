import {UnitOfMeasureSystemRepository} from "../../repository/unit.of.measure.system.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {UnitOfMeasureSystemRepositoryNeDbAdapter} from "./unit.of.measure.system.repository.db.adapter";
import {UnitOfMeasureSystemRepositoryRestAdapter} from "./unit.of.measure.system.repository.rest.adapter";

export function createUnitOfMeasureSystemRepository(kind?: RepositoryKind): UnitOfMeasureSystemRepository {
  const type: number = properties.get("unit.of.measure.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new UnitOfMeasureSystemRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new UnitOfMeasureSystemRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Unit Of Measure System Repository Type ${k}`);
  }
}
