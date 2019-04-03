// import {Request, Response} from "express";
// import {AssetCategoryLegalValueOrchestrator} from "./asset.category.legal.value.orchestrator";
// import {getNumericValueOrDefault} from "../../number.util";
// import {getStringValueOrDefault} from "../../string.util";
// import {HeaderBaseOptions} from "../../header.base.options";
// import {getDirectionValueOrDefault} from "../../direction.util";
// import {Sort} from "../../util/sort";
// import {Order} from "../../util/order";
//
// const assetCategoryLegalValueOrchestrator: AssetCategoryLegalValueOrchestrator = new AssetCategoryLegalValueOrchestrator();
//
// export let findAssetCategoryLegalValues = (req: Request, res: Response) => {
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
//   assetCategoryLegalValueOrchestrator.findAssetCategoryLegalValues(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
//   .subscribe(assetCategoryLegalValues => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200);
//     res.send(JSON.stringify(assetCategoryLegalValues));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(400);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let getAssetCategoryLegalValues = (req: Request, res: Response) => {
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
//   assetCategoryLegalValueOrchestrator.getAssetCategoryLegalValues(ownerPartyId.toString(), number, size, sort, headerOptions)
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
// export let getAssetCategoryLegalValueById = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//   const assetCategoryLegalValueId = req.params.assetCategoryLegalValueId;
//
//   assetCategoryLegalValueOrchestrator.getAssetCategoryLegalValueById(assetCategoryLegalValueId, ownerPartyId.toString(), headerOptions)
//   .subscribe(assetCategoryLegalValue => {
//     if (assetCategoryLegalValue) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(assetCategoryLegalValue));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCategoryLegalValueId}));
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
// export let addAssetCategoryLegalValue = (req: Request, res: Response) => {
//
//   const assetCategoryLegalValue = req.body;
//   if (!assetCategoryLegalValue) {
//     return res.status(400).send({message: "Asset AssetCategoryLegalValue can not be empty"});
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetCategoryLegalValueOrchestrator.addAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions)
//   .subscribe(assetCategoryLegalValue => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(201);
//     res.send(JSON.stringify(assetCategoryLegalValue));
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
//
// export let updateAssetCategoryLegalValue = (req: Request, res: Response) => {
//
//   const assetCategoryLegalValue = req.body;
//   const assetCategoryLegalValueId = req.params.assetCategoryLegalValueId;
//   if (!assetCategoryLegalValue && !assetCategoryLegalValueId && assetCategoryLegalValue.assetCategoryLegalValueId) {
//     return res.status(400).send({
//       message: "Asset Asset Category Legal Value nor \"assetCategoryLegalValueId\" can not be empty"
//     });
//   }
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   assetCategoryLegalValueOrchestrator.updateAssetCategoryLegalValue(assetCategoryLegalValue, headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCategoryLegalValueId}));
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
// export let deleteAssetCategoryLegalValue = (req: Request, res: Response) => {
//
//   const headerOptions = HeaderBaseOptions.create(req);
//
//   const assetCategoryLegalValueId = req.params.assetCategoryLegalValueId;
//   if (!assetCategoryLegalValueId) {
//     return res.status(400).send({message: "Require \"assetCategoryLegalValueId\"."});
//   }
//
//   const ownerPartyId = headerOptions["Owner-Party-ID"];
//
//   assetCategoryLegalValueOrchestrator.deleteAssetCategoryLegalValue(assetCategoryLegalValueId, ownerPartyId.toString(), headerOptions)
//   .subscribe(affect => {
//     if (affect.affected > 0) {
//       res.setHeader("Content-Type", "application/json");
//       res.status(200);
//       res.send(JSON.stringify(affect));
//     } else {
//       res.setHeader("Content-Type", "application/json");
//       res.status(404);
//       res.send(JSON.stringify({message: "No Data Found For " + assetCategoryLegalValueId}));
//     }
//   }, error => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(500);
//     res.send(JSON.stringify({message: "Error Occurred"}));
//     console.log(error);
//   });
//
// };
