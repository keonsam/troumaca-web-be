import {AssetIdentifierTypeRepository} from "../../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetIdentifierTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetIdentifierTypeRepositoryNeDbAdapter implements AssetIdentifierTypeRepository {
  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<AssetIdentifierType> {
    assetIdentifierType.assetIdentifierTypeId = generateUUID();
    assetIdentifierType.version = generateUUID();
    assetIdentifierType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      assetIdentifierTypes.insert(assetIdentifierType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: any): Observable<Affect> {
    assetIdentifierType.version = generateUUID();
    assetIdentifierType.dateModified = new Date();
    //ownerPartyId:assetIdentifierType.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierTypes.update(
        {assetIdentifierTypeId:assetIdentifierType.assetIdentifierTypeId},
        assetIdentifierType,
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

  deleteAssetIdentifierType(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetIdentifierTypes.remove(
        {assetIdentifierTypeId: assetIdentifierTypeId, ownerPartyId: ownerPartyId},
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

  findAssetIdentifierTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetIdentifierType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetIdentifierTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetIdentifierTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetIdentifierType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
      // , ownerPartyId:ownerPartyId
      assetIdentifierTypes.find(
        {assetIdentifierTypeId:assetIdentifierTypeId},
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

  getAssetIdentifierTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetIdentifierTypes.count(
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

  getAssetIdentifierTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetIdentifierType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetIdentifierType[]>>) {
      assetIdentifierTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetIdentifierTypes.find({ownerPartyId:ownerPartyId})
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