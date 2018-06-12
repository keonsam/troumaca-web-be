import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AttributeOrchestrator} from './attribute.orchestrator';

let orchestrator:AttributeOrchestrator = new AttributeOrchestrator();

export let getAttributes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAttributes(number, size, field, direction)
    .subscribe(result => {
        if(result.data.attributes.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let getAttributeById = (req: Request, res: Response) => {
    orchestrator.getAttributeById(req.params.attributeId)
        .subscribe(attribute => {
            if(attribute) {
                res.status(200);
                res.send(JSON.stringify(attribute));
            }else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found'}))
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let saveAttribute = (req: Request, res: Response) => {
  orchestrator.saveAttribute(req.body)
    .subscribe(attribute => {
        if(attribute) {
            res.status(201);
            res.send(JSON.stringify(attribute));
        }else {
            res.status(204);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateAttribute = (req: Request, res: Response) => {
  orchestrator.updateAttribute(req.params.attributeId, req.body)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Updated'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let deleteAttribute = (req: Request, res: Response) => {
  orchestrator.deleteAttribute(req.params.attributeId)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Deleted'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let getAvailableAttributes = (req: Request, res: Response) => {

    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

    orchestrator.getAvailableAttributes(number, size, field, direction, assignedArray)
        .subscribe(result => {
            if(result.data.attributes.length > 0) {
                res.status(200);
                res.send(JSON.stringify(result.data));
            }else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found'}));
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let getAssignedAttributes = (req: Request, res: Response) => {

    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

    orchestrator.getAssignedAttributes(number, size, field, direction, assignedArray)
        .subscribe(result => {
            if(result.data.assetTypeClasses.length > 0) {
                res.status(200);
                res.send(JSON.stringify(result.data));
            }else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found'}));
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let getAssignedAttributesByClassId = (req: Request, res: Response) => {
    let assetTypeClassId = req.params.assetTypeClassId;

    orchestrator.getAssignedAttributesByClassId(assetTypeClassId)
        .subscribe(assignedAttributes => {
            if(assignedAttributes) {
                res.status(200);
                res.send(JSON.stringify(assignedAttributes));
            }else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found'}))
            }
        }, error => {
            res.status(400);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};
