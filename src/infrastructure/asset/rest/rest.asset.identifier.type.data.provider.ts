import {AssetIdentifierTypeDataProvider} from "../../../port/asset.identifier.type.data.provider";
import {AssetIdentifierType} from "../../../domain/model/asset/asset.identifier.type";
import {Observable} from "rxjs";
import {Affect} from "../../../domain/model/affect";
import {Sort} from "../../../util/sort";
// import {Page} from "../../../util/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetIdentifierTypes } from "../../../domain/model/asset/asset.identifier.types";

export class RestAssetIdentifierTypeDataProvider implements AssetIdentifierTypeDataProvider {
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
