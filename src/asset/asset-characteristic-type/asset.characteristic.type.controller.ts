// import {Request, Response} from "express";
// import {AssetCharacteristicTypeOrchestrator} from "./asset.characteristic.type.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Sort} from "../../util/sort";
// import {Order} from "../../util/order";
//
// const assetCharacteristicTypeOrchestrator: AssetCharacteristicTypeOrchestrator = new AssetCharacteristicTypeOrchestrator();
//
// export let findAssetCharacteristicTypes = (req: Request, res: Response) => {
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
//   assetCharacteristicTypeOrchestrator.findAssetCharacteristicTypes(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//   .subscribe(assetCharacteristicTypes => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(assetCharacteristicTypes));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getAssetCharacteristicTypes = (req: Request, res: Response) => {
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
//
//   assetCharacteristicTypeOrchestrator.getAssetCharacteristicTypes(ownerPartyId.toString(), number, size, sort, headerOptions)
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
// export let getAssetCharacteristicTypeById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const assetCharacteristicTypeId = req.params.assetCharacteristicTypeId;
//
//   assetCharacteristicTypeOrchestrator.getAssetCharacteristicTypeById(assetCharacteristicTypeId, ownerPartyId.toString(), headerOptions)
//   .subscribe(assetCharacteristicType => {
//     if (assetCharacteristicType) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(assetCharacteristicType));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicTypeId}));
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
// export let addAssetCharacteristicType = (req: Request, res: Response) => {
//
//   const assetCharacteristicType = req.body;
//   if (!assetCharacteristicType) {
//     return res.status(400).send({message: "Asset Characteristic Type can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetCharacteristicTypeOrchestrator.addAssetCharacteristicType(assetCharacteristicType, headerOptions)
//   .subscribe(assetCharacteristicType => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201);
//     res.send(JSON.stringify(assetCharacteristicType));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let updateAssetCharacteristicType = (req: Request, res: Response) => {
//
//   const assetCharacteristicType = req.body;
//   const assetCharacteristicTypeId = req.params.assetCharacteristicTypeId;
//   if (!assetCharacteristicType && !assetCharacteristicTypeId && assetCharacteristicType.assetCharacteristicTypeId) {
//     return res.status(400).send({
//       message: "Asset Characteristic Type nor \"assetCharacteristicTypeId\" can not be empty"
//     });
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetCharacteristicTypeOrchestrator.updateAssetCharacteristicType(assetCharacteristicType, headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicTypeId}));
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
// export let deleteAssetCharacteristicType = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   const assetCharacteristicTypeId = req.params.assetCharacteristicTypeId;
//   if (!assetCharacteristicTypeId) {
//     return res.status(400).send({message: "Require \"assetCharacteristicTypeId\"."});
//   }
//
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   assetCharacteristicTypeOrchestrator.deleteAssetCharacteristicType(assetCharacteristicTypeId, ownerPartyId.toString(), headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicTypeId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
