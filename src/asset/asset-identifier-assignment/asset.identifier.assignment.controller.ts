import {Request, Response} from "express";
import {AssetIdentifierAssignmentOrchestrator} from "./asset.identifier.assignment.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {Sort} from "../../util/sort";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Order} from "../../util/order";

const assetIdentifierAssignmentOrchestrator:AssetIdentifierAssignmentOrchestrator = new AssetIdentifierAssignmentOrchestrator();

export let findAssetIdentifierAssignments = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetIdentifierAssignmentOrchestrator.findAssetIdentifierAssignments(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetIdentifierAssignments => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetIdentifierAssignments));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetIdentifierAssignments = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetIdentifierAssignmentOrchestrator.getAssetIdentifierAssignments(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetIdentifierAssignmentById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetIdentifierAssignmentId = req.params.assetIdentifierAssignmentId;

  assetIdentifierAssignmentOrchestrator.getAssetIdentifierAssignmentById(assetIdentifierAssignmentId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetIdentifierAssignment => {
    if (assetIdentifierAssignment) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetIdentifierAssignment));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetIdentifierAssignment = (req: Request, res: Response) => {

  const assetIdentifierAssignment = req.body;
  if (!assetIdentifierAssignment) {
    return res.status(400).send({message: "Asset IdentifierAssignment  can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierAssignmentOrchestrator.addAssetIdentifierAssignment(assetIdentifierAssignment, headerOptions)
  .subscribe(assetIdentifierAssignment => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetIdentifierAssignment));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetIdentifierAssignment = (req: Request, res: Response) => {

  const assetIdentifierAssignment = req.body;
  let assetIdentifierAssignmentId = req.params.assetIdentifierAssignmentId;
  if (!assetIdentifierAssignment && !assetIdentifierAssignmentId && assetIdentifierAssignment.assetIdentifierAssignmentId) {
    return res.status(400).send({message: "Asset IdentifierAssignment  nor \"assetIdentifierAssignmentId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetIdentifierAssignmentOrchestrator.updateAssetIdentifierAssignment(assetIdentifierAssignment, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetIdentifierAssignment = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetIdentifierAssignmentId = req.params.assetIdentifierAssignmentId;
  if (!assetIdentifierAssignmentId) {
    return res.status(400).send({message: "Require \"assetIdentifierAssignmentId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetIdentifierAssignmentOrchestrator.deleteAssetIdentifierAssignment(assetIdentifierAssignmentId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetIdentifierAssignmentId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
