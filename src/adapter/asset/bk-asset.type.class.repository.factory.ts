import Rx from "rxjs";
import { AssetTypeClassRepository } from "../../repository/asset.type.class.repository";
import { Observable } from "rxjs/Observable";
import { AssetTypeClass } from "../../data/asset/asset.type.class";

import { generateUUID } from "../../uuid.generator";
import { calcSkip } from "../../db.util";
import { Observer } from "rxjs/Observer";
import { RepositoryKind } from "../../repository.kind";
import { assetTypeClasses } from "../../db";

const defaultPageSize = 10;

class AssetTypeClassDBRepository  {

//   findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
//     let searchStrLocal = new RegExp(searchStr);
//     return Rx.Observable.create(function (observer: Observer<AssetTypeClass[]>) {
//       if (!searchStr) {
//         assetTypeClasses.find({}).limit(100).exec(function (err: any, doc: any) {
//           if (!err) {
//             observer.next(doc);
//           } else {
//             observer.error(err);
//           }
//           observer.complete();
//         });
//       } else {
//         assetTypeClasses.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
//           if (!err) {
//             observer.next(doc);
//           } else {
//             observer.error(err);
//           }
//           observer.complete();
//         });
//       };
//     });
//   }
//
//   getAssetTypeClasses(pageNumber:number, pageSize:number, order:string):Observable<AssetTypeClass[]> {
//     return Rx.Observable.create(function (observer:Observer<AssetTypeClass[]>) {
//       let skip = calcSkip(pageNumber, pageSize, defaultPageSize);
//       assetTypeClasses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err:any, doc:any) {
//         if (!err) {
//           observer.next(doc);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
//
//   getAssetTypeClassCount():Observable<number> {
//     return Rx.Observable.create(function (observer:Observer<number>) {
//       assetTypeClasses.count({}, function (err:any, count:number) {
//         if (!err) {
//           observer.next(count);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
//
//   getAssetTypeClassById(assetTypeClassId:string):Observable<AssetTypeClass> {
//     return Rx.Observable.create(function (observer:Observer<AssetTypeClass>) {
//       let query = {
//         "assetTypeClassId":assetTypeClassId
//       };
//
//       assetTypeClasses.findOne(query, function (err:any, doc:any) {
//         if (!err) {
//           observer.next(doc);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
//
//   getAssetTypeClassByIds(assetTypeClassIds:string[]):Observable<AssetTypeClass[]> {
//     return Rx.Observable.create(function (observer:Observer<AssetTypeClass[]>) {
//       assetTypeClasses.find({assetTypeClassId: { $in: assetTypeClassIds}}, function (err:any, docs:any) {
//         if (!err) {
//           observer.next(docs);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
//
//   saveAssetTypeClass(assetTypeClass:AssetTypeClass):Observable<AssetTypeClass> {
//     assetTypeClass.assetTypeClassId = generateUUID();
//     return Rx.Observable.create(function (observer:Observer<AssetTypeClass>) {
//       assetTypeClasses.insert(assetTypeClass, function (err:any, doc:any) {
//         if (!err) {
//           observer.next(doc);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       });
//     });
//   }
//
//   deleteAssetTypeClass(assetTypeClassId:string):Observable<number> {
//     return Rx.Observable.create(function (observer:Observer<number>) {
//       let query = {
//         "assetTypeClassId":assetTypeClassId
//       };
//
//       assetTypeClasses.remove(query, {}, function (err:any, numRemoved:number) {
//         if (!err) {
//           observer.next(numRemoved);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       })
//     });
//   }
//
//   updateAssetTypeClass(assetTypeClassId:string, assetTypeClass:AssetTypeClass):Observable<number> {
//     return Rx.Observable.create(function (observer:Observer<number>) {
//       let query = {
//         "assetTypeClassId":assetTypeClassId
//       };
//       assetTypeClasses.update(query, assetTypeClass, {}, function (err:any, numReplaced:number) {
//         if (!err) {
//           observer.next(numReplaced);
//         } else {
//           observer.error(err);
//         }
//         observer.complete();
//       })
//     });
//   }
//
// }
//
//
// class AssetTypeClassRestRepository implements AssetTypeClassRepository {
//
//   findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
//     return undefined;
//   }
//
//
//     deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
//     return undefined;
//   }
//
//   getAssetTypeClassById(assetTypeClassId: string): Observable<AssetTypeClass> {
//     return undefined;
//   }
//
//   getAssetTypeClassByIds(assetTypeClassIds: string[]): Observable<AssetTypeClass[]> {
//     return undefined;
//   }
//
//   getAssetTypeClassCount(): Observable<number> {
//     return undefined;
//   }
//
//   getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetTypeClass[]> {
//     return undefined;
//   }
//
//   saveAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass> {
//     return undefined;
//   }
//
//   updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass): Observable<number> {
//     return undefined;
//   }
//
// }
//
//
// export function createAssetTypeClassesRepositoryFactory(kind?:RepositoryKind) {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new AssetTypeClassDBRepository();
//     case RepositoryKind.Rest:
//       return new AssetTypeClassRestRepository();
//     default:
//       return new AssetTypeClassDBRepository();
//   }
}
