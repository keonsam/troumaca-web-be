import { Request, Response } from "express";
import { getNumericValueOrDefault } from "../../../number.util";
import { getStringValueOrDefault} from "../../../string.util";
import { AssignedAttributeOrchestrator } from "./assigned.attribute.orchestrator";

const orchestrator: AssignedAttributeOrchestrator = new AssignedAttributeOrchestrator();

export let getAssignableAttributes = (req: Request, res: Response) => {

    const type = req.params.type;
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");
    const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

    orchestrator.getAssignableAttributes(number, size, field, direction, assignedArray, type)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssignedAttributesByClassId = (req: Request, res: Response) => {
    const assetTypeClassId = req.params.assetTypeClassId;

    orchestrator.getAssignedAttributesByClassId(assetTypeClassId)
        .subscribe(assignedAttributes => {
            res.status(200);
            res.send(JSON.stringify(assignedAttributes));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};
