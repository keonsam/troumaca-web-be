import {ResourceRepository} from "../../repository/resource.repository";
import {RepositoryKind} from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { ResourceRepositoryDbAdapter } from "./resource.repository.db.adapter";
import { ResourceRepositoryRestAdapter } from "./resource.repository.rest.adapter";


export function createResourceRepositoryFactory(kind?: RepositoryKind): ResourceRepository {
    const type: number = properties.get("resource.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new ResourceRepositoryDbAdapter();
    case RepositoryKind.Rest:
      return new ResourceRepositoryRestAdapter();
    default:
      return new ResourceRepositoryDbAdapter();
  }
}

