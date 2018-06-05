import {Request, Response} from "express";
import {PermissionOrchestrator} from "./permission.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PermissionOrchestrator = new PermissionOrchestrator();


export let getPermissionsByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getPermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getResourcePermissionsByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getResourcePermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getPermissions = (req: Request, res: Response) => {
  console.log(req.query);
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

    orchestrator
    .getPermissions(number, size, field, direction)
    .subscribe(permissions => {
      res.send(JSON.stringify(permissions.data));
    });
};

export let getPermissionById = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  orchestrator
    .getPermissionById(permissionId)
    .subscribe(permission => {
      let body = JSON.stringify(permission);
      res.send(body);
    });
};

export let savePermission = (req: Request, res: Response) => {
  orchestrator.addPermission(req.body)
    .subscribe(permission => {
      res.send(JSON.stringify(permission));
    }, error => {
      res.send(error);
      console.log(error);
    });
};

export let updatePermission = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  let permission = req.body;
  orchestrator
    .updatePermission(permissionId, permission)
    .subscribe(permission => {
      res.send(JSON.stringify(permission));
    });

};

export let deletePermission = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  orchestrator
    .deletePermission(permissionId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

