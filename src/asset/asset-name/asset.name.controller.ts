// import {Request, Response} from "express";
// import {AssetNameOrchestrator} from "./asset.name.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {Sort} from "../../util/sort";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Order} from "../../util/order";
//
// const assetNameOrchestrator: AssetNameOrchestrator = new AssetNameOrchestrator();
//
// export let findAssetNames = (req: Request, res: Response) => {
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
//   assetNameOrchestrator.findAssetNames(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//   .subscribe(assetNames => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(assetNames));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getAssetNames = (req: Request, res: Response) => {
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
//   assetNameOrchestrator.getAssetNames(ownerPartyId.toString(), number, size, sort, headerOptions)
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
// export let getAssetNameById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const assetNameId = req.params.assetNameId;
//
//   assetNameOrchestrator.getAssetNameById(assetNameId, ownerPartyId.toString(), headerOptions)
//   .subscribe(assetName => {
//     if (assetName) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(assetName));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetNameId}));
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
// export let addAssetName = (req: Request, res: Response) => {
//
//   const assetName = req.body;
//   if (!assetName) {
//     return res.status(400).send({message: "Asset Name  can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetNameOrchestrator.addAssetName(assetName, headerOptions)
//   .subscribe(assetName => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201);
//     res.send(JSON.stringify(assetName));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let updateAssetName = (req: Request, res: Response) => {
//
//   const assetName = req.body;
//   const assetNameId = req.params.assetNameId;
//   if (!assetName && !assetNameId && assetName.assetNameId) {
//     return res.status(400).send({message: "Asset Name  nor \"assetNameId\" can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetNameOrchestrator.updateAssetName(assetName, headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetNameId}));
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
// export let deleteAssetName = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   const assetNameId = req.params.assetNameId;
//   if (!assetNameId) {
//     return res.status(400).send({message: "Require \"assetNameId\"."});
//   }
//
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   assetNameOrchestrator.deleteAssetName(assetNameId, ownerPartyId.toString(), headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetNameId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
