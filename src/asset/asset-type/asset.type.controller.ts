// import {Request, Response} from "express";
// import {AssetTypeOrchestrator} from "./asset.type.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {Sort} from "../../util/sort";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Order} from "../../util/order";
//
// const assetTypeOrchestrator:AssetTypeOrchestrator = new AssetTypeOrchestrator();
//
// export let findAssetTypes = (req: Request, res: Response) => {
//
//   const searchText: string = req.query.q;
//   const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);
//
//   let headerOptions = HeaderBaseOptions.create(req);
//   let ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   if (!searchText) {
//     return res.status(400).send({message: "Require search query."});
//   }
//
//   assetTypeOrchestrator.findAssetTypes(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//     .subscribe(assetTypes => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200);
//       res.send(JSON.stringify(assetTypes));
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(400);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let getAssetTypes = (req: Request, res: Response) => {
//
//   const number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   const size = getNumericValueOrDefault(req.query.pageSize, 10);
//   const field = getStringValueOrDefault(req.query.sortField, "");
//   const direction = getDirectionValueOrDefault(req.query.sortOrder, null);
//
//   let headerOptions = HeaderBaseOptions.create(req);
//   let ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   let sort:Sort = new Sort().add(new Order(direction, field));
//   assetTypeOrchestrator.getAssetTypes(ownerPartyId.toString(), number, size, sort, headerOptions)
//     .subscribe(page => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200);
//       res.send(JSON.stringify(page));
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(400);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let getAssetTypeById = (req: Request, res: Response) => {
//
//   let headerOptions = HeaderBaseOptions.create(req);
//   let ownerPartyId = headerOptions["Owner-Party-ID"];
//   let assetTypeId = req.params.assetTypeId;
//
//   assetTypeOrchestrator.getAssetTypeById(assetTypeId, ownerPartyId.toString(), headerOptions)
//     .subscribe(assetType => {
//       if (assetType) {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200);
//         res.send(JSON.stringify(assetType));
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + assetTypeId}));
//       }
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let addAssetTypes = (req: Request, res: Response) => {
//
//   const assetType = req.body;
//   if (!assetType) {
//     return res.status(400).send({message: "Asset  Type can not be empty"});
//   }
//
//   let headerOptions = HeaderBaseOptions.create(req);
//
//   assetTypeOrchestrator.addAssetType(assetType, headerOptions)
//     .subscribe(assetType => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(201);
//       res.send(JSON.stringify(assetType));
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let updateAssetType = (req: Request, res: Response) => {
//
//   const assetType = req.body;
//   let assetTypeId = req.params.assetTypeId;
//   if (!assetType && !assetTypeId && assetType.assetTypeId) {
//     return res.status(400).send({message: "Asset  Type nor \"assetTypeId\" can not be empty"});
//   }
//
//   let headerOptions = HeaderBaseOptions.create(req);
//
//   assetTypeOrchestrator.updateAssetType(assetType, headerOptions)
//     .subscribe(affect => {
//       if (affect.affected > 0) {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200);
//         res.send(JSON.stringify(affect));
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + assetTypeId}));
//       }
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
//
// export let deleteAssetType = (req: Request, res: Response) => {
//
//   let headerOptions = HeaderBaseOptions.create(req);
//
//   let assetTypeId = req.params.assetTypeId;
//   if (!assetTypeId) {
//     return res.status(400).send({message: "Require \"assetTypeId\"."});
//   }
//
//   let ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   assetTypeOrchestrator.deleteAssetType(assetTypeId, ownerPartyId.toString(), headerOptions)
//     .subscribe(affect => {
//       if (affect.affected > 0) {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200);
//         res.send(JSON.stringify(affect));
//       } else {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(404);
//         res.send(JSON.stringify({message: "No Data Found For " + assetTypeId}));
//       }
//     }, error => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
