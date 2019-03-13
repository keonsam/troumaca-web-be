import {Request, Response} from "express";
import {AssetStructureOrchestrator} from "./asset.structure.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const assetStructureOrchestrator:AssetStructureOrchestrator = new AssetStructureOrchestrator();

export let findAssetStructures = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetStructureOrchestrator.findAssetStructures(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetStructures => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetStructures));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetStructures = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));

  assetStructureOrchestrator.getAssetStructures(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetStructureById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetStructureId = req.params.assetStructureId;

  assetStructureOrchestrator.getAssetStructureById(assetStructureId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetStructure => {
    if (assetStructure) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetStructure));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetStructureId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetStructure = (req: Request, res: Response) => {

  const assetStructure = req.body;
  if (!assetStructure) {
    return res.status(400).send({message: "Asset Identifier Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetStructureOrchestrator.addAssetStructure(assetStructure, headerOptions)
  .subscribe(assetStructure => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetStructure));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetStructure = (req: Request, res: Response) => {

  const assetStructure = req.body;
  let assetStructureId = req.params.assetStructureId;
  if (!assetStructure && !assetStructureId && assetStructure.assetStructureId) {
    return res.status(400).send({
      message: "Asset Identifier Type nor \"assetStructureId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetStructureOrchestrator.updateAssetStructure(assetStructure, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetStructureId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetStructure = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetStructureId = req.params.assetStructureId;
  if (!assetStructureId) {
    return res.status(400).send({message: "Require \"assetStructureId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetStructureOrchestrator.deleteAssetStructure(assetStructureId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetStructureId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
