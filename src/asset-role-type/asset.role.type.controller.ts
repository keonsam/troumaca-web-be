import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {AssetRoleTypeOrchestrator} from "./asset.role.type.orchestrator";
import { HeaderNormalizer } from "../header.normalizer";
import {Direction} from "../util/direction";
import {Order} from "../util/order";
import {Sort} from "../util/sort";

const assetRoleTypeOrchestrator: AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

export let findAssetRoleTypes = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.get("Owner-Party-Id");
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;
    const pageNumber: number = req.query.pageNumber;

    assetRoleTypeOrchestrator.findAssetRoleTypes(searchStr, pageNumber, pageSize, headerOptions)
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
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

    const asc: string = Direction[Direction.ASC];
    const desc: string = Direction[Direction.DESC];

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

    assetRoleTypeOrchestrator.getAssetRoleTypes(number, size, sort, headerOptions)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssetRoleTypeById = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    assetRoleTypeOrchestrator.getAssetRoleTypeById(req.params.assetRoleTypeId, headerOptions)
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
            message: "AssetRoleType must exist."
        });
    }
    assetRoleTypeOrchestrator.saveAssetRoleType(req.body, headerOptions)
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
            message: "AssetRoleType content can not be empty"
        });
    }
    assetRoleTypeOrchestrator.updateAssetRoleType(req.params.assetRoleTypeId, req.body, headerOptions)
        .subscribe(affect => {
            if (affect > 0) {
                res.status(200);
                res.send(JSON.stringify(affect));
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
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    assetRoleTypeOrchestrator.deleteAssetRoleType(req.params.assetRoleTypeId, headerOptions)
        .subscribe(affect => {
            if (affect > 0) {
                res.status(200);
                res.send(JSON.stringify(affect));
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
