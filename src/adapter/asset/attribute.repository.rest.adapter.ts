import {AttributeRepository} from "../../repository/attribute.repository";
import {Attribute} from "../../data/asset/attribute";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {Observable} from "rxjs";

export class AttributeRepositoryRestAdapter implements AttributeRepository {

    getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
        return undefined;
    }

    getAttributeCount(): Observable<number> {
        return undefined;
    }

    getAttributeById(attributeId: string): Observable<Attribute> {
        return undefined;
    }

    addAttribute(attribute: Attribute): Observable<Attribute> {
        return undefined;
    }

    updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
        return undefined;
    }

    deleteAttribute(attributeId: string): Observable<number> {
        return undefined;
    }

    // OTHERS
    getAvailableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: string[]): Observable<Attribute[]> {
        return undefined;
    }

    getAvailableAttributeCount(): Observable<number> {
        return undefined;
    }

    getAssignableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: string[]): Observable<Attribute[]> {
        return undefined;
    }

    getAssignableAttributeCount(): Observable<number> {
        return undefined;
    }
}