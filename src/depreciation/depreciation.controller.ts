import { Request, Response } from "express";
import { getNumericValueOrDefault } from "../number.util";
import { getStringValueOrDefault } from "../string.util";
import { DepreciationOrchestrator } from "./depreciation.orchestrator";

const orchestrator: DepreciationOrchestrator = new DepreciationOrchestrator();

export let getDepreciationArr = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getDepreciationArr(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getDepreciationById = (req: Request, res: Response) => {
  orchestrator.getDepreciationById(req.params.depreciationId)
    .subscribe(depreciation => {
        if (depreciation) {
            res.status(200);
            res.send(JSON.stringify(depreciation));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(error);
        console.log(error);
    });
};

export let saveDepreciation = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Depreciation can not be empty"
        });
    }
    orchestrator.saveDepreciation(req.body)
        .subscribe(depreciation => {
            res.status(201);
            res.send(JSON.stringify(depreciation));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateDepreciation = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Depreciation content can not be empty"
        });
    }
    orchestrator.updateDepreciation(req.params.depreciationId, req.body)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteDepreciation = (req: Request, res: Response) => {
  orchestrator.deleteDepreciation(req.params.depreciationId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.depreciationId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};
