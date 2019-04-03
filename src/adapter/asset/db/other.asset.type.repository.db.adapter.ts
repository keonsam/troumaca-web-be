import {OtherAssetTypeRepository} from "../../../repository/other.asset.type.repository";
import { Observable, Observer} from "rxjs";
import {OtherAssetType} from "../../../data/asset/other.asset.type";
import {otherAssetTypes} from "../../../db";
import {generateUUID} from "../../../uuid.generator";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class OtherAssetTypeRepositoryNeDbAdapter implements OtherAssetTypeRepository {

  addOtherAssetType(otherAssetType: OtherAssetType, headerOptions?: any): Observable<OtherAssetType> {
    otherAssetType.assetTypeId = generateUUID();
    otherAssetType.version = generateUUID();
    otherAssetType.dateModified = new Date();

    return Observable.create(function (observer: Observer<OtherAssetType>) {
      otherAssetTypes.insert(otherAssetType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateOtherAssetType(otherAssetType: OtherAssetType, headerOptions?: any): Observable<Affect> {
    otherAssetType.version = generateUUID();
    otherAssetType.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      otherAssetTypes.update(
        {assetTypeId: otherAssetType.assetTypeId, ownerPartyId: otherAssetType.ownerPartyId},
        otherAssetType,
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

  deleteOtherAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      otherAssetTypes.remove(
        {assetTypeId: assetTypeId, ownerPartyId: ownerPartyId},
        { multi: true },
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

  findOtherAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<OtherAssetType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      otherAssetTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        otherAssetTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getOtherAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<OtherAssetType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      otherAssetTypes.find(
        {assetTypeId: assetTypeId, ownerPartyId: ownerPartyId},
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

  getOtherAssetTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      otherAssetTypes.count(
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

  getOtherAssetTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<OtherAssetType[]>> {
    return Observable.create(function (observer: Observer<Page<OtherAssetType[]>>) {
      otherAssetTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        otherAssetTypes.find({ownerPartyId: ownerPartyId})
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