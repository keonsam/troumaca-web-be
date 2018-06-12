import {Request, Response} from "express";
import {AssetTypeOrchestrator} from "./asset.type.orchestrator";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";

let assetTypeOrchestrator:AssetTypeOrchestrator = new AssetTypeOrchestrator();

export let findAssetTypes = (req: Request, res: Response) => {
    let searchStr:string =  req.query.q;
    let pageSize:number = req.query.pageSize;
    assetTypeOrchestrator.findAssetTypes(searchStr, pageSize)
        .subscribe(assetTypes => {
            if (assetTypes.length > 0) {
                res.status(200);
                res.send(JSON.stringify(assetTypes));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found'}));
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
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
        if(result.data.assetTypes.length > 0) {
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

export let getAssetTypeById = (req: Request, res: Response) => {
  assetTypeOrchestrator.getAssetTypeById(req.params.assetTypeId)
    .subscribe(assetTypeResponse => {
        if(assetTypeResponse) {
            res.status(200);
            res.send(JSON.stringify(assetTypeResponse.toJson()));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let saveAssetType = (req: Request, res: Response) => {
    assetTypeOrchestrator.saveAssetType(req.body.assetType, req.body.values)
        .subscribe(assetType => {
            if(assetType) {
                res.status(201);
                res.send(JSON.stringify(assetType));
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

export let updateAssetType = (req: Request, res: Response) => {
  assetTypeOrchestrator.updateAssetType(req.params.assetTypeId, req.body.assetType, req.body.values)
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

export let deleteAssetType = (req: Request, res: Response) => {

  assetTypeOrchestrator.deleteAssetType(req.params.assetTypeId)
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
