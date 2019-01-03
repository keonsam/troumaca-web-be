import { Observable } from "rxjs";
import { ContactInfo } from "../data/party/contact.info";
import { PartyRepository } from "../repository/party.repository";
import { createPartyRepositoryFactory } from "../adapter/party/party.repository.factory";
import { Address } from "../data/party/address";

export class PartyOrchestrator {

    private partyRepository: PartyRepository;

    constructor() {
        this.partyRepository = createPartyRepositoryFactory();
    }

    getContactInfo(type: string, partyId: any): Observable<ContactInfo> {
        return this.partyRepository.getContactInfo(type, partyId);
    }

    addContactInfo(type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
        return this.partyRepository.addContactInfo(type, contactInfo, options);
    }

    updateContactInfo(type: string, contactInfo: ContactInfo, contactInfoId: string): Observable<number> {
        return this.partyRepository.updateContactInfo(type, contactInfo, contactInfoId);
    }

    // address

    getAddress(type: string, partyId: any): Observable<Address> {
        return this.partyRepository.getAddress(type, partyId);
    }

    addAddress(type: string, address: Address, options?: any): Observable<Address> {
        return this.partyRepository.addAddress(type, address, options);
    }

    updateAddress(type: string, address: Address, siteId: string): Observable<number> {
        return this.partyRepository.updateAddress(type, address, siteId);
    }


}