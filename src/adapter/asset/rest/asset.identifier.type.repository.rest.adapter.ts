import {AssetIdentifierTypeRepository} from "../../../repository/asset.identifier.type.repository";
import {AssetIdentifierType} from "../../../data/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetIdentifierTypes } from "../../../data/asset/asset.identifier.types";

export class AssetIdentifierTypeRepositoryRestAdapter implements AssetIdentifierTypeRepository {
  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType> {
    return undefined;
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssetIdentifierTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType[]> {
    return undefined;
  }

  getAssetIdentifierTypeById(assetIdentifierTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierType> {
    return undefined;
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetIdentifierTypes> {
    return undefined;
  }

  updateAssetIdentifierType(assetIdentifierTypeId: string, assetIdentifierType: AssetIdentifierType, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

}
