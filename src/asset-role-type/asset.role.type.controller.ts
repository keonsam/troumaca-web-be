import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetRoleTypeOrchestrator} from "./asset.role.type.orchestrator";

const assetRoleTypeOrchestrator: AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

export let findAssetRoleTypes = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    assetRoleTypeOrchestrator.findAssetRoleTypes(searchStr, pageSize)
        .subscribe(assetRoleTypes => {
            res.status(200);
            res.send(JSON.stringify(assetRoleTypes));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetRoleTypes = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    assetRoleTypeOrchestrator.getAssetRoleTypes(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetRoleTypeById = (req: Request, res: Response) => {
    assetRoleTypeOrchestrator.getAssetRoleTypeById(req.params.assetRoleTypeId)
        .subscribe(assetRoleTypes => {
            if (assetRoleTypes) {
                const body = JSON.stringify(assetRoleTypes);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveAssetRoleType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetRoleType must exist."
        });
    }
    assetRoleTypeOrchestrator.saveAssetRoleType(req.body)
        .subscribe(assetRoleTypes => {
            res.status(201);
            res.send(JSON.stringify(assetRoleTypes));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateAssetRoleType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetRoleType content can not be empty"
        });
    }
    assetRoleTypeOrchestrator.updateAssetRoleType(req.params.assetRoleTypeId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteAssetRoleType = (req: Request, res: Response) => {
    assetRoleTypeOrchestrator.deleteAssetRoleType(req.params.assetRoleTypeId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
