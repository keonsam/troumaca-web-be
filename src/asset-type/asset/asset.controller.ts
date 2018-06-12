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
        if(result.data.assets.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let getAssetById = (req: Request, res: Response) => {
  assetOrchestrator.getAssetById(req.params.assetId)
    .subscribe(assets => {
        if(assets) {
            res.status(200);
            res.send(JSON.stringify(assets));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}))
        }
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};

export let saveAsset = (req: Request, res: Response) => {
    assetOrchestrator.saveAsset(req.body)
        .subscribe(assets => {
            if(assets) {
                res.status(201);
                res.send(JSON.stringify(assets));
            }else {
                res.status(204);
                res.send(JSON.stringify({message: 'Not Saved'}))
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let updateAsset = (req: Request, res: Response) => {
  assetOrchestrator.updateAsset(req.params.assetId, req.body)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Updated'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let deleteAsset = (req: Request, res: Response) => {
  assetOrchestrator.deleteAsset(req.params.assetId)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Deleted'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};
