import { PartyRepository } from "../../repository/party.repository";
import { Observable, Observer } from "rxjs";
import { ContactInfo } from "../../data/party/contact.info";
import { contacts, organizations, streetAddresses, users } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { Address } from "../../data/party/address";

export class PartyRepositoryDbAdapter implements PartyRepository {

    getContactInfo(type: string, options: any): Observable<ContactInfo> {
        const db = type === "organization" ? organizations : users;
        let query = {};
        if (type === "organization") {
            query = {ownerPartyId: options["Owner-Party-Id"]};
        } else {
            query = {partyId: options["Party-Id"]};
        }
        return Observable.create((observer: Observer<ContactInfo>) => {
            db.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // addContactInfo(partyId: string, type: string, contactInfo: ContactInfo, options?: any): Observable<ContactInfo> {
    //     const update = {"contactInfo": contactInfo};
    //     const db = type === "organization" ? organizations : users;
    //     return Observable.create((observer: Observer<ContactInfo>) => {
    //         db.update({}, (err: any, doc: any) => {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    updateContactInfo(type: string, contactInfo: ContactInfo, options: any): Observable<number> {
        const update = {"contactInfo": contactInfo};
        const db = type === "organization" ? organizations : users;
        let query = {};
        if (type === "organization") {
            query = {ownerPartyId: options["Owner-Party-Id"]};
        } else {
            query = {partyId: options["Party-Id"]};
        }
        return Observable.create((observer: Observer<number>) => {
            db.update(query, {$set: update}, {}, (err: any, num: any) => {
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

    getAddress(type: string, options: any): Observable<Address> {
        const db = type === "organization" ? organizations : users;
        let query = {};
        if (type === "organization") {
            query = {ownerPartyId: options["Owner-Party-Id"]};
        } else {
            query = {partyId: options["Party-Id"]};
        }
        return Observable.create((observer: Observer<Address>) => {
            db.findOne(query, (err: any, doc: any) => {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // addAddress(type: string, address: Address, options?: any): Observable<Address> {
    //     address.partyId = options["Party-Id"];
    //     address.type = type;
    //     address.siteId = generateUUID();
    //     return Observable.create((observer: Observer<Address>) => {
    //         streetAddresses.insert(address, (err: any, doc: any) => {
    //             if (!err) {
    //                 observer.next(doc);
    //             } else {
    //                 observer.error(err);
    //             }
    //             observer.complete();
    //         });
    //     });
    // }

    updateAddress(type: string, address: Address, options: any): Observable<number> {
        const update = {"address": address};
        const db = type === "organization" ? organizations : users;
        let query = {};
        if (type === "organization") {
            query = {ownerPartyId: options["Owner-Party-Id"]};
        } else {
            query = {partyId: options["Party-Id"]};
        }
        return Observable.create((observer: Observer<number>) => {
            db.update(query, {$set: update}, {}, (err: any, num: any) => {
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
