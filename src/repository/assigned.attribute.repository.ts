import { Attribute } from "../data/asset/attribute";
import { AssignedAttribute } from "../data/asset/assigned.attribute";
import { Observable } from "rxjs";

export interface AssignedAttributeRepository {

  // getAssignableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[], type: string): Observable<Attribute[]>;

  // getAssignableAttributesCount(assignedAttributes: string[], type: string): Observable<number>;

  getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]>;

  // getAssignableAttributes(): Observable<number>;
  //
  //
  // getAttributeByArray(attributeArray: string[]): Observable<Attribute[]>;
  //
  // saveAssignedAttributes(assignedAttribute: AssignedAttribute[]): Observable<AssignedAttribute[]>;
  //
  // updateAssignedAttribute(assetTypeClassId: string, assignedAttribute: AssignedAttribute): Observable<number>;
  //
  // deleteAssignedAttribute(assetTypeClassId: string): Observable<number>;

}
