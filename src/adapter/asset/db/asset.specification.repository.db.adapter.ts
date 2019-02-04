import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import { Observable, Observer} from "rxjs";
import {AssetSpecification} from "../../../data/asset/asset.specification";
import {assetSpecifications} from "../../../db";
import {generateUUID} from "../../../uuid.generator";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetSpecificationRepository} from "../../../repository/asset.specification.repository";

export class AssetSpecificationRepositoryNeDbAdapter implements AssetSpecificationRepository {

  addAssetSpecification(assetSpecification: AssetSpecification, headerOptions?: any): Observable<AssetSpecification> {
    assetSpecification.assetTypeId = generateUUID();
    assetSpecification.version = generateUUID();
    assetSpecification.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetSpecification>) {
      assetSpecifications.insert(assetSpecification, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetSpecification(assetSpecification: AssetSpecification, headerOptions?: any): Observable<Affect> {
    assetSpecification.version = generateUUID();
    assetSpecification.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      assetSpecifications.update(
        {assetTypeId:assetSpecification.assetTypeId, ownerPartyId:assetSpecification.ownerPartyId},
        assetSpecification,
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

  deleteAssetSpecification(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetSpecifications.remove(
        {assetTypeId:assetTypeId, ownerPartyId:ownerPartyId},
        { multi: true },
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

  findAssetSpecifications(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetSpecification[]> {
    return Observable.create(function (observer: Observer<AssetSpecification[]>) {
      assetSpecifications.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetSpecifications.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetSpecificationById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetSpecification> {
    return Observable.create(function (observer: Observer<AssetSpecification>) {
      assetSpecifications.find(
        {assetTypeId:assetTypeId, ownerPartyId:ownerPartyId},
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

  getAssetSpecificationCount(ownerPartyId:string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetSpecifications.count(
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

  getAssetSpecifications(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetSpecification[]>> {
    return Observable.create(function (observer: Observer<Page<AssetSpecification[]>>) {
      assetSpecifications.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetSpecifications.find({ownerPartyId:ownerPartyId})
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