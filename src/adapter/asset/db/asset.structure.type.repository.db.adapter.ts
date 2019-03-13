import {AssetStructureTypeRepository} from "../../../repository/asset.structure.type.repository";
import {AssetStructureType} from "../../../data/asset/asset.structure.type";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetStructureTypes} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetStructureTypeRepositoryNeDbAdapter implements AssetStructureTypeRepository {
  addAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<AssetStructureType> {
    assetStructureType.assetStructureTypeId = generateUUID();
    assetStructureType.version = generateUUID();
    assetStructureType.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetStructureType>) {
      assetStructureTypes.insert(assetStructureType, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetStructureType(assetStructureType: AssetStructureType, headerOptions?: any): Observable<Affect> {
    assetStructureType.version = generateUUID();
    assetStructureType.dateModified = new Date();
    //ownerPartyId:assetStructureType.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetStructureTypes.update(
        {assetStructureTypeId:assetStructureType.assetStructureTypeId},
        assetStructureType,
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

  deleteAssetStructureType(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetStructureTypes.remove(
        {assetStructureTypeId: assetStructureTypeId, ownerPartyId: ownerPartyId},
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

  findAssetStructureTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructureType[]> {
    return Observable.create(function (observer: Observer<AssetStructureType[]>) {
      assetStructureTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetStructureTypes.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetStructureTypeById(assetStructureTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructureType> {
    return Observable.create(function (observer: Observer<AssetStructureType>) {
      // , ownerPartyId:ownerPartyId
      assetStructureTypes.find(
        {assetStructureTypeId:assetStructureTypeId},
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

  getAssetStructureTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetStructureTypes.count(
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

  getAssetStructureTypes(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructureType[]>> {
    return Observable.create(function (observer: Observer<Page<AssetStructureType[]>>) {
      assetStructureTypes.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetStructureTypes.find({ownerPartyId:ownerPartyId})
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