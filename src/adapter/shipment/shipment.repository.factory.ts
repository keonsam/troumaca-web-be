import * as Rx from "rxjs";
import { ShipmentRepository } from "../../repository/shipment.repository";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { RepositoryKind } from "../../repository.kind";
import { shipments } from "../../db";
import { Shipment } from "../../data/shipment/shipment";
import { calcSkip } from "../../db.util";
import { generateUUID } from "../../uuid.generator";

class ShipmentDBRepository implements ShipmentRepository {

  private defaultPageSize: number = 10;

  saveShipment(shipment: Shipment): Observable<Shipment> {
    shipment.shipmentId = generateUUID();
    return Rx.Observable.create(function(observer: Observer<Shipment>) {
      shipments.insert(shipment, function(err: any, doc: any) {
        if (err) {
          observer.error(err);
        } else {
          observer.next(shipment);
        }
        observer.complete();
      });
    });
  }

  getShipments(pageNumber: number, pageSize: number, order: string): Observable<Shipment[]> {
    const localDefaultPageSize = this.defaultPageSize;
    return Rx.Observable.create(function (observer: Observer<Shipment[]>) {
      const skip = calcSkip(pageNumber, pageSize, localDefaultPageSize);
      shipments.find({}).sort(order).skip(skip).limit(pageSize).exec(function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getShipmentCount(): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      shipments.count({}, function (err: any, count: number) {
        if (!err) {
          observer.next(count);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  getShipmentById(shipmentId: string): Observable<Shipment> {
    return Rx.Observable.create(function (observer: Observer<Shipment>) {
      const query = {
        "shipmentId": shipmentId
      };
      shipments.findOne(query, function (err: any, doc: any) {
        if (!err) {
          observer.next(doc);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  updateShipment(shipmentId: string, shipment: Shipment): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "shipmentId": shipmentId
      };
      shipments.update(query, shipment, {}, function (err: any, numReplaced: number) {
        if (!err) {
          observer.next(numReplaced);
        } else {
          observer.error(err);
        }
        observer.complete();
      });
    });
  }

  deleteShipment(shipmentId: string): Observable<number> {
    return Rx.Observable.create(function (observer: Observer<number>) {
      const query = {
        "shipmentId": shipmentId
      };
      shipments.remove(query, {}, function (err: any, numRemoved: number) {
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

class ShipmentRestRepository implements ShipmentRepository {

  deleteShipment(shipmentId: string): Observable<number> {
    return undefined;
  }

  getShipmentById(shipmentId: string): Observable<Shipment> {
    return undefined;
  }

  getShipmentCount(): Observable<number> {
    return undefined;
  }

  getShipments(pageNumber: number, pageSize: number, order: string): Observable<Shipment[]> {
    return undefined;
  }

  saveShipment(shipment: Shipment): Observable<Shipment> {
    return undefined;
  }

  updateShipment(shipmentId: string, shipment: Shipment): Observable<number> {
    return undefined;
  }
}

export function createShipmentRepository(kind?: RepositoryKind): ShipmentRepository {
  switch (kind) {
    case RepositoryKind.Nedb:
      return new ShipmentDBRepository();
    case RepositoryKind.Rest:
      return new ShipmentRestRepository();
    default:
      return new ShipmentDBRepository();
  }
}
