import { PartyDataProvider } from "../../../port/party.data.provider";
import { Observable } from "rxjs";
import { ContactInfo } from "../../../domain/model/contract/contact.info";
import { Address } from "../../../domain/model/site/address";

export class RestPartyDataProvider implements PartyDataProvider {
    getContactInfo(type: string, options: any): Observable<ContactInfo> {
        return undefined;
    }

    // addContactInfo(partyId: string, type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
    //     return undefined;
    // }

    updateContactInfo(type: string, contactInfo: ContactInfo, options: any): Observable<number> {
        return undefined;
    }

    getAddress(type: string, options: any): Observable<Address> {
        return undefined;
    }

    // addAddress(type: string, address: Address, options?: any): Observable<Address> {
    //     return undefined;
    // }

    updateAddress(type: string, address: Address, options: any): Observable<number> {
        return undefined;
    }
}
