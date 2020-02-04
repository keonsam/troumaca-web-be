import {AssetCharacteristicAssignmentDataProvider} from "../../../port/asset.characteristic.assignment.data.provider";
import {AssetCharacteristicAssignment} from "../../../domain/model/asset/asset.characteristic.assignment";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetCharacteristicAssignments} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class NedbAssetCharacteristicAssignmentDataProvider implements AssetCharacteristicAssignmentDataProvider {

  addAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<AssetCharacteristicAssignment> {
    assetCharacteristicAssignment.assetCharacteristicAssignmentId = generateUUID();
    assetCharacteristicAssignment.version = generateUUID();
    assetCharacteristicAssignment.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetCharacteristicAssignment>) {
      assetCharacteristicAssignments.insert(assetCharacteristicAssignment, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetCharacteristicAssignment(assetCharacteristicAssignment: AssetCharacteristicAssignment, headerOptions?: any): Observable<Affect> {
    assetCharacteristicAssignment.version = generateUUID();
    assetCharacteristicAssignment.dateModified = new Date();
    // ownerPartyId:assetCharacteristicAssignment.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicAssignments.update(
        {assetCharacteristicAssignmentId: assetCharacteristicAssignment.assetCharacteristicAssignmentId},
        assetCharacteristicAssignment,
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


  deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCharacteristicAssignments.remove(
        {assetCharacteristicAssignmentId: assetCharacteristicAssignmentId, ownerPartyId: ownerPartyId},
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

  findAssetCharacteristicAssignments(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicAssignment[]> {
    return Observable.create(function (observer: Observer<AssetCharacteristicAssignment[]>) {
      assetCharacteristicAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCharacteristicAssignments.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetCharacteristicAssignmentById(assetCharacteristicAssignmentId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicAssignment> {
    return Observable.create(function (observer: Observer<AssetCharacteristicAssignment>) {
    // , ownerPartyId:ownerPartyId
      assetCharacteristicAssignments.find(
        {assetCharacteristicAssignmentId: assetCharacteristicAssignmentId},
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

  getAssetCharacteristicAssignmentCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCharacteristicAssignments.count(
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

  getAssetCharacteristicAssignments(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCharacteristicAssignment[]>> {
    return Observable.create(function (observer: Observer<Page<AssetCharacteristicAssignment[]>>) {
      assetCharacteristicAssignments.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetCharacteristicAssignments.find({ownerPartyId: ownerPartyId})
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
