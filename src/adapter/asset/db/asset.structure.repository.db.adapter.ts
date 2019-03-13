import {AssetStructureRepository} from "../../../repository/asset.structure.repository";
import {AssetStructure} from "../../../data/asset/asset.structure";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetStructures} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetStructureRepositoryNeDbAdapter implements AssetStructureRepository {
  addAssetStructure(assetStructure: AssetStructure, headerOptions?: any): Observable<AssetStructure> {
    assetStructure.assetStructureId = generateUUID();
    assetStructure.version = generateUUID();
    assetStructure.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetStructure>) {
      assetStructures.insert(assetStructure, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetStructure(assetStructure: AssetStructure, headerOptions?: any): Observable<Affect> {
    assetStructure.version = generateUUID();
    assetStructure.dateModified = new Date();
    //ownerPartyId:assetStructure.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetStructures.update(
        {assetStructureId:assetStructure.assetStructureId},
        assetStructure,
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

  deleteAssetStructure(assetStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetStructures.remove(
        {assetStructureId: assetStructureId, ownerPartyId: ownerPartyId},
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

  findAssetStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetStructure[]> {
    return Observable.create(function (observer: Observer<AssetStructure[]>) {
      assetStructures.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetStructures.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetStructureById(assetStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetStructure> {
    return Observable.create(function (observer: Observer<AssetStructure>) {
      // , ownerPartyId:ownerPartyId
      assetStructures.find(
        {assetStructureId:assetStructureId},
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

  getAssetStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetStructures.count(
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

  getAssetStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetStructure[]>> {
    return Observable.create(function (observer: Observer<Page<AssetStructure[]>>) {
      assetStructures.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        let skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        let generate = SortGenerator.generate(sort);
        assetStructures.find({ownerPartyId:ownerPartyId})
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