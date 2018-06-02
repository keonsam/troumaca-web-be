import {Observable} from "rxjs/Observable";
import {Shipment} from "./shipment";

export interface ShipmentRepository {
  saveShipment(shipment:Shipment):Observable<Shipment>;

  getShipments(pageNumber:number, pageSize:number, order:string):Observable<Shipment[]>;

  getShipmentCount():Observable<number>;

  getShipmentById(shipmentId:string):Observable<Shipment>;

  updateShipment(shipmentId:string, shipment:Shipment):Observable<number>;

  deleteShipment(shipmentId:string):Observable<number>;
}
