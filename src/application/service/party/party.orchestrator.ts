import { Observable } from "rxjs";
import { ContactInfo } from "../../../domain/model/contract/contact.info";
import { PartyDataProvider } from "../../../port/party.data.provider";
import { createPartyRepositoryFactory } from "../../../infrastructure/party/party.data.provider.factory";
import { Address } from "../../../domain/model/site/address";

export class PartyOrchestrator {

    private partyRepository: PartyDataProvider;

    constructor() {
        this.partyRepository = createPartyRepositoryFactory();
    }

    getContactInfo(type: string, options: any): Observable<ContactInfo> {
        return this.partyRepository.getContactInfo(type, options);
    }

    // addContactInfo(partyId: any, type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
    //     return this.partyRepository.addContactInfo(partyId, type, contactInfo, options);
    // }

    updateContactInfo(type: string, contactInfo: ContactInfo, options: any): Observable<number> {
        return this.partyRepository.updateContactInfo(type, contactInfo, options);
    }

    // address

    getAddress(type: string, options: any): Observable<Address> {
        return this.partyRepository.getAddress(type, options);
    }

    // addAddress(type: string, address: Address, options?: any): Observable<Address> {
    //     return this.partyRepository.addAddress(type, address, options);
    // }

    updateAddress(type: string, address: Address, options: any): Observable<number> {
        return this.partyRepository.updateAddress(type, address, options);
    }


}
