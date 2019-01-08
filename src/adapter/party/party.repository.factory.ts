import { RepositoryKind } from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { PartyRepository } from "../../repository/party.repository";
import { PartyRepositoryDbAdapter } from "./party.repository.db.adapter";
import { PartyRepositoryRestAdapter } from "./party.repository.rest.adapter";

export function createPartyRepositoryFactory(kind?: RepositoryKind): PartyRepository {
    const type: number = properties.get("party.repository.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

    switch (k) {
        case RepositoryKind.Nedb:
            return new PartyRepositoryDbAdapter();
        case RepositoryKind.Rest:
            return new PartyRepositoryRestAdapter();
        default:
            throw new Error(`Unknown Party Repository Type ${k}`);
    }
}