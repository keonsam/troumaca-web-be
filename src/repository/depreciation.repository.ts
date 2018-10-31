import {Depreciation} from "../data/asset/depreciation";
import {Asset} from "../data/asset/asset";
import {DepreciationMethod} from "../adapter/asset/depreciation.method";
import {DepreciationSystem} from "../data/asset/depreciation.system";
import {PropertyClass} from "../data/asset/property.class";
import {Observable} from "rxjs";

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
