import { PartyRepository } from "../../repository/party.repository";
import { Observable, Observer } from "rxjs";
import { ContactInfo } from "../../data/party/contact.info";
import { contacts, streetAddresses } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { Address } from "../../data/party/address";

export class PartyRepositoryDbAdapter implements PartyRepository {

    getContactInfo(type: string, partyId: any): Observable<ContactInfo> {
        return Observable.create((observer: Observer<ContactInfo>) => {
            contacts.findOne({type, partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    addContactInfo(type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
        contactInfo.partyId = options["Party-Id"];
        contactInfo.type = type;
        contactInfo.contactInfoId = generateUUID();
        return Observable.create((observer: Observer<ContactInfo>) => {
            contacts.insert(contactInfo, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateContactInfo(type: string, contactInfo: ContactInfo, contactInfoId: string): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            contacts.update({contactInfoId}, contactInfo, {}, (err: any, num: any) => {
                if (!err) {
                    observer.next(num);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // address

    getAddress(type: string, partyId: any): Observable<Address> {
        return Observable.create((observer: Observer<Address>) => {
            streetAddresses.findOne({type, partyId}, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    addAddress(type: string, address: Address, options?: any): Observable<Address> {
        address.partyId = options["Party-Id"];
        address.type = type;
        address.siteId = generateUUID();
        return Observable.create((observer: Observer<Address>) => {
            streetAddresses.insert(address, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    updateAddress(type: string, address: Address, siteId: any): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            streetAddresses.update({siteId}, address, {}, (err: any, num: any) => {
                if (!err) {
                    observer.next(num);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}
