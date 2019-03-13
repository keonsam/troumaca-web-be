import {Request, Response} from "express";
import {AssetIdentifierOrchestrator} from "./asset.identifier.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {Sort} from "../../util/sort";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Order} from "../../util/order";

const assetIdentifierOrchestrator:AssetIdentifierOrchestrator = new AssetIdentifierOrchestrator();

export let findAssetIdentifiers = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetIdentifierOrchestrator.findAssetIdentifiers(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetIdentifiers => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetIdentifiers));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetIdentifiers = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetIdentifierOrchestrator.getAssetIdentifiers(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetIdentifierById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetIdentifierId = req.params.assetIdentifierId;

  assetIdentifierOrchestrator.getAssetIdentifierById(assetIdentifierId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetIdentifier => {
    if (assetIdentifier) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetIdentifier));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetIdentifier = (req: Request, res: Response) => {

  const assetIdentifier = req.body;
  if (!assetIdentifier) {
    return res.status(400).send({message: "Asset Identifier  can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierOrchestrator.addAssetIdentifier(assetIdentifier, headerOptions)
  .subscribe(assetIdentifier => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetIdentifier));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetIdentifier = (req: Request, res: Response) => {

  const assetIdentifier = req.body;
  let assetIdentifierId = req.params.assetIdentifierId;
  if (!assetIdentifier && !assetIdentifierId && assetIdentifier.assetIdentifierId) {
    return res.status(400).send({message: "Asset Identifier  nor \"assetIdentifierId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierOrchestrator.updateAssetIdentifier(assetIdentifier, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetIdentifier = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetIdentifierId = req.params.assetIdentifierId;
  if (!assetIdentifierId) {
    return res.status(400).send({message: "Require \"assetIdentifierId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetIdentifierOrchestrator.deleteAssetIdentifier(assetIdentifierId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
