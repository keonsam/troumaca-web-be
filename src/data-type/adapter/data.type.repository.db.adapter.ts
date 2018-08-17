import { DataTypeRepository } from "../data.type.repository";
import { Observable } from "rxjs/Observable";
import { DataType } from "../data.type";
import { Observer } from "rxjs/Observer";
import { dataTypes } from "../../db";

export class DataTypeRepositoryNeDbAdapter implements DataTypeRepository {
    getDataTypes(): Observable<DataType[]> {
        return Observable.create(function (observer: Observer<DataType[]>) {
            dataTypes.find({}, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    // USED BY OTHER REPOS

    getDataTypeByIds(dataTypeIds: string[]): Observable<DataType[]> {
        return Observable.create(function (observer: Observer<DataType[]>) {
            dataTypes.find({dataTypeId: { $in: dataTypeIds}}, function (err: any, docs: any) {
                if (!err) {
                    observer.next(docs);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

}
