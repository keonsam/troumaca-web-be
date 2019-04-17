// import {Request, Response} from "express";
// import {UnitOfMeasurementOrchestrator} from "./unit.of.measurement.orchestrator";
// import {getNumericValueOrDefault} from "../number.util";
// import {getStringValueOrDefault} from "../string.util";
// import {HeaderBaseOptions} from "../header.base.options";
// import {getDirectionValueOrDefault} from "../direction.util";
// import {Sort} from "../util/sort";
// import {Order} from "../util/order";
//
// const unitOfMeasurementOrchestrator: UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();
//
// export const findUnitOfMeasurements = (req: Request, res: Response) => {
//
//   const searchText: string = req.query.q;
//   const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   unitOfMeasurementOrchestrator.findUnitOfMeasurements(searchText, pageNumber, pageSize, headerOptions)
//     .subscribe(unitOfMeasurements => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(unitOfMeasurements));
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(400);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export const getUnitOfMeasurements = (req: Request, res: Response) => {
//
//   const number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const size = getNumericValueOrDefault(req.query.pageSize, 10);
//   const field = getStringValueOrDefault(req.query.sortField, "");
//   const direction = getDirectionValueOrDefault(req.query.sortOrder, undefined);
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   const sort: Sort = new Sort().add(new Order(direction, field));
//   unitOfMeasurementOrchestrator.getUnitOfMeasurements(number, size, sort, headerOptions)
//     .subscribe(page => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(page));
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(400);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export const getUnitOfMeasurementById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const unitOfMeasurementId = req.params.unitOfMeasurementId;
//
//   unitOfMeasurementOrchestrator.getUnitOfMeasurementById(unitOfMeasurementId, headerOptions)
//     .subscribe(unitOfMeasurement => {
//       if (unitOfMeasurement) {
//         res.setHeader("Content-Type", "application/json");
//         res.status(200);
//         res.send(JSON.stringify(unitOfMeasurement));
//       } else {
//         res.setHeader("Content-Type", "application/json");
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
//       }
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export const addUnitOfMeasurement = (req: Request, res: Response) => {
//
//   const unitOfMeasurement = req.body;
//   if (!unitOfMeasurement) {
//     return res.status(400).send({message: "Unit Of Measurement  can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   unitOfMeasurementOrchestrator.addUnitOfMeasurement(unitOfMeasurement, headerOptions)
//     .subscribe(unitOfMeasurement => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(201);
//       res.send(JSON.stringify(unitOfMeasurement));
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export const updateUnitOfMeasurement = (req: Request, res: Response) => {
//
//   const unitOfMeasurement = req.body;
//   const unitOfMeasurementId = req.params.unitOfMeasurementId;
//   if (!unitOfMeasurement && !unitOfMeasurementId && unitOfMeasurement.unitOfMeasurementId) {
//     return res.status(400).send({
//       message: "Unit Of Measurement  nor \"unitOfMeasurementId\" can not be empty"
//     });
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   unitOfMeasurementOrchestrator.updateUnitOfMeasurement(unitOfMeasurementId, unitOfMeasurement, headerOptions)
//     .subscribe(affect => {
//       if (affect > 0) {
//         res.setHeader("Content-Type", "application/json");
//         res.status(200);
//         res.send(JSON.stringify(affect));
//       } else {
//         res.setHeader("Content-Type", "application/json");
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
//       }
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
//
// // export const deconsteUnitOfMeasurement = (req: Request, res: Response) => {
// //
// //   const headerOptions = HeaderBaseOptions.create(req);
// //   const ownerPartyId = headerOptions["Owner-Party-ID"];
// //
// //   const unitOfMeasurementId = req.params.unitOfMeasurementId;
// //   if (!unitOfMeasurementId) {
// //     return res.status(400).send({message: "Require \"unitOfMeasurementId\"."});
// //   }
// //
// //   unitOfMeasurementOrchestrator.deconsteUnitOfMeasurement(unitOfMeasurementId, ownerPartyId.toString(), headerOptions)
// //     .subscribe(affect => {
// //       if (affect.affected > 0) {
// //         res.setHeader("Content-Type", "application/json");
// //         res.status(200);
// //         res.send(JSON.stringify(affect));
// //       } else {
// //         res.setHeader("Content-Type", "application/json");
// //         res.status(404);
// //         res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
// //       }
// //     }, error => {
// //       res.setHeader("Content-Type", "application/json");
// //       res.status(500);
// //       res.send(JSON.stringify({message: "Error Occurred"}));
// //       console.log(error);
// //     });
// //
// // };
