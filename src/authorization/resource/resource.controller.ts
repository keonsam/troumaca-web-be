import { Request, Response } from "express";
import { ResourceOrchestrator } from "./resource.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: ResourceOrchestrator = new ResourceOrchestrator();

export let getResourcesByArray = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");
  const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

  orchestrator.getResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });

};

export let getAssignedResourcesByArray = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");
  const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

  orchestrator.getAssignedResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getResources = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getResources(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getResourceById = (req: Request, res: Response) => {
  const resourceId = req.params.resourceId;
  orchestrator
    .getResourceById(resourceId)
    .subscribe(resource => {
        if (resource) {
            res.status(200);
            res.send(JSON.stringify(resource));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For" + req.params.resourceId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let saveResource = (req: Request, res: Response) => {
  const resource = req.body.resource;
  const resourcePermissions = req.body.resourcePermission;
    if (!req.body) {
        return res.status(400).send({
            message: "Resource can not be empty"
        });
    }
  orchestrator.addResource(resource, resourcePermissions)
    .subscribe(resource => {
        res.status(201);
        res.send(JSON.stringify(resource));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateResource = (req: Request, res: Response) => {
  const resourceId = req.params.resourceId;
  const resource = req.body.resource;
  const resourcePermissions = req.body.resourcePermission;
    if (!req.body) {
        return res.status(400).send({
            message: "Resource can not be empty"
        });
    }
  orchestrator
    .updateResource(resourceId, resource, resourcePermissions)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For" + req.params.resourceId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });

};

export let deleteResource = (req: Request, res: Response) => {
  const resourceId = req.params.resourceId;
  orchestrator
    .deleteResource(resourceId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For" + req.params.resourceId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};
