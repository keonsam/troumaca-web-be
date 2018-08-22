import { createDataTypeRepository } from "./data.type.repository.factory";
import { DataTypeRepository } from "./data.type.repository";
import { DataType } from "./data.type";
import { Observable } from "rxjs";

export class DataTypeOrchestrator {

  private dataTypeRepository: DataTypeRepository;

  constructor() {
    this.dataTypeRepository = createDataTypeRepository();
  }

  getDataTypes(): Observable<DataType[]> {
    return this.dataTypeRepository.getDataTypes();
  }

}
