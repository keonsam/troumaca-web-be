import { Request, Response } from "express";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";
import { AttributeOrchestrator } from "./attribute.orchestrator";

const orchestrator: AttributeOrchestrator = new AttributeOrchestrator();

export let getAttributes = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAttributes(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getAttributeById = (req: Request, res: Response) => {
    orchestrator.getAttributeById(req.params.attributeId)
        .subscribe(attribute => {
            if (attribute) {
                res.status(200);
                res.send(JSON.stringify(attribute));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For" + req.params.attributeId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let saveAttribute = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Attribute can not be empty"
        });
    }
  orchestrator.saveAttribute(req.body)
    .subscribe(attribute => {
        res.status(201);
        res.send(JSON.stringify(attribute));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateAttribute = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Attribute can not be empty"
        });
    }
  orchestrator.updateAttribute(req.params.attributeId, req.body)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For" + req.params.attributeId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteAttribute = (req: Request, res: Response) => {
  orchestrator.deleteAttribute(req.params.attributeId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For" + req.params.attributeId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getAvailableAttributes = (req: Request, res: Response) => {

    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");
    const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

    orchestrator.getAvailableAttributes(number, size, field, direction, assignedArray)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getAssignedAttributes = (req: Request, res: Response) => {

    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");
    const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

    orchestrator.getAssignedAttributes(number, size, field, direction, assignedArray)
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
