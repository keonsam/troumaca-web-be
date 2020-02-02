import { Observable } from "rxjs";
import { ContactInfo } from "../domain/model/contract/contact.info";
import { Address } from "../domain/model/site/address";

export interface PartyDataProvider {
    getContactInfo(type: string, options: any): Observable<ContactInfo>;
    // addContactInfo(partyId: string, type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo>;
    updateContactInfo(type: string, contactInfo: ContactInfo, options: any): Observable<number>;

    // address

    getAddress(type: string, options: any): Observable<Address>;
    // addAddress(type: string, address: Address, options?: any): Observable<Address>;
    updateAddress(type: string, address: Address, options: any): Observable<number>;
}
