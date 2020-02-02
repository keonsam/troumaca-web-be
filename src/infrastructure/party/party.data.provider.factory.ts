import { RepositoryKind } from "../../repository.kind";
import { properties } from "../../properties.helpers";
import { PartyDataProvider } from "../../port/party.data.provider";
import { NedbPartyDataProvider } from "./db/nedb.party.data.provider";
import { RestPartyDataProvider } from "./rest/rest.party.data.provider";

export function createPartyRepositoryFactory(kind?: RepositoryKind): PartyDataProvider {
    const type: number = properties.get("party.data.provider.type") as number;

    const k: RepositoryKind = (kind) ? kind : (type === 2) ? RepositoryKind.Rest : RepositoryKind.Nedb;

    switch (k) {
        case RepositoryKind.Nedb:
            return new NedbPartyDataProvider();
        case RepositoryKind.Rest:
            return new RestPartyDataProvider();
        default:
            throw new Error(`Unknown Party Data Provider ${k}`);
    }
}