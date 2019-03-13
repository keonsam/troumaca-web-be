import {Request, Response} from "express";
import {AssetNameTypeOrchestrator} from "./asset.name.type.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const assetNameTypeOrchestrator:AssetNameTypeOrchestrator = new AssetNameTypeOrchestrator();

export let findAssetNameTypes = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetNameTypeOrchestrator.findAssetNameTypes(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetNameTypes => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetNameTypes));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetNameTypes = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  assetNameTypeOrchestrator.getAssetNameTypes(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetNameTypeById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetNameTypeId = req.params.assetNameTypeId;

  assetNameTypeOrchestrator.getAssetNameTypeById(assetNameTypeId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetNameType => {
    if (assetNameType) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetNameType));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetNameTypeId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetNameType = (req: Request, res: Response) => {

  const assetNameType = req.body;
  if (!assetNameType) {
    return res.status(400).send({message: "Asset Name Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetNameTypeOrchestrator.addAssetNameType(assetNameType, headerOptions)
  .subscribe(assetNameType => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetNameType));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetNameType = (req: Request, res: Response) => {

  const assetNameType = req.body;
  let assetNameTypeId = req.params.assetNameTypeId;
  if (!assetNameType && !assetNameTypeId && assetNameType.assetNameTypeId) {
    return res.status(400).send({
      message: "Asset Name Type nor \"assetNameTypeId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetNameTypeOrchestrator.updateAssetNameType(assetNameType, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetNameTypeId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetNameType = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions['Owner-Party-ID'];

  let assetNameTypeId = req.params.assetNameTypeId;
  if (!assetNameTypeId) {
    return res.status(400).send({message: "Require \"assetNameTypeId\"."});
  }

  assetNameTypeOrchestrator.deleteAssetNameType(assetNameTypeId, ownerPartyId.toString(), headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + assetNameTypeId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};
