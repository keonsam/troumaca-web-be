import {Request, Response} from "express";
import {AssetIdentifierTypeOrchestrator} from "./asset.identifier.type.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const assetIdentifierTypeOrchestrator:AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();

export let findAssetIdentifierTypes = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetIdentifierTypeOrchestrator.findAssetIdentifierTypes(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetIdentifierTypes => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetIdentifierTypes));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetIdentifierTypes = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));

  assetIdentifierTypeOrchestrator.getAssetIdentifierTypes(ownerPartyId.toString(), number, size, sort, headerOptions)
  .subscribe(page => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(page));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetIdentifierTypeById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetIdentifierTypeId = req.params.assetIdentifierTypeId;

  assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(assetIdentifierTypeId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetIdentifierType => {
    if (assetIdentifierType) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetIdentifierType));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierTypeId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetIdentifierType = (req: Request, res: Response) => {

  const assetIdentifierType = req.body;
  if (!assetIdentifierType) {
    return res.status(400).send({message: "Asset Identifier Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierTypeOrchestrator.addAssetIdentifierType(assetIdentifierType, headerOptions)
  .subscribe(assetIdentifierType => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetIdentifierType));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetIdentifierType = (req: Request, res: Response) => {

  const assetIdentifierType = req.body;
  let assetIdentifierTypeId = req.params.assetIdentifierTypeId;
  if (!assetIdentifierType && !assetIdentifierTypeId && assetIdentifierType.assetIdentifierTypeId) {
    return res.status(400).send({
      message: "Asset Identifier Type nor \"assetIdentifierTypeId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierTypeOrchestrator.updateAssetIdentifierType(assetIdentifierType, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierTypeId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetIdentifierType = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetIdentifierTypeId = req.params.assetIdentifierTypeId;
  if (!assetIdentifierTypeId) {
    return res.status(400).send({message: "Require \"assetIdentifierTypeId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetIdentifierTypeOrchestrator.deleteAssetIdentifierType(assetIdentifierTypeId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierTypeId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
