import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetIdentifierTypeOrchestrator} from "./asset.identifier.type.orchestrator";
import { HeaderNormalizer } from "../header.normalizer";
import {Sort} from "../util/sort";
import {Order} from "../util/order";
import {Direction} from "../util/direction";

const assetIdentifierTypeOrchestrator: AssetIdentifierTypeOrchestrator = new AssetIdentifierTypeOrchestrator();

export let findAssetIdentifierTypes = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    //const ownerPartyId = req.headers["Owner-Party-Id"];
    const ownerPartyId = req.get("Owner-Party-Id");
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    const searchStr: string = req.query.q;
    const pageNumber: number = req.query.pageNumber;
    const pageSize: number = req.query.pageSize;

    assetIdentifierTypeOrchestrator.findAssetIdentifierTypes(ownerPartyId, searchStr, pageNumber, pageSize, headerOptions)
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    //const ownerPartyId = req.headers["Owner-Party-Id"];
    const ownerPartyId = req.get("Owner-Party-Id");
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    var asc: string = Direction[Direction.ASC];
    var desc: string = Direction[Direction.DESC];

    const order = new Order();
    if (direction == asc) {
        order.property = field;
        order.direction = Direction.ASC;
    } else if (direction == desc) {
        order.property = field;
        order.direction = Direction.DESC;
    } else {
        order.property = field;
        order.direction = Direction.ASC;
    }

    const sort = new Sort();
    sort.add(order);

    assetIdentifierTypeOrchestrator.getAssetIdentifierTypes(ownerPartyId, number, size, sort, headerOptions)
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    assetIdentifierTypeOrchestrator.getAssetIdentifierTypeById(req.params.assetIdentifierTypeId, headerOptions)
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    if (!req.body) {
        return res.status(400).send({
            message: "AssetIdentifierType must exist."
        });
    }
    assetIdentifierTypeOrchestrator.saveAssetIdentifierType(req.body, headerOptions)
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    if (!req.body) {
        return res.status(400).send({
            message: "AssetIdentifierType content can not be empty"
        });
    }
    assetIdentifierTypeOrchestrator.updateAssetIdentifierType(req.body, headerOptions)
        .subscribe(affect => {
            if (affect.affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affect));
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    assetIdentifierTypeOrchestrator.deleteAssetIdentifierType(req.params.assetIdentifierTypeId, headerOptions)
        .subscribe(affect => {
            if (affect.affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affect));
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
