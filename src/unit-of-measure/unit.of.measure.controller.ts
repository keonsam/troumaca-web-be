import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {UnitOfMeasureOrchestrator} from "./unit.of.measure.orchestrator";

const unitOfMeasureOrchestrator: UnitOfMeasureOrchestrator = new UnitOfMeasureOrchestrator();

export let findUnitOfMeasures = (req: Request, res: Response) => {
    const searchStr: string = req.query.q;
    const pageSize: number = req.query.pageSize;

    unitOfMeasureOrchestrator.findUnitOfMeasures(searchStr, pageSize)
        .subscribe(unitOfMeasures => {
            res.status(200);
            res.send(JSON.stringify(unitOfMeasures));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getUnitOfMeasures = (req: Request, res: Response) => {
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    unitOfMeasureOrchestrator.getUnitOfMeasures(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getUnitOfMeasureById = (req: Request, res: Response) => {
    unitOfMeasureOrchestrator.getUnitOfMeasureById(req.params.unitOfMeasureId)
        .subscribe(unitOfMeasures => {
            if (unitOfMeasures) {
                const body = JSON.stringify(unitOfMeasures);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.unitOfMeasureId}));
            }
        }, error => {
            res.status(500);
            res.send(error);
            console.log(error);
        });
};

export let saveUnitOfMeasure = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "UnitOfMeasure must exist."
        });
    }
    unitOfMeasureOrchestrator.saveUnitOfMeasure(req.body)
        .subscribe(unitOfMeasures => {
            res.status(201);
            res.send(JSON.stringify(unitOfMeasures));
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let updateUnitOfMeasure = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "UnitOfMeasure content can not be empty"
        });
    }
    unitOfMeasureOrchestrator.updateUnitOfMeasure(req.params.unitOfMeasureId, req.body)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.unitOfMeasureId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let deleteUnitOfMeasure = (req: Request, res: Response) => {
    unitOfMeasureOrchestrator.deleteUnitOfMeasure(req.params.unitOfMeasureId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.unitOfMeasureId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
