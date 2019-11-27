import {CharacteristicType} from "../data/asset/characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../data/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { CharacteristicTypes } from "../data/asset/characteristic.types";

export interface AssetCharacteristicTypeRepository {

  getCharacteristicTypes(headerOptions?: any): Observable<CharacteristicTypes>;

  // OTHERS
  addAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<CharacteristicType>;

  updateAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<Affect>;

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<CharacteristicType[]>;

  getAssetCharacteristicTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<CharacteristicType>;


}
