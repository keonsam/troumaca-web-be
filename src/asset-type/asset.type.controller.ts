import {Request, Response} from "express";
import {AssetTypeOrchestrator} from "./asset.type.orchestrator";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";

const assetTypeOrchestrator: AssetTypeOrchestrator = new AssetTypeOrchestrator();

export let findAssetTypes = (req: Request, res: Response) => {
  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;
  assetTypeOrchestrator.findAssetTypes(searchStr, pageSize)
    .subscribe(assetTypes => {
      res.status(200);
      res.send(JSON.stringify(assetTypes));
    }, error => {
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getAssetTypes = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetTypeOrchestrator.getAssetTypes(number, size, field, direction)
    .subscribe(result => {
      res.status(200);
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getAssetTypeById = (req: Request, res: Response) => {
  assetTypeOrchestrator.getAssetTypeById(req.params.assetTypeId)
    .subscribe(assetType => {
      if (assetType) {
        res.status(200);
        res.send(JSON.stringify(assetType));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetTypeId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let saveAssetType = (req: Request, res: Response) => {
  const assetType = req.body.assetType;
  const values = req.body.values;
  if (!assetType) {
    return res.status(400).send({
      message: "Asset Type can not be empty"
    });
  }
  assetTypeOrchestrator.saveAssetType(assetType, values)
    .subscribe(assetType => {
      res.status(201);
      res.send(JSON.stringify(assetType));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updateAssetType = (req: Request, res: Response) => {
  const assetType = req.body.assetType;
  const values = req.body.values;
  if (!assetType) {
    return res.status(400).send({
      message: "Asset Type can not be empty"
    });
  }
  assetTypeOrchestrator.updateAssetType(req.params.assetTypeId, assetType, values)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetTypeId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let deleteAssetType = (req: Request, res: Response) => {

  assetTypeOrchestrator.deleteAssetType(req.params.assetTypeId)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetTypeId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};
