import {AssetClassificationRepository} from "../../repository/asset.classification.repository";
import {AssetClassification} from "../../data/asset/asset.classification";
import {Observable, Observer} from "rxjs";
import {properties} from "../../properties.helpers";
import {jsonRequestHeaderMap, postJsonOptions} from "../../request.helpers";
import {classToPlain} from "class-transformer";
import {ValidateConfirmCode} from "../../repository/validate.confirm.code";
import {Confirmation} from "../../data/authentication/confirmation";
import request from "request";

export class AssetClassificationRepositoryRestAdapter implements AssetClassificationRepository {

  constructor() {
  }

  findAssetTypeClass(searchStr: string, pageSize: number): Observable<AssetClassification[]> {
    return undefined;
  }

  getAssetTypeClasses(pageNumber: number, pageSize: number, order: string): Observable<AssetClassification[]> {
    return undefined;
  }

  getAssetTypeClassCount(): Observable<number> {
    return undefined;
  }

  getAssetTypeClassById(assetTypeClassId: string): Observable<AssetClassification> {
    return undefined;
  }

  addAssetClassification(assetClassification: AssetClassification, options?: any): Observable<AssetClassification> {
    const uri: string = properties.get("credential.host.port") as string;

    const headerMap = jsonRequestHeaderMap(options ? options : {});

    const assetClassificationJson = classToPlain(assetClassification);

    const uriAndPath: string = `${uri}/assets/asset-classifications`;

    const requestOptions: any = postJsonOptions(uriAndPath, headerMap, assetClassificationJson);

    return Observable.create(function (observer: Observer<AssetClassification>) {
      request(requestOptions, function (error: any, response: any, body: any) {
        console.log(body);
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

  updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetClassification): Observable<number> {
    return undefined;
  }

  deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    return undefined;
  }

}
