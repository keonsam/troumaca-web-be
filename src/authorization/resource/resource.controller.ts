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
  let assignedArray = req.body.assignedArray;

  orchestrator.getResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getAssignedResourcesByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.body.assignedArray;

  orchestrator.getAssignedResourcesByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let getResources = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getResources(number, size, field, direction)
    .subscribe(resources => {
      res.send(JSON.stringify(resources.data));
    });
};

export let getResourceById = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  orchestrator
    .getResourceById(resourceId)
    .subscribe(resource => {
      let body = JSON.stringify(resource);
      res.send(body);
    });
};

export let saveResource = (req: Request, res: Response) => {
  let resource = req.body.resource;
  let resourcePermissions = req.body.resourcePermission;
  orchestrator.addResource(resource, resourcePermissions)
    .subscribe(resource => {
      res.send(JSON.stringify(resource));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateResource = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  let resource = req.body.resource;
  let resourcePermissions = req.body.resourcePermission;
  orchestrator
    .updateResource(resourceId, resource, resourcePermissions)
    .subscribe(resource => {
      res.send(JSON.stringify(resource));
    });

};

export let deleteResource = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  orchestrator
    .deleteResource(resourceId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};
