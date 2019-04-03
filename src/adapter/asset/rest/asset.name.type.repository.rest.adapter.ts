import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import {Observable} from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import {Page} from "../../../util/page";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetNameTypes } from "../../../data/asset/asset.name.types";

export class AssetNameTypeRepositoryRestAdapter implements AssetNameTypeRepository {
  addAssetNameType(assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<AssetNameType> {
    return undefined;
  }

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<number> {
    return undefined;
  }

  deleteAssetNameType(assetNameTypeId: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    return undefined;
  }

  findAssetNameTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetNameType[]> {
    return undefined;
  }

  getAssetNameTypeById(assetId: string): Observable<AssetNameType> {
    return undefined;
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, sort: Sort, headerOptions?: HeaderBaseOptions): Observable<AssetNameTypes> {
    return undefined;
  }
}
