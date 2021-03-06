import {StreetAddressDataProvider} from "../../../port/street.address.data.provider";
import {Observable, Observer} from "rxjs";
import {RepositoryKind} from "../../../repository.kind";
import {streetAddresses} from "../../../db";
import {StreetAddress} from "../../../domain/model/site/street.address";
import {calcSkip} from "../../../db.util";
import {generateUUID} from "../../../uuid.generator";

export class NedbStreetAddressDataProvider implements StreetAddressDataProvider {

  private defaultPageSize: number = 10;

  saveStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
    streetAddress.siteId = generateUUID();
    return Observable.create(function (observer: Observer<StreetAddress>) {
      streetAddresses.insert(streetAddress, function (err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(streetAddress);
        }
        observer.complete();
      });
    });
  }

  getStreetAddresses(pageNumber: number, pageSize: number, order: string): Observable<StreetAddress[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Observable.create(function (observer: Observer<StreetAddress[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      streetAddresses.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getStreetAddressCount(): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      streetAddresses.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getStreetAddressById(siteId: string): Observable<StreetAddress> {
    return Observable.create(function (observer: Observer<StreetAddress>) {
      const query = {
        "siteId": siteId
      };
      streetAddresses.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      streetAddresses.update(query, streetAddress, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteStreetAddress(siteId: string): Observable<number> {
    return Observable.create(function (observer: Observer<number>) {
      const query = {
        "siteId": siteId
      };
      streetAddresses.remove(query, {}, function (err: any, numRemoved: number) {
        if (!err) {
          observer.next(numRemoved);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

}

// class StreetAddressRestRepository implements StreetAddressDataProvider {
//
//   deleteStreetAddress(siteId: string): Observable<number> {
//     return undefined;
//   }
//
//   getStreetAddressById(siteId: string): Observable<StreetAddress> {
//     return undefined;
//   }
//
//   getStreetAddressCount(): Observable<number> {
//     return undefined;
//   }
//
//   getStreetAddresses(pageNumber: number, pageSize: number, order: string): Observable<StreetAddress[]> {
//     return undefined;
//   }
//
//   saveStreetAddress(streetAddress: StreetAddress): Observable<StreetAddress> {
//     return undefined;
//   }
//
//   updateStreetAddress(siteId: string, streetAddress: StreetAddress): Observable<number> {
//     return undefined;
//   }
// }

// export function createStreetAddressRepository(kind?: RepositoryKind): StreetAddressDataProvider {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new NedbStreetAddressDataProvider();
//     case RepositoryKind.Rest:
//       return new StreetAddressRestRepository();
//     default:
//       return new NedbStreetAddressDataProvider();
//   }
// }
