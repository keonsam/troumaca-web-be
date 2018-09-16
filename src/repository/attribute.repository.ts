import { Attribute } from "../data/asset/attribute";
import { AssignedAttribute } from "../data/asset/assigned.attribute";
import { Observable } from "rxjs";

export interface AttributeRepository {

  // getAssignedAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]>;
  //
  //
  // getAssignedAttributesById(assetTypeClassId: string): Observable<AssignedAttribute[]>;

  getAvailableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[]): Observable<Attribute[]>;

  getAvailableAttributeCount(assignedAttributes: string[]): Observable<number>;

  getAttributes(pageNumber: number, pageSize: number, order: string): Observable<Attribute[]>;

  getAttributeCount(): Observable<number>;

  getAttributeById(attributeId: string): Observable<Attribute>;

  addAttribute(attribute: Attribute): Observable<Attribute>;

  updateAttribute(attributeId: string, attribute: Attribute): Observable<number>;

  deleteAttribute(attributeId: string): Observable<number>;

  // getAttributeByArray(attributeArray: string[]): Observable<Attribute[]>;

  // saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]>;

  // updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number>;

  // deleteAssignedAttribute(assetTypeClassId: string): Observable<number>;

}
