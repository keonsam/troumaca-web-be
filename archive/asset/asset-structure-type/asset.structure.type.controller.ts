// import {Request, Response} from "express";
// import {AssetStructureTypeOrchestrator} from "./asset.structure.type.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {Sort} from "../../util/sort";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Order} from "../../util/order";
//
// const assetStructureTypeOrchestrator: AssetStructureTypeOrchestrator = new AssetStructureTypeOrchestrator();
//
// export let findAssetStructureTypes = (req: Request, res: Response) => {
//
//   const searchText: string = req.query.q;
//   const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   if (!searchText) {
//     return res.status(400).send({message: "Require search query."});
//   }
//
//   assetStructureTypeOrchestrator.findAssetStructureTypes(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//   .subscribe(assetStructureTypes => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(assetStructureTypes));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getAssetStructureTypes = (req: Request, res: Response) => {
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
//   assetStructureTypeOrchestrator.getAssetStructureTypes(ownerPartyId.toString(), number, size, sort, headerOptions)
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
// export let getAssetStructureTypeById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const assetStructureTypeId = req.params.assetStructureTypeId;
//
//   assetStructureTypeOrchestrator.getAssetStructureTypeById(assetStructureTypeId, ownerPartyId.toString(), headerOptions)
//   .subscribe(assetStructureType => {
//     if (assetStructureType) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(assetStructureType));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetStructureTypeId}));
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
// export let addAssetStructureType = (req: Request, res: Response) => {
//
//   const assetStructureType = req.body;
//   if (!assetStructureType) {
//     return res.status(400).send({message: "Asset Structure Type can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetStructureTypeOrchestrator.addAssetStructureType(assetStructureType, headerOptions)
//   .subscribe(assetStructureType => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201);
//     res.send(JSON.stringify(assetStructureType));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let updateAssetStructureType = (req: Request, res: Response) => {
//
//   const assetStructureType = req.body;
//   const assetStructureTypeId = req.params.assetStructureTypeId;
//   if (!assetStructureType && !assetStructureTypeId && assetStructureType.assetStructureTypeId) {
//     return res.status(400).send({message: "Asset Structure Type nor \"assetStructureTypeId\" can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetStructureTypeOrchestrator.updateAssetStructureType(assetStructureType, headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetStructureTypeId}));
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
// export let deleteAssetStructureType = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   const assetStructureTypeId = req.params.assetStructureTypeId;
//   if (!assetStructureTypeId) {
//     return res.status(400).send({message: "Require \"assetStructureTypeId\"."});
//   }
//
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   assetStructureTypeOrchestrator.deleteAssetStructureType(assetStructureTypeId, ownerPartyId.toString(), headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetStructureTypeId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
