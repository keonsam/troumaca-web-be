import {AssetNameAssignmentRepository} from "../../../repository/asset.name.assignment.repository";
import {AssetNameAssignment} from "../../../data/asset/asset.name.assignment";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetNameAssignments} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierAssignment} from "../../../data/asset/asset.identifier.assignment";

export class AssetNameAssignmentRepositoryNeDbAdapter implements AssetNameAssignmentRepository {
  addAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<AssetNameAssignment> {
    assetNameAssignment.assetNameAssignmentId = generateUUID();
    assetNameAssignment.version = generateUUID();
    assetNameAssignment.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetNameAssignment>) {
      assetNameAssignments.insert(assetNameAssignment, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetNameAssignment(assetNameAssignment: AssetNameAssignment, headerOptions?: any): Observable<Affect> {
    assetNameAssignment.version = generateUUID();
    assetNameAssignment.dateModified = new Date();
    // ownerPartyId:assetNameAssignment.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetNameAssignments.update(
        {assetNameAssignmentId: assetNameAssignment.assetNameAssignmentId},
        assetNameAssignment,
        { upsert: true },
        function (err: any, numReplaced: number, upsert: any) {
          if (err) {
            observer.error(err);
          } else {

            observer.next(new Affect(numReplaced));
          }
          observer.complete();
        });
    });

  }


  deleteAssetNameAssignment(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetNameAssignments.remove(
        {assetNameAssignmentId: assetNameAssignmentId, ownerPartyId: ownerPartyId},
        {},
        function (err: any, numRemoved: number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numRemoved));
          }
          observer.complete();
        });
    });
  }

  findAssetNameAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetNameAssignment[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierAssignment[]>) {
      assetNameAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetNameAssignments.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
          .skip(skipAmount)
          .limit(pageSize)
          .exec(
            (err: any, docs: any) => {
              if (!err) {
                observer.next(docs);
              } else {
                observer.error(err);
              }
              observer.complete();
            });
      });
    });
  }

  getAssetNameAssignmentById(assetNameAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetNameAssignment> {
    return Observable.create(function (observer: Observer<AssetIdentifierAssignment>) {
    // , ownerPartyId:ownerPartyId
      assetNameAssignments.find(
        {assetNameAssignmentId: assetNameAssignmentId},
        (err: any, docs: any) => {
          if (!err) {
            observer.next(docs[0]);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
    });
  }

  getAssetNameAssignmentCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetNameAssignments.count(
        {ownerPartyId: ownerPartyId},
        (err: any, count: any) => {
          if (!err) {
            observer.next(count);
          } else {
            observer.error(err);
          }
          observer.complete();
        });
    });
  }

  getAssetNameAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameAssignment[]>> {
    return Observable.create(function (observer: Observer<Page<AssetNameAssignment[]>>) {
      assetNameAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetNameAssignments.find({ownerPartyId: ownerPartyId})
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: any) => {
            if (!err) {
              observer.next(docs);
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

}
