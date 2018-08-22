import { DepreciationRepository } from "../depreciation.repository";
import { Observable } from "rxjs";
import { Depreciation } from "../depreciation";
import { Asset } from "../../asset-type/asset/asset";
import { DepreciationMethod } from "../depreciation.method";
import { DepreciationSystem } from "../depreciation.system";
import { PropertyClass } from "../property.class";


export class DepreciationRepositoryRestAdapter implements DepreciationRepository {

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
