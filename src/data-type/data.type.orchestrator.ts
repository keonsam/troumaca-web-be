import { createDataTypeRepository } from "../adapter/data-type/data.type.repository.factory";
import { DataTypeRepository } from "../repository/data.type.repository";
import { DataType } from "../data/data-type/data.type";
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
