import { Observable } from "rxjs/Observable";
import { Attribute } from "./attribute";
import { AssignedAttribute } from "./assigned.attribute";

export interface AttributeRepository {

  getAvailableAttributes(pageNumber: number, pageSize: number, order: string, availableAttributes: string[]): Observable<Attribute[]>;

  getAssignedAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]>;

  getAvailableAttributeCount(): Observable<number>;

  getAssignedAttributesById(assetTypeClassId: string): Observable<AssignedAttribute[]>;

  getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]>;

  getAttributeCount(): Observable<number>;

  getAttributeById(attributeId: string): Observable<Attribute>;

  getAttributeByArray(attributeArray: string[]): Observable<Attribute[]>;

  saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]>;

  addAttribute(attribute: Attribute): Observable<Attribute>;

  updateAttribute(attributeId: string, attribute: Attribute): Observable<number>;

  updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number>;

  deleteAttribute(attributeId: string): Observable<number>;

  deleteAssignedAttribute(assetTypeClassId: string): Observable<number>;

}
