import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetNameTypeOrchestrator} from "./asset.name.type.orchestrator";

const assetNameTypeOrchestrator: AssetNameTypeOrchestrator = new AssetNameTypeOrchestrator();

export let findAssetNameTypes = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    assetNameTypeOrchestrator.findAssetNameTypes(searchStr, pageSize)
        .subscribe(assetNameTypes => {
            res.status(200);
            res.send(JSON.stringify(assetNameTypes));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetNameTypes = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    assetNameTypeOrchestrator.getAssetNameTypes(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetNameTypeById = (req: Request, res: Response) => {
    assetNameTypeOrchestrator.getAssetNameTypeById(req.params.assetNameTypeId)
        .subscribe(assetNameTypes => {
            if (assetNameTypes) {
                const body = JSON.stringify(assetNameTypes);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetNameTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveAssetNameType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetNameType must exist."
        });
    }
    assetNameTypeOrchestrator.saveAssetNameType(req.body)
        .subscribe(assetNameTypes => {
            res.status(201);
            res.send(JSON.stringify(assetNameTypes));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateAssetNameType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetNameType content can not be empty"
        });
    }
    assetNameTypeOrchestrator.updateAssetNameType(req.params.assetNameTypeId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetNameTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteAssetNameType = (req: Request, res: Response) => {
    assetNameTypeOrchestrator.deleteAssetNameType(req.params.assetNameTypeId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetNameTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
