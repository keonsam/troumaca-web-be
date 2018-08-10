import { AssignedAttributeRepository } from "./assigned.attribute.repository";
import { properties } from "../../../properties.helpers";
import { AssignedAttributeRepositoryNeDbAdapter } from "./adapter/assigned.attribute.repository.db.adapter";
import { AssignedAttributeRepositoryRestAdapter } from "./adapter/assigned.attribute.repository.rest.adapter";
import { RepositoryKind } from "../../../repository.kind";

export function createAssignedAttributeRepositoryFactory(kind?: RepositoryKind): AssignedAttributeRepository {
    const type: number = properties.get("assigned.attribute.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new AssignedAttributeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AssignedAttributeRepositoryRestAdapter();
    default:
        throw new Error(`Unknown Asssigned Attribute Repository Type ${k}`);
  }
}
