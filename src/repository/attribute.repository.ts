import {Attribute} from "../data/asset/attribute";
import {Observable} from "rxjs";

export interface AttributeRepository {

    getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]>;

    getAttributeCount(): Observable<number>;

    getAttributeById(attributeId: string): Observable<Attribute>;

    addAttribute(attribute: Attribute): Observable<Attribute>;

    updateAttribute(attributeId: string, attribute: Attribute): Observable<number>;

    deleteAttribute(attributeId: string): Observable<number>;

    // OTHERS

    getAvailableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]>;

    getAvailableAttributeCount(assignedAttributes: string[]): Observable<number>;

    getAssignableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]>;

    getAssignableAttributeCount(assignedAttributes: string[]): Observable<number>;

}
