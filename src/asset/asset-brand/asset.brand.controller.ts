import {Request, Response} from "express";
import {AssetBrandOrchestrator} from "./asset.brand.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const assetBrandOrchestrator:AssetBrandOrchestrator = new AssetBrandOrchestrator();

export let findAssetBrands = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  if (!searchText) {
    return res.status(400).send({message: "Require search query."});
  }

  assetBrandOrchestrator.findAssetBrands(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetBrands => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetBrands));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetBrands = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));

  assetBrandOrchestrator.getAssetBrands(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getAssetBrandById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let assetBrandId = req.params.assetBrandId;

  assetBrandOrchestrator.getAssetBrandById(assetBrandId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetBrand => {
    if (assetBrand) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetBrand));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetBrandId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetBrand = (req: Request, res: Response) => {

  const assetBrand = req.body;
  if (!assetBrand) {
    return res.status(400).send({message: "Asset Brand can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetBrandOrchestrator.addAssetBrand(assetBrand, headerOptions)
  .subscribe(assetBrand => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetBrand));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetBrand = (req: Request, res: Response) => {

  const assetBrand = req.body;
  let assetBrandId = req.params.assetBrandId;
  if (!assetBrand && !assetBrandId && assetBrand.assetBrandId) {
    return res.status(400).send({
      message: "Asset Brand nor \"assetBrandId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetBrandOrchestrator.updateAssetBrand(assetBrand, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetBrandId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetBrand = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  let assetBrandId = req.params.assetBrandId;
  if (!assetBrandId) {
    return res.status(400).send({message: "Require \"assetBrandId\"."});
  }

  let ownerPartyId = headerOptions["Owner-Party-ID"];

  assetBrandOrchestrator.deleteAssetBrand(assetBrandId, ownerPartyId.toString(), headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + assetBrandId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
