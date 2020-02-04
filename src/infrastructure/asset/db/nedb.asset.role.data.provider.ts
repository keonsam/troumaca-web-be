import {AssetRoleDataProvider} from "../../../port/asset.role.data.provider";
import {AssetRole} from "../../../domain/model/asset/asset.role";
import {Observable, Observer} from "rxjs";
import {generateUUID} from "../../../uuid.generator";
import {assetRoles} from "../../../db";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import {SkipGenerator} from "../../util/skip.generator";
import {SortGenerator} from "../../util/sort.generator";

export class NedbAssetRoleDataProvider implements AssetRoleDataProvider {

  addAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<AssetRole> {
    assetRole.assetRoleId = generateUUID();
    assetRole.version = generateUUID();
    assetRole.dateModified = new Date();

    return Observable.create(function (observer: Observer<AssetRole>) {
      assetRoles.insert(assetRole, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  updateAssetRole(assetRole: AssetRole, headerOptions?: any): Observable<Affect> {
    assetRole.version = generateUUID();
    assetRole.dateModified = new Date();

    return Observable.create(function (observer: Observer<Affect>) {
      assetRoles.update(
        {assetRoleId: assetRole.assetRoleId, ownerPartyId: assetRole.ownerPartyId},
        assetRole,
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

  deleteAssetRole(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect> {
    return Observable.create(function (observer: Observer<Affect>) {
      assetRoles.remove(
        {assetRoleId: assetRoleId, ownerPartyId: ownerPartyId},
        { multi: true },
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

  findAssetRoles(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetRole[]> {
    return Observable.create(function (observer: Observer<AssetRole[]>) {
      assetRoles.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        assetRoles.find({ownerPartyId: ownerPartyId, name: new RegExp(searchStr) })
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

  getAssetRoleById(assetRoleId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetRole> {
    return Observable.create(function (observer: Observer<AssetRole>) {
      assetRoles.find(
        {assetRoleId: assetRoleId, ownerPartyId: ownerPartyId},
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

  getAssetRoleCount(ownerPartyId: string, headerOptions?: any): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      assetRoles.count(
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

  getAssetRoles(ownerPartyId: string, pageNumber: number, pageSize: number, sort: Sort, headerOptions?: any): Observable<Page<AssetRole[]>> {
    return Observable.create(function (observer: Observer<Page<AssetRole[]>>) {
      assetRoles.count({ ownerPartyId: ownerPartyId }, function (err, count) {
        const skipAmount = SkipGenerator.generate(pageNumber, pageSize, count);
        const generate = SortGenerator.generate(sort);
        assetRoles.find({ownerPartyId: ownerPartyId})
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