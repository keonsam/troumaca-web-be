import {CharacteristicType} from "../domain/model/asset/characteristic.type";
import {Observable} from "rxjs";
import {Affect} from "../domain/model/affect";
import {Sort} from "../util/sort";
import {Page} from "../util/page";
import { CharacteristicTypes } from "../domain/model/asset/characteristic.types";

export interface AssetCharacteristicTypeDataProvider {

  getCharacteristicTypes(headerOptions?: any): Observable<CharacteristicTypes>;

  // OTHERS
  addAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<CharacteristicType>;

  updateAssetCharacteristicType(assetCharacteristicType: CharacteristicType, headerOptions?: any): Observable<Affect>;

  deleteAssetCharacteristicType(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<Affect>;

  findAssetCharacteristicTypes(ownerPartyId: string, searchStr: string, pageNumber: number, pageSize: number, headerOptions?: any): Observable<CharacteristicType[]>;

  getAssetCharacteristicTypeCount(ownerPartyId: string, headerOptions?: any): Observable<number>;

  getAssetCharacteristicTypeById(assetCharacteristicTypeId: string, ownerPartyId: string, headerOptions?: any): Observable<CharacteristicType>;


}
