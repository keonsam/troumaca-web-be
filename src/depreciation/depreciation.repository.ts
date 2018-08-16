import { Depreciation } from "./depreciation";
import { Observable } from "rxjs/Observable";
import { Asset } from "../asset-type/asset/asset";
import { DepreciationMethod } from "./depreciation.method";

export interface DepreciationRepository {

  getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  getBookDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]>;

  getDepreciationCount(): Observable<number>;

  getDepreciationById(depreciationId: string): Observable<Depreciation>;

  saveDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation>;

  updateDepreciation(depreciationId: string, depreciation: Depreciation): Observable<number>;

  deleteDepreciation(depreciationId: string): Observable<number>;

  getDepreciationMethod(): Observable<DepreciationMethod[]>;

}
