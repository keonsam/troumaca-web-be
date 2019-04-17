import {AssetTypeStructureRepository} from "../../../repository/asset.type.structure.repository";
import {AssetTypeStructure} from "../../../data/asset/asset.type.structure";
import {Observable, Observer} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {generateUUID} from "../../../uuid.generator";
import {assetTypeStructures} from "../../../db";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class AssetTypeStructureRepositoryNeDbAdapter implements AssetTypeStructureRepository {
  addAssetTypeStructure(assetTypeStructure: AssetTypeStructure, headerOptions?: any): Observable<AssetTypeStructure> {
    assetTypeStructure.assetTypeStructureId = generateUUID();
    assetTypeStructure.version = generateUUID();
    assetTypeStructure.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetTypeStructure>) {
      assetTypeStructures.insert(assetTypeStructure, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetTypeStructure(assetTypeStructure: AssetTypeStructure, headerOptions?: any): Observable<Affect> {
    assetTypeStructure.version = generateUUID();
    assetTypeStructure.dateModified = new Date();
    // ownerPartyId:assetTypeStructure.ownerPartyId
    return Observable.create(function (observer: Observer<Affect>) {
      assetTypeStructures.update(
        {assetTypeStructureId: assetTypeStructure.assetTypeStructureId},
        assetTypeStructure,
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

  deleteAssetTypeStructure(assetTypeStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetTypeStructures.remove(
        {assetTypeStructureId: assetTypeStructureId, ownerPartyId: ownerPartyId},
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

  findAssetTypeStructures(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetTypeStructure[]> {
    return Observable.create(function (observer: Observer<AssetTypeStructure[]>) {
      assetTypeStructures.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetTypeStructures.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetTypeStructureById(assetTypeStructureId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetTypeStructure> {
    return Observable.create(function (observer: Observer<AssetTypeStructure>) {
      // , ownerPartyId:ownerPartyId
      assetTypeStructures.find(
        {assetTypeStructureId: assetTypeStructureId},
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

  getAssetTypeStructureCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetTypeStructures.count(
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

  getAssetTypeStructures(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetTypeStructure[]>> {
    return Observable.create(function (observer: Observer<Page<AssetTypeStructure[]>>) {
      assetTypeStructures.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetTypeStructures.find({ownerPartyId: ownerPartyId})
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
