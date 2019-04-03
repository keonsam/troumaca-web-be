// import {Request, Response} from "express";
// import {UnitOfMeasurementDimensionOrchestrator} from "./unit.of.measurement.dimension.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Sort} from "../../util/sort";
// import {Order} from "../../util/order";
//
// const unitOfMeasurementDimensionOrchestrator: UnitOfMeasurementDimensionOrchestrator = new UnitOfMeasurementDimensionOrchestrator();
//
// export let findUnitOfMeasurementDimensions = (req: Request, res: Response) => {
//
//   const searchText: string = req.query.q;
//   const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   unitOfMeasurementDimensionOrchestrator.findUnitOfMeasurementDimensions(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//   .subscribe(assetNameTypes => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(assetNameTypes));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getUnitOfMeasurementDimensions = (req: Request, res: Response) => {
//
//   const number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const size = getNumericValueOrDefault(req.query.pageSize, 10);
//   const field = getStringValueOrDefault(req.query.sortField, "");
//   const direction = getDirectionValueOrDefault(req.query.sortOrder, null);
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   const sort: Sort = new Sort().add(new Order(direction, field));
//   unitOfMeasurementDimensionOrchestrator.getUnitOfMeasurementDimensions(ownerPartyId.toString(), number, size, sort, headerOptions)
//   .subscribe(page => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(page));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getUnitOfMeasurementDimensionById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const unitOfMeasurementDimensionId = req.params.unitOfMeasurementDimensionId;
//
//   unitOfMeasurementDimensionOrchestrator.getUnitOfMeasurementDimensionById(unitOfMeasurementDimensionId, ownerPartyId.toString(), headerOptions)
//   .subscribe(assetNameType => {
//     if (assetNameType) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(assetNameType));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementDimensionId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let addUnitOfMeasurementDimension = (req: Request, res: Response) => {
//
//   const assetNameType = req.body;
//   if (!assetNameType) {
//     return res.status(400).send({message: "Asset Name Type can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   unitOfMeasurementDimensionOrchestrator.addUnitOfMeasurementDimension(assetNameType, headerOptions)
//   .subscribe(assetType => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201);
//     res.send(JSON.stringify(assetType));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let updateUnitOfMeasurementDimension = (req: Request, res: Response) => {
//
//   const assetNameType = req.body;
//   const unitOfMeasurementDimensionId = req.params.unitOfMeasurementDimensionId;
//   if (!assetNameType && !unitOfMeasurementDimensionId && assetNameType.unitOfMeasurementDimensionId) {
//     return res.status(400).send({
//       message: "Asset Name Type nor \"unitOfMeasurementDimensionId\" can not be empty"
//     });
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   unitOfMeasurementDimensionOrchestrator.updateUnitOfMeasurementDimension(assetNameType, headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementDimensionId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
//
// export let deleteUnitOfMeasurementDimension = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   const unitOfMeasurementDimensionId = req.params.unitOfMeasurementDimensionId;
//   if (!unitOfMeasurementDimensionId) {
//     return res.status(400).send({message: "Require \"unitOfMeasurementDimensionId\"."});
//   }
//
//   unitOfMeasurementDimensionOrchestrator.deleteUnitOfMeasurementDimension(unitOfMeasurementDimensionId, ownerPartyId.toString(), headerOptions)
//     .subscribe(affect => {
//       if (affect.affected > 0) {
//         res.setHeader("Content-Type", "application/json");
//         res.status(200);
//         res.send(JSON.stringify(affect));
//       } else {
//         res.setHeader("Content-Type", "application/json");
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementDimensionId}));
//       }
//     }, error => {
//       res.setHeader("Content-Type", "application/json");
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
