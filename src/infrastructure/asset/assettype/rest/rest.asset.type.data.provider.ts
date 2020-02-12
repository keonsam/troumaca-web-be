import {AssetTypeDataProvider} from "../../../../port/asset.type.data.provider";
import {AssetType} from "../../../../domain/model/asset/asset.type";
import {Observable} from "rxjs";
import {Affect} from "../../../../domain/model/affect";
// import { AssetTypes } from "../../../../domain/model/asset/asset.types";
import { HeaderBaseOptions } from "../../../../header.base.options";
import { AssetTypeRequest } from "../../../../domain/model/asset/request/asset.type.request";
import {
  deleteJsonOptions, deleteJsonOptionsWithQueryString,
  getJsonOptions,
  jsonRequestHeaderMap,
  postJsonOptions, putJsonOptions,
} from "../../../../request.helpers";
import request from "request";

export class RestAssetTypeDataProvider implements AssetTypeDataProvider {

  constructor(private registrarUrl: string) {
  }

  addAssetTypeRoot(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types/root`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, assetType);

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            subscriber.next(body);
          }
        }
        subscriber.complete();
      });
    });
  }

  addAssetType(assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, assetType);

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            subscriber.next(body);
          }
        }
        subscriber.complete();
      });
    });
  }

  deleteAssetType(assetTypeId: string, version: string, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types/${assetTypeId}?version=${version}`;

    const requestOptions: any = deleteJsonOptions(uriAndPath, headerMap, "");

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            let affected: number = body["affected"] as number;
            let affect: Affect = new Affect(affected);
            subscriber.next(affect);
          }
        }
        subscriber.complete();
      });
    });
  }

  findAssetTypes(searchStr: string, pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types/search`;

    if (pageNumber === null)  { pageNumber = 1 }

    if (pageSize === null)  { pageSize = 10 }

    const qs: string = `{q:${searchStr}, pageNumber:${pageNumber}, pageSize:${pageSize}}`;

    const requestOptions: any = getJsonOptions(uriAndPath, headerMap, qs);

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            if (body == "[]") {
              let value = new Array<AssetType>();
              subscriber.next(value);
            } else {
              subscriber.next(body);
            }
          }
        }
        subscriber.complete();
      });
    });
  }

  getAssetTypeById(assetTypeId: string, headerOptions?: HeaderBaseOptions): Observable<AssetType> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types/${assetTypeId}`;

    const requestOptions: any = getJsonOptions(uriAndPath, headerMap, "");

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            subscriber.next(body);
          }
        }
        subscriber.complete();
      });
    });
  }

  getAssetTypes(pageNumber: number, pageSize: number, headerOptions?: HeaderBaseOptions): Observable<AssetType[]> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types`;

    const requestOptions: any = getJsonOptions(uriAndPath, headerMap, "");

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            if (body == "[]") {
              let value = new Array<AssetType>();
              subscriber.next(value);
            } else {
              subscriber.next(body);
            }
          }
        }
        subscriber.complete();
      });
    });
  }

  updateAssetType(assetTypeId: string, assetType: AssetTypeRequest, headerOptions?: HeaderBaseOptions): Observable<Affect> {
    const headerMap = jsonRequestHeaderMap(headerOptions ? headerOptions.toHeaders() : {});

    const uriAndPath: string = `${this.registrarUrl}/assets/asset-types/${assetTypeId}`;

    const requestOptions: any = putJsonOptions(uriAndPath, headerMap, assetType);

    return new Observable(subscriber => {
      request(requestOptions, function (error: any, response: any, body: any) {
        if (error) {
          subscriber.error(error);
        } else {
          if (response && response.statusCode != 200) {
            subscriber.error(body);
          } else {
            // Todo: Need fixing
            subscriber.next(body);
          }
        }
        subscriber.complete();
      });
    });
  }

}
