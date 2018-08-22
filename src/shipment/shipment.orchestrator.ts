// import { createShipmentRepository } from "./shipment.repository.factory";
// import { ShipmentRepository } from "./shipment.repository";
// import { Observable } from "rxjs";
// import { getSortOrderOrDefault } from "../sort.order.util";
// import { shapeShipmentsResponse } from "./shipment.response.shaper";
// import { Shipment } from "./shipment";
// import { Result } from "../result.success";
//
// export class ShipmentOrchestrator {
//
//   private shipmentRepository: ShipmentRepository;
//
//   constructor() {
//     this.shipmentRepository = createShipmentRepository();
//   }
//
//   saveShipment(shipment: Shipment): Observable<Shipment> {
//     return this.shipmentRepository.saveShipment(shipment);
//   }
//
//   getShipments(number: number, size: number, field: string, direction: string): Observable<Result<any>> {
//     const sort: string = getSortOrderOrDefault(field, direction);
//     return this.shipmentRepository
//       .getShipments(number, size, sort)
//       .flatMap(value => {
//         return this.shipmentRepository
//           .getShipmentCount()
//           .map(count => {
//             const shapeShipmentsResp: any = shapeShipmentsResponse(value, number, size, value.length, count, sort);
//             return new Result<any>(false, "shipments", shapeShipmentsResp);
//           });
//       });
//   }
//
//   getShipmentById(shipmentId: string): Observable<Shipment> {
//     return this.shipmentRepository.getShipmentById(shipmentId);
//   }
//
//   updateShipment(shipmentId: string, shipment: Shipment): Observable<number> {
//     return this.shipmentRepository.updateShipment(shipmentId, shipment);
//   }
//
//   deleteShipment(shipmentId: string): Observable<number> {
//     return this.shipmentRepository.deleteShipment(shipmentId);
//   }
//
//
// }
