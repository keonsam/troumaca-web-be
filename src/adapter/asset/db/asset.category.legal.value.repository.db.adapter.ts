import {AssetCategoryLegalValueRepository} from "../../../repository/asset.category.legal.value.repository";
import {AssetCategoryLegalValue} from "../../../data/asset/asset.category.legal.value";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import {generateUUID} from "../../../uuid.generator";
import {assetCategoryLegalValues} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetCategoryLegalValueRepositoryNeDbAdapter implements AssetCategoryLegalValueRepository {
  addAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    assetCategoryLegalValue.assetCategoryLegalValueId = generateUUID();
    assetCategoryLegalValue.version = generateUUID();
    assetCategoryLegalValue.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetCategoryLegalValue>) {
      assetCategoryLegalValues.insert(assetCategoryLegalValue, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCategoryLegalValues.remove(
        {assetCategoryLegalValueId:assetCategoryLegalValueId, ownerPartyId:ownerPartyId},
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

  findAssetCategoryLegalValues(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]> {
    return Observable.create(function (observer: Observer<AssetCategoryLegalValue[]>) {
      assetCategoryLegalValues.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCategoryLegalValues.find({ownerPartyId: ownerPartyId, categoryValue: new RegExp(searchStr) })
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

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return Observable.create(function (observer: Observer<AssetCategoryLegalValue>) {
      // , ownerPartyId:ownerPartyId
      assetCategoryLegalValues.find(
        {assetCategoryLegalValueId:assetCategoryLegalValueId},
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

  getAssetCategoryLegalValueCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCategoryLegalValues.count(
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

  getAssetCategoryLegalValues(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetCategoryLegalValue[]>> {
    return Observable.create(function (observer: Observer<Page<AssetCategoryLegalValue[]>>) {
      assetCategoryLegalValues.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetCategoryLegalValues.find({ownerPartyId:ownerPartyId})
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

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect> {
    assetCategoryLegalValue.version = generateUUID();
    assetCategoryLegalValue.dateModified = new Date();
    //ownerPartyId:assetCategoryLegalValue.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCategoryLegalValues.update(
        {assetCategoryLegalValueId:assetCategoryLegalValue.assetCategoryLegalValueId},
        assetCategoryLegalValue,
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

}