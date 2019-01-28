import {AssetTypeRepository} from "../../repository/asset.type.repository";
import {AssetType} from "../../data/asset/asset.type";
import {Observable, Observer} from "rxjs";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import {Organization} from "../../data/party/organization";
import request from "request";
import {OtherAssetType} from "../../data/asset/other.asset.type";

export class AssetTypeRepositoryRestAdapter implements AssetTypeRepository {
  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypes(pageNumber: number, pageSize: number, order: string): Observable<AssetType[]> {
    return undefined;
  }

  getAssetTypeCount(): Observable<number> {
    return undefined;
  }

  getAssetTypeById(assetTypeId: string): Observable<AssetType> {
    return undefined;
  }

  // saveAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
  //   return undefined;
  // }

  addOtherAssetType(otherAssetType: OtherAssetType, options?: any): Observable<OtherAssetType> {
    const uri: string = properties.get("asset.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const json = ""; // {toPartyId: toPartyId};

    const uriAndPath: string = `${uri}/assets/asset-types/other-asset-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, json);

    return Observable.create(function (observer: Observer<Organization>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        try {
          if (response && response.statusCode != 200) {
            observer.error(body);
          } else {
            observer.next(body);
          }
        } catch (e) {
          observer.error(new Error(e.message));
        }
        observer.complete();
      });
    });
  }

  // updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
  //   return undefined;
  // }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return undefined;
  }
}