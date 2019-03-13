import {Request, Response} from "express";
import {AssetCharacteristicAssignmentOrchestrator} from "./asset.characteristic.assignment.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {Sort} from "../../util/sort";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Order} from "../../util/order";

const assetCharacteristicAssignmentOrchestrator:AssetCharacteristicAssignmentOrchestrator = new AssetCharacteristicAssignmentOrchestrator();

export let findAssetCharacteristicAssignments = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetCharacteristicAssignmentOrchestrator.findAssetCharacteristicAssignments(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetCharacteristicAssignments => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetCharacteristicAssignments));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetCharacteristicAssignments = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetCharacteristicAssignmentOrchestrator.getAssetCharacteristicAssignments(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetCharacteristicAssignmentById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetCharacteristicAssignmentId = req.params.assetCharacteristicAssignmentId;

  assetCharacteristicAssignmentOrchestrator.getAssetCharacteristicAssignmentById(assetCharacteristicAssignmentId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetCharacteristicAssignment => {
    if (assetCharacteristicAssignment) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetCharacteristicAssignment));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetCharacteristicAssignment = (req: Request, res: Response) => {

  const assetCharacteristicAssignment = req.body;
  if (!assetCharacteristicAssignment) {
    return res.status(400).send({message: "Asset CharacteristicAssignment  can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetCharacteristicAssignmentOrchestrator.addAssetCharacteristicAssignment(assetCharacteristicAssignment, headerOptions)
  .subscribe(assetCharacteristicAssignment => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetCharacteristicAssignment));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetCharacteristicAssignment = (req: Request, res: Response) => {

  const assetCharacteristicAssignment = req.body;
  let assetCharacteristicAssignmentId = req.params.assetCharacteristicAssignmentId;
  if (!assetCharacteristicAssignment && !assetCharacteristicAssignmentId && assetCharacteristicAssignment.assetCharacteristicAssignmentId) {
    return res.status(400).send({message: "Asset CharacteristicAssignment  nor \"assetCharacteristicAssignmentId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetCharacteristicAssignmentOrchestrator.updateAssetCharacteristicAssignment(assetCharacteristicAssignment, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetCharacteristicAssignment = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetCharacteristicAssignmentId = req.params.assetCharacteristicAssignmentId;
  if (!assetCharacteristicAssignmentId) {
    return res.status(400).send({message: "Require \"assetCharacteristicAssignmentId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetCharacteristicAssignmentOrchestrator.deleteAssetCharacteristicAssignment(assetCharacteristicAssignmentId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
