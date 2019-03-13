import {Request, Response} from "express";
import {AssetRoleOrchestrator} from "./asset.role.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {Sort} from "../../util/sort";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Order} from "../../util/order";

const assetRoleOrchestrator:AssetRoleOrchestrator = new AssetRoleOrchestrator();

export let findAssetRoles = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetRoleOrchestrator.findAssetRoles(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetRoles => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetRoles));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetRoles = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetRoleOrchestrator.getAssetRoles(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetRoleById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetRoleId = req.params.assetRoleId;

  assetRoleOrchestrator.getAssetRoleById(assetRoleId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetRole => {
    if (assetRole) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetRole));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetRoleId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetRole = (req: Request, res: Response) => {

  const assetRole = req.body;
  if (!assetRole) {
    return res.status(400).send({message: "Asset Role  can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleOrchestrator.addAssetRole(assetRole, headerOptions)
  .subscribe(assetRole => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetRole));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetRole = (req: Request, res: Response) => {

  const assetRole = req.body;
  let assetRoleId = req.params.assetRoleId;
  if (!assetRole && !assetRoleId && assetRole.assetRoleId) {
    return res.status(400).send({message: "Asset Role  nor \"assetRoleId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleOrchestrator.updateAssetRole(assetRole, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetRoleId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetRole = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetRoleId = req.params.assetRoleId;
  if (!assetRoleId) {
    return res.status(400).send({message: "Require \"assetRoleId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetRoleOrchestrator.deleteAssetRole(assetRoleId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetRoleId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
