// import {createAssetRepository} from './asset.repository.factory';
import {shapeAssetsResponse} from "./asset.response.shaper";
import {getSortOrderOrDefault} from "../../sort.order.util";
import {AssetRepository} from "../../repository/asset.repository";
// import { forkJoin } from "rxjs/observable/forkJoin";
import {Asset} from "../../data/asset/asset";
import {AssetKind} from "../../data/asset/asset.kind";
import {AssetType} from "../../data/asset/asset.type";
import {UnitOfMeasure} from "../../data/unit-of-measure/unit.of.measure";
// import { Person } from "../../party/person/person";
import {Site} from "../../data/site/site";
import {Result} from "../../result.success";

import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {createAssetTypeRepository} from "../../adapter/asset/asset.type.repository.factory";
import {AssetKindRepository} from "../../repository//asset.kind.repository";
import {createAssetKindRepository} from "../../adapter/asset/asset.kind.repository.factory";
import {UnitOfMeasureRepository} from "../../repository/unit.of.measure.repository";
import {createUnitOfMeasureRepository} from "../../adapter/unit-of-measure/unit.of.measure.repository.factory";
import {UserRepository} from "../../repository//user.repository";
import {createUserRepository} from "../../adapter/party/user.repository.factory";
import {SiteRepository} from "../../repository//site.repository";
import {createSiteRepository} from "../../adapter/site/site.repository.factory";

export class BkAssetOrchestrator {

  // private assetRepository:AssetRepository;
  // private assetTypeRepository:AssetTypeRepository;
  // private assetKindRepository:AssetKindRepository;
  // private unitOfMeasureRepository:UnitOfMeasureRepository;
  // private userRepository:UserRepository;
  // private siteRepository:SiteRepository;

  constructor(options?: any) {
    // this.assetRepository = createAssetRepository(options);
    // this.assetTypeRepository = createAssetTypeRepository(options);
    // this.assetKindRepository = createAssetKindRepository(options);
    // this.unitOfMeasureRepository = createUnitOfMeasureRepository(options);
    // this.userRepository = createUserRepository(options);
    // this.siteRepository = createSiteRepository(options);
  }

  // getAssets(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
  //     let sort: string = getSortOrderOrDefault(field, direction);
  //     return this.assetRepository
  //         .getAssets(number, size, sort)
  //         .switchMap((assets: Asset[]) => {
  //             if (assets.length < 1) {
  //                 let shapeAssetsResp: any = shapeAssetsResponse([], 0, 0, 0, 0, sort);
  //                 return Observable.of(new Result<any>(false, "no data found", shapeAssetsResp));
  //             } else {
  //                 let assetKindIds:string[] = [];
  //                 let assetTypeIds:string[] = [];
  //                 let unitOfMeasureIds:string[] = [];
  //                 let personIds:string[] = [];
  //                 let siteIds:string[] = [];
  //                 assets.forEach(x => {
  //                     if (x.assetKindId) assetKindIds.push(x.assetKindId);
  //                     if (x.assetTypeId) assetTypeIds.push(x.assetTypeId);
  //                     if (x.unitOfMeasureId) unitOfMeasureIds.push(x.unitOfMeasureId);
  //                     if (x.personId) personIds.push(x.personId);
  //                     if (x.siteId) siteIds.push(x.siteId);
  //                 });
  //                 return this.assetKindRepository.getAssetKindByIds(assetKindIds)
  //                     .switchMap((assetKinds: AssetKind[]) => {
  //                         return this.assetTypeRepository.getAssetTypeByIds(assetTypeIds)
  //                             .switchMap((assetTypes: AssetType[]) => {
  //                                 return this.unitOfMeasureRepository.getUnitOfMeasureByIds(unitOfMeasureIds)
  //                                     .switchMap((unitOfMeasures: UnitOfMeasure[]) => {
  //                                         return this.userRepository.getPersonByIds(personIds)
  //                                             .switchMap((persons:Person[]) => {
  //                                                 return this.siteRepository.getSiteByIds(siteIds)
  //                                                     .switchMap((sites: Site[]) => {
  //                                                         assets.forEach(value => {
  //                                                             let index = assetKinds.findIndex(x => x.assetKindId === value.assetKindId);
  //                                                             let index2 = assetTypes.findIndex(x => x.assetTypeId === value.assetTypeId);
  //                                                             let index3 = unitOfMeasures.findIndex(x => x.unitOfMeasureId === value.unitOfMeasureId);
  //                                                             let index4 = persons.findIndex(x => x.partyId === value.personId);
  //                                                             let index5 = sites.findIndex(x => x.siteId === value.siteId);
  //                                                             value.assetKind = index !== -1 ? assetKinds[index] : new AssetKind();
  //                                                             value.assetType = index2 !== -1 ? assetTypes[index2] : new AssetType();
  //                                                             value.unitOfMeasure = index3 !== -1 ? unitOfMeasures[index3] : new UnitOfMeasure();
  //                                                             value.person = index4 !== -1 ? persons[index4] : new Person();
  //                                                             value.site = index5 !== -1 ? sites[index5] : new Site();
  //                                                         });
  //                                                         return this.assetRepository
  //                                                             .getAssetCount()
  //                                                             .map(count => {
  //                                                                 let shapeAssetsResp:any = shapeAssetsResponse(assets, number, size, assets.length, count, sort);
  //                                                                 return new Result<any>(false, "assets", shapeAssetsResp);
  //                                                             });
  //                                                     });
  //                                             });
  //                                     });
  //                             });
  //                     });
  //             }
  //         });
  // }
  //
  // getAssetById(assetId:string):Observable<Asset> {
  //     return this.assetRepository.getAssetById(assetId)
  //         .switchMap((asset: Asset) => {
  //             if (!asset) return Observable.of(asset);
  //             return this.assetKindRepository.getAssetKindById(asset.assetKindId)
  //                 .switchMap(assetKind => {
  //                     asset.assetKind = assetKind ? assetKind : new AssetKind();
  //                     return this.assetTypeRepository.getAssetTypeById(asset.assetTypeId)
  //                         .switchMap(assetType => {
  //                             asset.assetType = assetType ? assetType : new AssetType();
  //                             return this.unitOfMeasureRepository.getUnitOfMeasureById(asset.unitOfMeasureId)
  //                                 .switchMap(unitOfMeasure => {
  //                                     asset.unitOfMeasure = unitOfMeasure ? unitOfMeasure : new UnitOfMeasure();
  //                                     return this.userRepository.getPerson(asset.personId)
  //                                         .switchMap(person => {
  //                                             asset.person = person ? person : new Person();
  //                                             return this.siteRepository.getSiteById(asset.siteId)
  //                                                 .map(site => {
  //                                                     asset.site = site ? site : new Site();
  //                                                     return asset;
  //                                                 });
  //                                         });
  //                                 });
  //                         });
  //                 });
  //         });
  // }
  //
  // saveAsset(asset:Asset):Observable<Asset> {
  //     return this.assetRepository.saveAsset(asset);
  // };
  //
  // updateAsset(assetId:string, asset:Asset):Observable<number> {
  //     return this.assetRepository.updateAsset(assetId, asset);
  // };
  //
  // deleteAsset(assetId:string):Observable<number> {
  //     return this.assetRepository.deleteAsset(assetId);
  // };

}

