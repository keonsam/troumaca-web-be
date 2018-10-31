import {AttributeRepository} from "../../repository/attribute.repository";
import {RepositoryKind} from "../../repository.kind";
import {properties} from "../../properties.helpers";
import {AttributeRepositoryNeDbAdapter} from "./attribute.repository.db.adapter";
import {AttributeRepositoryRestAdapter} from "./attribute.repository.rest.adapter";

export function createAttributeRepositoryFactory(kind?: RepositoryKind): AttributeRepository {
  const type: number = properties.get("attribute.repository.type") as number;

  const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;
  switch (k) {
    case RepositoryKind.Nedb:
      return new AttributeRepositoryNeDbAdapter();
    case RepositoryKind.Rest:
      return new AttributeRepositoryRestAdapter();
    default:
      throw new Error(`Unknown Attribute Repository Type ${k}`);
  }
}
