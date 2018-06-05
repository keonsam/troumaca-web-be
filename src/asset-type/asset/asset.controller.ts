import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetOrchestrator} from "./asset.orchestrator";

let assetOrchestrator:AssetOrchestrator = new AssetOrchestrator();

export let getAssets = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrchestrator.getAssets(number, size, field, direction)
    .subscribe(result => {
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};

export let getAssetById = (req: Request, res: Response) => {
  assetOrchestrator.getAssetById(req.params.assetId)
    .subscribe(assets => {
        res.send(JSON.stringify(assets));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};

export let saveAsset = (req: Request, res: Response) => {
    assetOrchestrator.saveAsset(req.body)
        .subscribe(assets => {
            res.send(JSON.stringify(assets));
        }, error => {
            res.status(400);
            res.send(error);
            console.log(error);
        });
};

export let updateAsset = (req: Request, res: Response) => {
  assetOrchestrator.updateAsset(req.params.assetId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};

export let deleteAsset = (req: Request, res: Response) => {
  assetOrchestrator.deleteAsset(req.params.assetId)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
