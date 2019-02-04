import {Request, Response} from "express";
import {AssetCharacteristicOrchestrator} from "./asset.characteristic.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const assetCharacteristicOrchestrator:AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();

export let findAssetCharacteristics = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetCharacteristicOrchestrator.findAssetCharacteristics(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetCharacteristics => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetCharacteristics));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetCharacteristics = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));

  assetCharacteristicOrchestrator.getAssetCharacteristics(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetCharacteristicById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetCharacteristicId = req.params.assetCharacteristicId;

  assetCharacteristicOrchestrator.getAssetCharacteristicById(assetCharacteristicId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetCharacteristic => {
    if (assetCharacteristic) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetCharacteristic));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetCharacteristic = (req: Request, res: Response) => {

  const assetCharacteristic = req.body;
  if (!assetCharacteristic) {
    return res.status(400).send({message: "Asset Characteristic Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetCharacteristicOrchestrator.addAssetCharacteristic(assetCharacteristic, headerOptions)
  .subscribe(assetCharacteristic => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetCharacteristic));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetCharacteristic = (req: Request, res: Response) => {

  const assetCharacteristic = req.body;
  let assetCharacteristicId = req.params.assetCharacteristicId;
  if (!assetCharacteristic && !assetCharacteristicId && assetCharacteristic.assetCharacteristicId) {
    return res.status(400).send({
      message: "Asset Characteristic Type nor \"assetCharacteristicId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetCharacteristicOrchestrator.updateAssetCharacteristic(assetCharacteristic, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetCharacteristic = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetCharacteristicId = req.params.assetCharacteristicId;
  if (!assetCharacteristicId) {
    return res.status(400).send({message: "Require \"assetCharacteristicId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetCharacteristicOrchestrator.deleteAssetCharacteristic(assetCharacteristicId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetCharacteristicId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
