import { Depreciation } from "./depreciation";
import { Observable } from "rxjs/Observable";
import { Asset } from "../asset-type/asset/asset";
import { DepreciationMethod } from "./depreciation.method";
import { DepreciationSystem } from "./depreciation.system";
import { PropertyClass } from "./property.class";

export interface DepreciationRepository {

  getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  getBookDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]>;

  getTaxDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]>;

  getDepreciationCount(): Observable<number>;

  getTaxDepreciationCount(): Observable<number>;

  getDepreciationById(depreciationId: string, type: string): Observable<Depreciation>;

  saveDepreciation(depreciation: Depreciation, type: string): Observable<Depreciation>;

  updateDepreciation(depreciationId: string, depreciation: Depreciation, type: string): Observable<number>;

  deleteDepreciation(depreciationId: string, type: string): Observable<number>;

  getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]>;

  getDepreciationSystems(): Observable<DepreciationSystem[]>;

  getPropertyClasses(system?: string): Observable<PropertyClass[]>;

}
