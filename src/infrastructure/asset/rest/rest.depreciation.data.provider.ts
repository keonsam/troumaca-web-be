import {DepreciationDataProvider} from "../../../port/depreciation.data.provider";
import {Depreciation} from "../../../domain/model/asset/depreciation";
import {Asset} from "../../../domain/model/asset/asset";
import {DepreciationMethod} from "../../../domain/model/asset/depreciation.method";
import {DepreciationSystem} from "../../../domain/model/asset/depreciation.system";
import {PropertyClass} from "../../../domain/model/asset/property.class";
import {Observable} from "rxjs";


export class RestDepreciationDataProvider implements DepreciationDataProvider {

  constructor() {
  }

  getDepreciableAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return undefined;
  }

  getBookDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
    return undefined;
  }

  getTaxDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
    return undefined;
  }

  getDepreciationCount(): Observable<number> {
    return undefined;
  }

  getTaxDepreciationCount(): Observable<number> {
    return undefined;
  }

  getDepreciationById(depreciationId: string, type: string): Observable<Depreciation> {
    return undefined;
  }


  saveDepreciation(depreciation: Depreciation): Observable<Depreciation> {
    return undefined;
  }

  updateDepreciation(depreciationId: string, depreciation: Depreciation, type: string): Observable<number> {
    return undefined;
  }

  deleteDepreciation(depreciationId: string, type: string): Observable<number> {
    return undefined;
  }

  getDepreciationMethod(type: string, system?: string): Observable<DepreciationMethod[]> {
    return undefined;
  }

  getDepreciationSystems(): Observable<DepreciationSystem[]> {
    return undefined;
  }

  getPropertyClasses(system?: string): Observable<PropertyClass[]> {
    return undefined;
  }

}
