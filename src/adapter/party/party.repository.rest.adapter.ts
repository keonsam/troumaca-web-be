import { PartyRepository } from "../../repository/party.repository";
import { Observable } from "rxjs";
import { ContactInfo } from "../../data/party/contact.info";
import { Address } from "../../data/party/address";

export class PartyRepositoryRestAdapter implements PartyRepository {
    getContactInfo(type: string, partyId: any): Observable<ContactInfo> {
        return undefined;
    }

    addContactInfo(type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
        return undefined;
    }
    updateContactInfo(type: string, contactInfo: ContactInfo, partyId: any): Observable<number> {
        return undefined;
    }

    getAddress(type: string, partyId: any): Observable<Address> {
        return undefined;
    }

    addAddress(type: string, address: Address, options?: any): Observable<Address> {
        return undefined;
    }

    updateAddress(type: string, address: Address, siteId: any): Observable<number> {
        return undefined;
    }
}