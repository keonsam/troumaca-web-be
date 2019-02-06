import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetIdentifierTypeOrchestrator} from "./asset.identifier.type.orchestrator";

const assetIdentifierTypeOrchestrator: AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();

export let findAssetIdentifierTypes = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    assetIdentifierTypeOrchestrator.findAssetIdentifierTypes(searchStr, pageSize)
        .subscribe(assetIdentifierTypes => {
            res.status(200);
            res.send(JSON.stringify(assetIdentifierTypes));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetIdentifierTypes = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    assetIdentifierTypeOrchestrator.getAssetIdentifierTypes(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetIdentifierTypeById = (req: Request, res: Response) => {
    assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(req.params.assetIdentifierTypeId)
        .subscribe(assetIdentifierTypes => {
            if (assetIdentifierTypes) {
                const body = JSON.stringify(assetIdentifierTypes);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetIdentifierTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveAssetIdentifierType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetIdentifierType must exist."
        });
    }
    assetIdentifierTypeOrchestrator.saveAssetIdentifierType(req.body)
        .subscribe(assetIdentifierTypes => {
            res.status(201);
            res.send(JSON.stringify(assetIdentifierTypes));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateAssetIdentifierType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetIdentifierType content can not be empty"
        });
    }
    assetIdentifierTypeOrchestrator.updateAssetIdentifierType(req.params.assetIdentifierTypeId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetIdentifierTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteAssetIdentifierType = (req: Request, res: Response) => {
    assetIdentifierTypeOrchestrator.deleteAssetIdentifierType(req.params.assetIdentifierTypeId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetIdentifierTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
