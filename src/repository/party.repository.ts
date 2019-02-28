import { Observable } from "rxjs";
import { ContactInfo } from "../data/party/contact.info";
import { Address } from "../data/party/address";

export interface PartyRepository {
    getContactInfo(type: string, options: any): Observable<ContactInfo>;
    // addContactInfo(partyId: string, type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo>;
    updateContactInfo(type: string, contactInfo: ContactInfo, options: any): Observable<number>;

    // address

    getAddress(type: string, options: any): Observable<Address>;
    // addAddress(type: string, address: Address, options?: any): Observable<Address>;
    updateAddress(type: string, address: Address, options: any): Observable<number>;
}
