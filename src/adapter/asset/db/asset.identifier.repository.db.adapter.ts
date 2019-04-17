import {AssetIdentifierRepository} from "../../../repository/asset.identifier.repository";
import {AssetIdentifier} from "../../../data/asset/asset.identifier";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetIdentifiers} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetIdentifierRepositoryNeDbAdapter implements AssetIdentifierRepository {
  addAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<AssetIdentifier> {
    assetIdentifier.assetIdentifierId = generateUUID();
    assetIdentifier.version = generateUUID();
    assetIdentifier.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetIdentifier>) {
      assetIdentifiers.insert(assetIdentifier, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetIdentifier(assetIdentifier: AssetIdentifier, headerOptions?: any): Observable<Affect> {
    assetIdentifier.version = generateUUID();
    assetIdentifier.dateModified = new Date();
    // ownerPartyId:assetIdentifier.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifiers.update(
        {assetIdentifierId: assetIdentifier.assetIdentifierId},
        assetIdentifier,
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

  deleteAssetIdentifier(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifiers.remove(
        {assetIdentifierId: assetIdentifierId, ownerPartyId: ownerPartyId},
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

  findAssetIdentifiers(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifier[]> {
    return Observable.create(function (observer: Observer<AssetIdentifier[]>) {
      assetIdentifiers.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetIdentifiers.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetIdentifierById(assetIdentifierId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifier> {
    return Observable.create(function (observer: Observer<AssetIdentifier>) {
      // , ownerPartyId:ownerPartyId
      assetIdentifiers.find(
        {assetIdentifierId: assetIdentifierId},
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

  getAssetIdentifierCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetIdentifiers.count(
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

  getAssetIdentifiers(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifier[]>> {
    return Observable.create(function (observer: Observer<Page<AssetIdentifier[]>>) {
      assetIdentifiers.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetIdentifiers.find({ownerPartyId: ownerPartyId})
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
