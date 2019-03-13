import {AssetBrandRepository} from "../../../repository/asset.brand.repository";
import {AssetBrand} from "../../../data/asset/asset.brand";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import {generateUUID} from "../../../uuid.generator";
import {assetBrands} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetBrandRepositoryNeDbAdapter implements AssetBrandRepository {
  addAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<AssetBrand> {
    assetBrand.assetBrandId = generateUUID();
    assetBrand.version = generateUUID();
    assetBrand.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetBrand>) {
      assetBrands.insert(assetBrand, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  deleteAssetBrand(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetBrands.remove(
        {assetBrandId:assetBrandId, ownerPartyId:ownerPartyId},
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

  findAssetBrands(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetBrand[]> {
    return Observable.create(function (observer: Observer<AssetBrand[]>) {
      assetBrands.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetBrands.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetBrandById(assetBrandId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetBrand> {
    return Observable.create(function (observer: Observer<AssetBrand>) {
      // , ownerPartyId:ownerPartyId
      assetBrands.find(
        {assetBrandId:assetBrandId},
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

  getAssetBrandCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetBrands.count(
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

  getAssetBrands(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetBrand[]>> {
    return Observable.create(function (observer: Observer<Page<AssetBrand[]>>) {
      assetBrands.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetBrands.find({ownerPartyId:ownerPartyId})
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

  updateAssetBrand(assetBrand: AssetBrand, headerOptions?: any): Observable<Affect> {
    assetBrand.version = generateUUID();
    assetBrand.dateModified = new Date();
    //ownerPartyId:assetBrand.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetBrands.update(
        {assetBrandId:assetBrand.assetBrandId},
        assetBrand,
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