import { DataTypeRepository } from "../data.type.repository";
import { Observable } from "rxjs";
import { DataType } from "../data.type";

export class DataTypeRepositoryRestAdapter implements DataTypeRepository {
    getDataTypes(): Observable<DataType[]> {
        return undefined;
    }

    getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]> {
        return undefined;
    }
}