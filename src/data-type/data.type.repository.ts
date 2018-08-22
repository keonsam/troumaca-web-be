import { DataType } from "./data.type";
import { Observable } from "rxjs";

export interface DataTypeRepository {

  getDataTypes(): Observable<DataType[]>;

}
