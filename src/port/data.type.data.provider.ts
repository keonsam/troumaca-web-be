import {DataType} from "../domain/model/datatype/data.type";
import {Observable} from "rxjs";

export interface DataTypeDataProvider {

  getDataTypes(): Observable<DataType[]>;

}
