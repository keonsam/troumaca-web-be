import {createDataTypeDataProvider} from "../../../infrastructure/datatype/data.type.data.provider.factory";
import {DataTypeDataProvider} from "../../../port/data.type.data.provider";
import {DataType} from "../../../domain/model/datatype/data.type";
import {Observable} from "rxjs";

export class DataTypeOrchestrator {

  private dataTypeRepository: DataTypeDataProvider;

  constructor() {
    this.dataTypeRepository = createDataTypeDataProvider();
  }

  getDataTypes(): Observable<DataType[]> {
    return this.dataTypeRepository.getDataTypes();
  }

}
