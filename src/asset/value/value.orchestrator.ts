import {createValueRepository} from "../../adapter/asset/value.repository.factory";
import {ValueRepository} from "../../repository/value.repository";
import {Value} from "../../data/asset/value";
import {shapeValuesResponse} from "./value.response.shaper";
import {shapeValuesResponse2} from "./value.response.shaper";
import {Result} from "../../result.success";
import {getSortOrderOrDefault} from "../../sort.order.util";


export class ValueOrchestrator {

  private valueRepository: ValueRepository;

  constructor(options?: any) {
    this.valueRepository = createValueRepository(options);
  }

  // findValues(searchStr:string, pageSize:number):Observable<Value[]> {
  //   return this.valueRepository.findValues(searchStr, pageSize);
  // }
  //
  // saveValue(value:Value[]):Observable<Value[]> {
  //   return this.valueRepository.saveValue(value);
  // };
  //
  // getValueCount():Observable<number> {
  //   return this.valueRepository.getValueCount();
  // }
  //
  // getValues(number:number, size:number, field:string, direction:string):Observable<Result<any>> {
  //   let sort:string = getSortOrderOrDefault(field, direction);
  //   return this.valueRepository
  //     .getValues(number, size, sort)
  //     .flatMap(value => {
  //       return this.valueRepository
  //         .getValueCount()
  //         .map(count => {
  //           let shapeValuesResp:any = shapeValuesResponse(value, number, size, value.length, count, sort);
  //           return new Result<any>(false, "values", shapeValuesResp);
  //         });
  //     });
  //
  // }
  //
  // getValuesByAssetTypeId(assetTypeId: string): Observable<Result<any>> {
  //   return this.valueRepository
  //     .getValuesByAssetTypeId(assetTypeId)
  //     .map(values => {
  //       let shapeValuesResp:any = shapeValuesResponse2(values);
  //       return new Result<any>(false, "values", shapeValuesResp);
  //     });
  // }
  //
  // getValueById(valueId:string):Observable<Value> {
  //   return this.valueRepository.getValueById(valueId);
  // }
  //
  // updateValue(assetTypeId:string, value:Value[]):Observable<number> {
  //   // delete all value then insert new one. It makes it less error prone.
  //   return this.valueRepository.deleteValuesByAssetTypeId(assetTypeId)
  //     .switchMap(numReplaced => {
  //       if(numReplaced) {
  //         return this.valueRepository.saveValue(value)
  //           .map( docs => {
  //             if(docs) {
  //               return numReplaced;
  //             }else {
  //               return 0;
  //             }
  //           });
  //       }else {
  //         return Observable.of(numReplaced);
  //       }
  //     });
  // }
  //
  // deleteValue(valueId:string):Observable<number> {
  //   return this.valueRepository.deleteValue(valueId);
  // }

}
