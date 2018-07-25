import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetOrchestrator} from "./asset.orchestrator";

let assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();

export let getAssets = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  assetOrchestrator.getAssets(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
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
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.assetId}));
        }
    }, error => {
        res.status(500);
        res.send(error);
        console.log(error);
    });
};

export let saveAsset = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Asset can not be empty"
        });
    }
    assetOrchestrator.saveAsset(req.body)
        .subscribe(assets => {
            res.status(201);
            res.send(JSON.stringify(assets));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let updateAsset = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Asset content can not be empty"
        });
    }
    assetOrchestrator.updateAsset(req.params.assetId, req.body)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.assetId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let deleteAsset = (req: Request, res: Response) => {
  assetOrchestrator.deleteAsset(req.params.assetId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.assetId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};
