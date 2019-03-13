import {AssetIdentifierAssignmentRepository} from "../../../repository/asset.identifier.assignment.repository";
import {AssetIdentifierAssignment} from "../../../data/asset/asset.identifier.assignment";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetIdentifierAssignments} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetIdentifierAssignmentRepositoryNeDbAdapter implements AssetIdentifierAssignmentRepository {

  addAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<AssetIdentifierAssignment> {
    assetIdentifierAssignment.assetIdentifierAssignmentId = generateUUID();
    assetIdentifierAssignment.version = generateUUID();
    assetIdentifierAssignment.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetIdentifierAssignment>) {
      assetIdentifierAssignments.insert(assetIdentifierAssignment, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetIdentifierAssignment(assetIdentifierAssignment: AssetIdentifierAssignment, headerOptions?: any): Observable<Affect> {
    assetIdentifierAssignment.version = generateUUID();
    assetIdentifierAssignment.dateModified = new Date();
    //ownerPartyId:assetIdentifierAssignment.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierAssignments.update(
        {assetIdentifierAssignmentId:assetIdentifierAssignment.assetIdentifierAssignmentId},
        assetIdentifierAssignment,
        { upsert: true },
        function (err:any, numReplaced:number, upsert:any) {
          if (err) {
            observer.error(err);
          } else {

            observer.next(new Affect(numReplaced));
          }
          observer.complete();
        });
    });

  }


  deleteAssetIdentifierAssignment(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierAssignments.remove(
        {assetIdentifierAssignmentId:assetIdentifierAssignmentId, ownerPartyId:ownerPartyId},
        {},
        function (err:any, numRemoved:number) {
          if (err) {
            observer.error(err);
          } else {
            observer.next(new Affect(numRemoved));
          }
          observer.complete();
        });
    });
  }

  findAssetIdentifierAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetIdentifierAssignment[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierAssignment[]>) {
      assetIdentifierAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetIdentifierAssignments.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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
            })
      });
    });
  }

  getAssetIdentifierAssignmentById(assetIdentifierAssignmentId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetIdentifierAssignment> {
    return Observable.create(function (observer: Observer<AssetIdentifierAssignment>) {
    // , ownerPartyId:ownerPartyId
      assetIdentifierAssignments.find(
        {assetIdentifierAssignmentId:assetIdentifierAssignmentId},
        (err: any, docs: any) => {
          if (!err) {
            observer.next(docs[0]);
          } else {
            observer.error(err);
          }
          observer.complete();
        })
    });
  }

  getAssetIdentifierAssignmentCount(ownerPartyId: string, headerOptions?:any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetIdentifierAssignments.count(
        {ownerPartyId:ownerPartyId},
        (err: any, count: any) => {
          if (!err) {
            observer.next(count);
          } else {
            observer.error(err);
          }
          observer.complete();
        })
    });
  }

  getAssetIdentifierAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierAssignment[]>> {
    return Observable.create(function (observer: Observer<Page<AssetIdentifierAssignment[]>>) {
      assetIdentifierAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetIdentifierAssignments.find({ownerPartyId:ownerPartyId})
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
      })
    });
  }

}