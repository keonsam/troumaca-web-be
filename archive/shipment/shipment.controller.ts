// import { Request, Response } from "express";
// import { ShipmentOrchestrator } from "./shipment.orchestrator";
// import { getNumericValueOrDefault } from "../number.util";
// import { getStringValueOrDefault } from "../string.util";
//
// const orchestrator: ShipmentOrchestrator = new ShipmentOrchestrator();
//
// export let getShipments = (req: Request, res: Response) => {
//   const number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const size = getNumericValueOrDefault(req.query.pageSize, 10);
//   const field = getStringValueOrDefault(req.query.sortField, "");
//   const direction = getStringValueOrDefault(req.query.sortOrder, "");
//
//   orchestrator
//     .getShipments(number, size, field, direction)
//     .subscribe(shipments => {
//       res.send(JSON.stringify(shipments));
//     });
// };
//
// export let getShipmentById = (req: Request, res: Response) => {
//   const shipmentId = req.params.shipmentId;
//   orchestrator
//     .getShipmentById(shipmentId)
//     .subscribe(shipment => {
//       const body = JSON.stringify(shipment);
//       res.send(body);
//     });
//
// };
//
// export let updateShipments = (req: Request, res: Response) => {
//   const shipmentId = req.params.shipmentId;
//   const shipment = req.body;
//   orchestrator
//     .updateShipment(shipmentId, shipment)
//     .subscribe(shipment => {
//       res.send(JSON.stringify(shipment));
//     });
//
// };
//
// export let deleteShipments = (req: Request, res: Response) => {
//   const shipmentId = req.params.shipmentId;
//   orchestrator
//     .deleteShipment(shipmentId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     });
// };
//
