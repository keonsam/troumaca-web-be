import {Request, Response} from "express";
import {ResourceOrchestrator} from "./resource.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:ResourceOrchestrator = new ResourceOrchestrator();

export let getResourcesByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        if(result.data.resources.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));

    });

};

export let getAssignedResourcesByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getAssignedResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        if(result.data.resources.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));

    });
};

export let getResources = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getResources(number, size, field, direction)
    .subscribe(result => {
        if(result.data.resources.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));

    });
};

export let getResourceById = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  orchestrator
    .getResourceById(resourceId)
    .subscribe(resource => {
        if(resource) {
            res.status(200);
            res.send(JSON.stringify(resource));
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

export let saveResource = (req: Request, res: Response) => {
  let resource = req.body.resource;
  let resourcePermissions = req.body.resourcePermission;
  orchestrator.addResource(resource, resourcePermissions)
    .subscribe(resource => {
        if(resource) {
            res.status(201);
            res.send(JSON.stringify(resource));
        }else {
            res.status(204);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
}

export let updateResource = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  let resource = req.body.resource;
  let resourcePermissions = req.body.resourcePermission;
  orchestrator
    .updateResource(resourceId, resource, resourcePermissions)
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

export let deleteResource = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  orchestrator
    .deleteResource(resourceId)
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
