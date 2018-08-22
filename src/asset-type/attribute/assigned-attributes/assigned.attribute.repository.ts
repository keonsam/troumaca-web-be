import { Observable } from "rxjs";
import { Attribute } from "../attribute";
import { AssignedAttribute } from "../assigned.attribute";

export interface AssignedAttributeRepository {

  getAssignableAttributes(pageNumber: number, pageSize: number, order: string, assignedAttributes: string[], type: string): Observable<Attribute[]>;

  getAssignableAttributesCount(assignedAttributes: string[], type: string): Observable<number>;

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
