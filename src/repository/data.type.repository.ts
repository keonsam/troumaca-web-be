import { DataType } from "../data/data-type/data.type";
import { Observable } from "rxjs";

export interface DataTypeRepository {

  getDataTypes(): Observable<DataType[]>;

}
