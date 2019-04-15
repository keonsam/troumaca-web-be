import {AssetNameTypeRepository} from "../../../repository/asset.name.type.repository";
import {AssetNameType} from "../../../data/asset/asset.name.type";
import { Observable, Observer } from "rxjs";
import {Affect} from "../../../data/affect";
import {Sort} from "../../../util/sort";
import { HeaderBaseOptions } from "../../../header.base.options";
import { AssetNameTypes } from "../../../data/asset/asset.name.types";
import { properties } from "../../../properties.helpers";
import { jsonRequestHeaderMap, postJsonOptions, putJsonOptions } from "../../../request.helpers";
import request from "request";

export class AssetNameTypeRepositoryRestAdapter implements AssetNameTypeRepository {
  addAssetNameType(assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<AssetNameType> {
    let uri: string = properties.get("assetName.host.port") as string;

    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const json = assetNameType;

    uri = uri + "/assets/asset-name-types";

    const requestOptions: any = postJsonOptions(uri, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(error);
          } else if (error) {
            observer.error(error);
          } else {
            observer.next(body["assetNameType"]);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
  }

  updateAssetNameType(assetNameTypeId: string, assetNameType: AssetNameType, headerOptions?: HeaderBaseOptions): Observable<number> {
    let uri: string = properties.get("assetName.host.port") as string;

    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const json = assetNameType;

    uri = uri + "/assets/asset-name-types";

    const requestOptions: any = putJsonOptions(uri, headerMap, json);

    return Observable.create(function (observer: Observer<boolean>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(error);
          } else if (error) {
            observer.error(error);
          } else {
            observer.next(body["assetNameType"]);
          }
          observer.complete();
        } catch (e) {
          observer.error(new Error(e.message));
          observer.complete();
        }
      });
    });
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
