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
import {AssetCategoryLegalValues} from "../../../data/asset/asset.category.legal.values";

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

  deleteAssetCategoryLegalValue(assetCategoryLegalValueId: string,  headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetCategoryLegalValues.remove(
        {assetCategoryLegalValueId: assetCategoryLegalValueId,
            // ownerPartyId: ownerPartyId
        },
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

  findAssetCategoryLegalValues( searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValue[]> {
    return Observable.create(function (observer: Observer<AssetCategoryLegalValue[]>) {
      assetCategoryLegalValues.count(
          {
              // ownerPartyId: ownerPartyId
          },
          function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetCategoryLegalValues.find(
            {ownerPartyId: headerOptions.ownerPartyId,
                name: new RegExp(searchStr)
            }
            )
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

  getAssetCategoryLegalValueById(assetCategoryLegalValueId: string,  headerOptions?: any): Observable<AssetCategoryLegalValue> {
    return Observable.create(function (observer: Observer<AssetCategoryLegalValue>) {
      // , ownerPartyId:ownerPartyId
      assetCategoryLegalValues.find(
        {assetCategoryLegalValueId: assetCategoryLegalValueId},
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

  getAssetCategoryLegalValueCount( headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetCategoryLegalValues.count(
        {ownerPartyId: headerOptions.ownerPartyId},
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

  getAssetCategoryLegalValues(search: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCategoryLegalValues> {
    return Observable.create(function (observer: Observer<AssetCategoryLegalValues>) {
      assetCategoryLegalValues.count({ ownerPartyId: headerOptions.ownerPartyId }, function (err, count) {
        // const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        // const generate = SortGenerator.generate(sort);
          const skipAmount = pageNumber ? pageNumber * pageSize : 0;
          assetCategoryLegalValues.find({
              // ownerPartyId: headerOptions.ownerPartyId,
              name: new RegExp(search)
          })
          .skip(skipAmount)
          .limit(pageSize)
          .exec((err: any, docs: any) => {
            if (!err) {
              observer.next(new AssetCategoryLegalValues(docs));
            } else {
              observer.error(err);
            }
            observer.complete();
          });
      });
    });
  }

  updateAssetCategoryLegalValue(assetCategoryLegalValue: AssetCategoryLegalValue, headerOptions?: any): Observable<Affect> {
    assetCategoryLegalValue.version = generateUUID();
    assetCategoryLegalValue.dateModified = new Date();
    // ownerPartyId:assetCategoryLegalValue.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetCategoryLegalValues.update(
        {assetCategoryLegalValueId: assetCategoryLegalValue.assetCategoryLegalValueId},
        assetCategoryLegalValue,
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

}
