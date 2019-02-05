import {AssetTypeRepository} from "../../../repository/asset.type.repository";
import {Observable, Observer, of} from "rxjs";
// import {switchMap, map} from "rxjs/operators";
import {AssetType} from "../../../data/asset/asset.type";
import {assetTypes} from "../../../db";
import {generateUUID} from "../../../uuid.generator";
import {Affect} from "../../../data/affect";
import {Page} from "../../../util/page";
import {Sort} from "../../../util/sort";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetTypeRepositoryNeDbAdapter implements AssetTypeRepository {

  constructor() {
  }

  addAssetType(assetType: AssetType, headerOptions?: any): Observable<AssetType> {
    return this.addAssetTypeInternal(assetType, headerOptions);
  }

  updateAssetType(assetType: AssetType, headerOptions?: any): Observable<Affect> {
    return this.updateAssetTypeInternal(assetType, headerOptions);
  }

  deleteAssetType(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return this.deleteAssetTypeInternal(assetTypeId, ownerPartyId, headerOptions);
  }

  findAssetTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]> {
    return this.findAssetTypesInternal(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions);
  }

  getAssetTypeById(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetType> {
    return this.getAssetTypeByIdInternal(assetTypeId, ownerPartyId, headerOptions);
  }

  getAssetTypeCount(ownerPartyId:string, headerOptions?: any): Observable<number> {
    return this.getAssetTypeCountInternal(ownerPartyId, headerOptions);
  }

  getAssetTypes(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetType[]>> {
    return this.getAssetTypesInternal(ownerPartyId, pageNumber, pageSize, sort, headerOptions);
  }

  addAssetTypeInternal(assetType: AssetType, headerOptions?: any): Observable<AssetType> {
    assetType.assetTypeId = generateUUID();
    assetType.version = generateUUID();
    assetType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetType>) {
      assetTypes.insert(assetType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetTypeInternal(assetType: AssetType, headerOptions?: any): Observable<Affect> {
    assetType.version = generateUUID();
    assetType.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      assetTypes.update(
        {assetTypeId:assetType.assetTypeId, ownerPartyId:assetType.ownerPartyId},
        assetType,
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

  deleteAssetTypeInternal(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetTypes.remove(
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

  findAssetTypesInternal(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetType[]> {
    return Observable.create(function (observer: Observer<AssetType[]>) {
      assetTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetTypeByIdInternal(assetTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetType> {
    return Observable.create(function (observer: Observer<AssetType>) {
      assetTypes.find(
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

  getAssetTypeCountInternal(ownerPartyId:string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetTypes.count(
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

  getAssetTypesInternal(ownerPartyId:string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetType[]>>) {
      assetTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetTypes.find({ownerPartyId:ownerPartyId})
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