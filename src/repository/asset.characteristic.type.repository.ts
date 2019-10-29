import {AssetCharacteristicType} from "../data/asset/asset.characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { AssetCharacteristicTypes } from "../data/asset/asset.characteristic.types";

export interface AssetCharacteristicTypeRepository {

  addAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<AssetCharacteristicType>;

  updateAssetCharacteristicType(assetCharacteristicType: AssetCharacteristicType, headerOptions?: any): Observable<Affect>;

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<AssetCharacteristicType[]>;

  // getAssetCharacteristicTypes(headerOptions?: any): Observable<AssetCharacteristicTypes>;

  getAssetCharacteristicTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<AssetCharacteristicType>;


}
