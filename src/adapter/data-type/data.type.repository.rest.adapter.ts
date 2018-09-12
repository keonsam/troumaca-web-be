import { DataTypeRepository } from "../../repository/data.type.repository";
import { Observable } from "rxjs/Observable";
import { DataType } from "../../data/data-type/data.type";

export class DataTypeRepositoryRestAdapter implements DataTypeRepository {
    getDataTypes(): Observable<DataType[]> {
        return undefined;
    }

    getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]> {
        return undefined;
    }
}