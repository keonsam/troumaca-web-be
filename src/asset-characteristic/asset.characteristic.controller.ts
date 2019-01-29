import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetCharacteristicOrchestrator} from "./asset.characteristic.orchestrator";

const assetCharacteristicOrchestrator: AssetCharacteristicOrchestrator = new AssetCharacteristicOrchestrator();

export let findAssetCharacteristics = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    assetCharacteristicOrchestrator.findAssetCharacteristics(searchStr, pageSize)
        .subscribe(assetCharacteristics => {
            res.status(200);
            res.send(JSON.stringify(assetCharacteristics));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetCharacteristics = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    assetCharacteristicOrchestrator.getAssetCharacteristics(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getTypes = (req: Request, res: Response) => {
    assetCharacteristicOrchestrator.getTypes()
        .subscribe(assetCharacteristics => {
            if (assetCharacteristics) {
                const body = JSON.stringify(assetCharacteristics);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetCharacteristicId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let getAssetCharacteristicById = (req: Request, res: Response) => {
    assetCharacteristicOrchestrator.getAssetCharacteristicById(req.params.assetCharacteristicId)
        .subscribe(assetCharacteristics => {
            if (assetCharacteristics) {
                const body = JSON.stringify(assetCharacteristics);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetCharacteristicId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveAssetCharacteristic = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetCharacteristic must exist."
        });
    }
    assetCharacteristicOrchestrator.saveAssetCharacteristic(req.body)
        .subscribe(assetCharacteristics => {
            res.status(201);
            res.send(JSON.stringify(assetCharacteristics));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateAssetCharacteristic = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "AssetCharacteristic content can not be empty"
        });
    }
    assetCharacteristicOrchestrator.updateAssetCharacteristic(req.params.assetCharacteristicId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetCharacteristicId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteAssetCharacteristic = (req: Request, res: Response) => {
    assetCharacteristicOrchestrator.deleteAssetCharacteristic(req.params.assetCharacteristicId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.assetCharacteristicId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
