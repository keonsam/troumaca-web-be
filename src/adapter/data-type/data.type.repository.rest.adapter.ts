import {DataTypeRepository} from "../../repository/data.type.repository";
import {DataType} from "../../data/data-type/data.type";
import {Observable} from "rxjs";

export class DataTypeRepositoryRestAdapter implements DataTypeRepository {
  getDataTypes(): Observable<DataType[]> {
    return undefined;
  }

  getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]> {
    return undefined;
  }
}