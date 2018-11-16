import {calcSkip} from "../../db.util";
import {Attribute} from "../../data/asset/attribute";
import {assignedAttributes, attributes} from "../../db";
import {AssignedAttributeRepository} from "../../repository/assigned.attribute.repository";
import {AssignedAttribute} from "../../data/asset/assigned.attribute";
import {AttributeRepositoryNeDbAdapter} from "./attribute.repository.db.adapter";
import {generateUUID} from "../../uuid.generator";
import {Observable, Observer, of} from "rxjs";
import {switchMap, map} from "rxjs/operators";

export class AssignedAttributeRepositoryNeDbAdapter implements AssignedAttributeRepository {

  private attributeRepositoryNeDbAdapter: AttributeRepositoryNeDbAdapter = new AttributeRepositoryNeDbAdapter();

  getAssignedAttributesByClassId(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.getAssignedAttributesById(assetTypeClassId)
      .pipe(switchMap(assignedAttributes => {
        const assignedArray: string[] = assignedAttributes.map((x: AssignedAttribute) => x.attributeId);
        return this.attributeRepositoryNeDbAdapter.getAttributesByIds(assignedArray)
          .pipe(map(attributes => {
            assignedAttributes.forEach(value => {
              value.attribute = attributes.find(x => x.attributeId === value.attributeId);
            });
            return assignedAttributes;
          }));
      }));
  }

  // USED BY OTHER REPOS

  private getAssignedAttributesById(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return Observable.create(function (observer: Observer<AssignedAttribute[]>) {
      const query = {
        assetTypeClassId
      };
      assignedAttributes.find(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveAssignedAttributes(assignedAttributeArr: AssignedAttribute[]): Observable<AssignedAttribute[]> {
    assignedAttributeArr.forEach(value => {
      if (!value.assignedAttributeId) {
        value.assignedAttributeId = generateUUID();
      }
      if (!value.createdOn) {
        value.createdOn = new Date();
      }
      value.modifiedOn = new Date();
    });
    return Observable.create((observer: Observer<AssignedAttribute[]>) => {
      assignedAttributes.insert(assignedAttributeArr, function (err: any, docs: any) {
        if (!err) {
          observer.next(docs);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteAssignedAttributes(assetTypeClassId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        assetTypeClassId
      };

      assignedAttributes.remove(query, {multi: true}, function (err, numRemoved) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}