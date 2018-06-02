import * as Rx from 'rxjs';
import {ValueRepository} from "./value.repository";
import {Observable} from "rxjs/Observable";
import {Value} from "./value";
import {Observer} from "rxjs/Observer";
import {RepositoryKind} from "../../repository.kind";
import {calcSkip} from "../../db.util";
import {generateUUID} from "../../uuid.generator";
import {values} from "../../db";

class ValueDBRepository implements ValueRepository {

  private defaultPageSize:number = 10;

  findValues(searchStr: string, pageSize: number): Observable<Value[]> {
    let searchStrLocal = new RegExp(searchStr);
    return Rx.Observable.create(function (observer: Observer<Value[]>) {
      values.find({name: {$regex: searchStrLocal}}).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  saveValue(value: Value[]): Observable<Value[]> {
    let newValue: Value[] = [];
    value.forEach((next:Value) => {
      if (!next.valueId){
        next.valueId = generateUUID();
    }
      newValue.push(next);
    });
    return Rx.Observable.create(function (observer: Observer<Value>) {
      values.insert(newValue, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(doc);
        }
        observer.complete();
      });
    });
  }

  getValues(pageNumber: number, pageSize: number, order: string): Observable<Value[]> {
    return Rx.Observable.create(function (observer: Observer<Value[]>) {
      let skip = calcSkip(pageNumber, pageSize, this.defaultPageSize);
      values.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getValuesByAssetTypeId(assetTypeId: string): Observable<Value[]> {
    return Rx.Observable.create(function (observer: Observer<Value[]>) {
      values.find({assetTypeId},function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getValueCount(): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      values.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  getValueById(valueId: string): Observable<Value> {
    return Rx.Observable.create(function (observer: Observer<Value>) {
      let query = {
        "valueId": valueId
      };
      values.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  };

  updateValue(assetTypeId: string, value: Value[]): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      let query = {
        "assetTypeId": assetTypeId
      };
      values.update(query, value, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deleteValue(valueId:string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      let query = {
        "valueId":valueId
      };

      values.remove(query, {}, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };

  deleteValuesByAssetTypeId(assetTypeId:string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      let query = {
        assetTypeId
      };

      values.remove(query, { multi: true }, function (err:any, numRemoved:number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      })
    });
  };
}

class ValueRestRepository implements ValueRepository {
  findValues(searchStr:string, pageSize:number): Observable<Value[]> {
    return undefined;
  }

  getValuesByAssetTypeId(assetTypeId: string): Observable<Value[]> {
    return undefined;
  }

  saveValue(value:Value[]):Observable<Value[]> {
    return null
  }

  getValues(pageNumber:number, pageSize:number, order:string):Observable<Value[]> {
    return null;
  }

  getValueCount():Observable<number> {
    return null;
  };

  getValueById(valueId:string):Observable<Value> {
    return null;
  };

  updateValue(assetTypeId:string, value:Value[]):Observable<number> {
    return null;
  };

  deleteValue(valueId:string): Observable<number> {
    return null;
  };

  deleteValuesByAssetTypeId(assetTypeId:string): Observable<number> {
    return null;
  }


  }

export function createValueRepository(kind?:RepositoryKind):ValueRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ValueDBRepository();
    case RepositoryKind.Rest:
      return new ValueRestRepository();
    default:
      return new ValueDBRepository();
  }
}
