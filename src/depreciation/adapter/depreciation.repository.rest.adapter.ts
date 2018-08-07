import { DepreciationRepository } from "../depreciation.repository";
import { Observable } from "rxjs/Observable";
import { Depreciation } from "../depreciation";


export class DepreciationRepositoryRestAdapter implements DepreciationRepository {

  constructor() {
  }

  getDepreciationArr(pageNumber: number, pageSize: number, order: string): Observable<Depreciation[]> {
      return undefined;
  }

  getDepreciationCount(): Observable<number> {
      return undefined;
  }

  getDepreciationById(depreciationId: string): Observable<Depreciation> {
      return undefined;
  }

  saveDepreciation(depreciation: Depreciation): Observable<Depreciation> {
      return undefined;
  }

  updateDepreciation(depreciationId: string, depreciation: Depreciation): Observable<number> {
      return undefined;
  }

  deleteDepreciation(depreciationId: string): Observable<number> {
      return undefined;
  }

}
