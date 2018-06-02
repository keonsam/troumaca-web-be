import {DataType} from "./data.type";
import {Observable} from "rxjs/Observable";

export interface DataTypeRepository {

  getDataTypes():Observable<DataType>;

  getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]>;

}
