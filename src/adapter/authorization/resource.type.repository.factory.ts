import {ResourceTypeRepository} from "../../repository/resource.type.repository";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { ResourceTypeRepositoryDbAdapter } from "./resource.type.repository.db.adapter";
import { ResourceTypeRepositoryRestAdapter } from "./resource.type.repository.rest.adapter";

export function createResourceTypeRepositoryFactory(kind?: RepositoryKind): ResourceTypeRepository {
    const type: number = properties.get("resource.type.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new ResourceTypeRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new ResourceTypeRepositoryRestAdapter();
    default:
      return new ResourceTypeRepositoryDbAdapter();
  }
}

