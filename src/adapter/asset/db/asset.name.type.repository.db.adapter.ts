import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetNameTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";

export class AssetNameTypeRepositoryNeDbAdapter implements AssetNameTypeRepository {
  addAssetNameType(assetNameType: AssetNameType, headerOptions?: any): Observable<AssetNameType> {
    assetNameType.assetNameTypeId = generateUUID();
    assetNameType.version = generateUUID();
    assetNameType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetNameType>) {
      assetNameTypes.insert(assetNameType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetNameType(assetNameType: AssetNameType, headerOptions?: any): Observable<Affect> {
    assetNameType.version = generateUUID();
    assetNameType.dateModified = new Date();
    //ownerPartyId:assetNameType.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetNameTypes.update(
        {assetNameTypeId:assetNameType.assetNameTypeId},
        assetNameType,
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


  deleteAssetNameType(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetNameTypes.remove(
        {assetNameTypeId:assetNameTypeId, ownerPartyId:ownerPartyId},
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

  findAssetNameTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?:any): Observable<AssetNameType[]> {
    return Observable.create(function (observer: Observer<AssetIdentifierType[]>) {
      assetNameTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetNameTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetNameTypeById(assetNameTypeId: string, ownerPartyId: string, headerOptions?:any): Observable<AssetNameType> {
    return Observable.create(function (observer: Observer<AssetIdentifierType>) {
    // , ownerPartyId:ownerPartyId
      assetNameTypes.find(
        {assetNameTypeId:assetNameTypeId},
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

  getAssetNameTypeCount(ownerPartyId: string, headerOptions?:any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetNameTypes.count(
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

  getAssetNameTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetNameType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetNameType[]>>) {
      assetNameTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetNameTypes.find({ownerPartyId:ownerPartyId})
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