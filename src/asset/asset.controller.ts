import {Request, Response} from "express";
import {AssetOrchestrator} from "./asset.orchestrator";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {HeaderBaseOptions} from "../header.base.options";
import {Sort} from "../util/sort";
import {getDirectionValueOrDefault} from "../direction.util";
import {Order} from "../util/order";

const assetOrchestrator:AssetOrchestrator = new AssetOrchestrator();

export let findAssets = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetOrchestrator.findAssets(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
    .subscribe(assets => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assets));
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let getAssets = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetOrchestrator.getAssets(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetId = req.params.assetId;

  assetOrchestrator.getAssetById(assetId, ownerPartyId.toString(), headerOptions)
    .subscribe(asset => {
      if (asset) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(asset));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + assetId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let addAssets = (req: Request, res: Response) => {

  const asset = req.body;
  if (!asset) {
    return res.status(400).send({message: "Asset   can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetOrchestrator.addAsset(asset, headerOptions)
    .subscribe(asset => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201);
      res.send(JSON.stringify(asset));
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let updateAsset = (req: Request, res: Response) => {

  const asset = req.body;
  let assetId = req.params.assetId;
  if (!asset && !assetId && asset.assetId) {
    return res.status(400).send({message: "Asset   nor \"assetId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetOrchestrator.updateAsset(asset, headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + assetId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};


export let deleteAsset = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetId = req.params.assetId;
  if (!assetId) {
    return res.status(400).send({message: "Require \"assetId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetOrchestrator.deleteAsset(assetId, ownerPartyId.toString(), headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + assetId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};