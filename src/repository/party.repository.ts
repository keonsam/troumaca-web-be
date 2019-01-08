import { Observable } from "rxjs";
import { ContactInfo } from "../data/party/contact.info";
import { Address } from "../data/party/address";

export interface PartyRepository {
    getContactInfo(type: string, partyId: any): Observable<ContactInfo>;
    addContactInfo(type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo>;
    updateContactInfo(type: string, contactInfo: ContactInfo, contactInfoId: string): Observable<number>;

    // address

    getAddress(type: string, partyId: any): Observable<Address>;
    addAddress(type: string, address: Address, options?: any): Observable<Address>;
    updateAddress(type: string, address: Address, siteId: string): Observable<number>;
}