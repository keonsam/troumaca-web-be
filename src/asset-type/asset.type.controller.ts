import {Request, Response} from "express";
import {AssetTypeOrchestrator} from "./asset.type.orchestrator";
import {shapeAssetTypesResponse2} from "./asset.type.response.shaper";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";

let assetTypeOrchestrator:AssetTypeOrchestrator = new AssetTypeOrchestrator();

export let findAssetTypes = (req: Request, res: Response) => {
    let searchStr:string =  req.query.q;
    let pageSize:number = req.query.pageSize;

    assetTypeOrchestrator.findAssetTypes(searchStr, pageSize)
        .map(value => {
            return shapeAssetTypesResponse2(value);
        }).subscribe(assetTypes => {
        let body = JSON.stringify(assetTypes);
        res.send(body);
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};

export let getAssetTypes = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetTypeOrchestrator.getAssetTypes(number, size, field, direction)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let getAssetTypeById = (req: Request, res: Response) => {
  assetTypeOrchestrator.getAssetTypeById(req.params.assetTypeId)
    .subscribe(assetTypes => {
      res.send(JSON.stringify(assetTypes));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let saveAssetType = (req: Request, res: Response) => {
    assetTypeOrchestrator.saveAssetType(req.body)
        .subscribe(assetType => {
            res.send(JSON.stringify(assetType));
        }, error => {
            res.status(400);
            res.send(error);
            console.log(error);
        });
};

export let updateAssetType = (req: Request, res: Response) => {
  assetTypeOrchestrator.updateAssetType(req.params.assetTypeId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let deleteAssetType = (req: Request, res: Response) => {

  assetTypeOrchestrator.deleteAssetType(req.params.assetTypeId)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};
