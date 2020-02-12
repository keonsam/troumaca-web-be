import {DataTypeDataProvider} from "../../../port/data.type.data.provider";
import {DataType} from "../../../domain/model/datatype/data.type";
import {Observable} from "rxjs";

export class RestDataTypeDataProvider implements DataTypeDataProvider {
  getDataTypes(): Observable<DataType[]> {
    return undefined;
  }

  getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]> {
    return undefined;
  }
}