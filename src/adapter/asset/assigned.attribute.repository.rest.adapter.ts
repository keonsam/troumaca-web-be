import {AssignedAttributeRepository} from "../../repository/assigned.attribute.repository";
import {Attribute} from "../../data/asset/attribute";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {Observable} from "rxjs";

export class AssignedAttributeRepositoryRestAdapter implements AssignedAttributeRepository {

  // getAssignableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[], type: string): Observable<Attribute[]> {
  //     return undefined;
  // }
  //
  // getAssignableAttributesCount(assignedAttributes: string[], type: string): Observable<number> {
  //     return undefined;
  // }

  getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return undefined;
  }

  // getAvailableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: string[]): Observable<Attribute[]> {
  //     return undefined;
  // }
  //
  //
  // getAttributeByArray(attributeArray: string[]): Observable<Attribute[]> {
  //     return undefined;
  // }
  //
  //
  // saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]> {
  //     return undefined;
  // }
  //
  // addAttribute(attribute: Attribute): Observable<Attribute> {
  //     return undefined;
  // }
  //
  // deleteAttribute(attributeId: string): Observable<number> {
  //     return undefined;
  // }
  //
  // deleteAssignedAttribute(assetTypeClassId: string): Observable<number> {
  //     return undefined;
  // }
  //
  // getAttributeById(attributeId: string): Observable<Attribute> {
  //     return undefined;
  // }
  //
  // getAttributeCount(): Observable<number> {
  //     return undefined;
  // }
  //
  // getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]> {
  //     return undefined;
  // }
  //
  // updateAttribute(attributeId: string, attribute: Attribute): Observable<number> {
  //     return undefined;
  // }
  //
  // updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number> {
  //     return undefined;
  // }

}