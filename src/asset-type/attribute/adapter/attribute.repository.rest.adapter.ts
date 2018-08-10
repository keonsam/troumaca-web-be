import { AttributeRepository } from "../attribute.repository";
import { Observable } from "rxjs/Observable";
import { Attribute } from "../attribute";
import { AssignedAttribute } from "../assigned.attribute";

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

    // getAssignedAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]> {
    //     return undefined;
    // }

    // getAvailableAttributeCount(): Observable<number> {
    //     return undefined;
    // }

    // getAvailableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: string[]): Observable<Attribute[]> {
    //     return undefined;
    // }

    // getAssignedAttributesById(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    //     return undefined;
    // }

    // getAttributeByArray(attributeArray: string[]): Observable<Attribute[]> {
    //     return undefined;
    // }


    // saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]> {
    //     return undefined;
    // }

    // deleteAssignedAttribute(assetTypeClassId: string): Observable<number> {
    //     return undefined;
    // }


    // updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number> {
    //     return undefined;
    // }

}