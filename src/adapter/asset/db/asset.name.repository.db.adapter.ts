import {AssetNameRepository} from "../../../repository/asset.name.repository";
import {AssetName} from "../../../data/asset/asset.name";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetNames} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifier} from "../../../data/asset/asset.identifier";

export class AssetNameRepositoryNeDbAdapter implements AssetNameRepository {
  addAssetName(assetName: AssetName, headerOptions?: any): Observable<AssetName> {
    assetName.assetNameId = generateUUID();
    assetName.version = generateUUID();
    assetName.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetName>) {
      assetNames.insert(assetName, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetName(assetName: AssetName, headerOptions?: any): Observable<Affect> {
    assetName.version = generateUUID();
    assetName.dateModified = new Date();
    // ownerPartyId:assetName.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetNames.update(
        {assetNameId: assetName.assetNameId},
        assetName,
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


  deleteAssetName(assetNameId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetNames.remove(
        {assetNameId: assetNameId, ownerPartyId: ownerPartyId},
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

  findAssetNames(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetName[]> {
    return Observable.create(function (observer: Observer<AssetIdentifier[]>) {
      assetNames.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetNames.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetNameById(assetNameId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetName> {
    return Observable.create(function (observer: Observer<AssetIdentifier>) {
    // , ownerPartyId:ownerPartyId
      assetNames.find(
        {assetNameId: assetNameId},
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

  getAssetNameCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetNames.count(
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

  getAssetNames(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetName[]>> {
    return Observable.create(function (observer: Observer<Page<AssetName[]>>) {
      assetNames.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetNames.find({ownerPartyId: ownerPartyId})
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
