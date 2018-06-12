import {Request, Response} from "express";
import {PermissionOrchestrator} from "./permission.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PermissionOrchestrator = new PermissionOrchestrator();


export let getPermissions = (req: Request, res: Response) => {
    console.log(req.query);
    let number = getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = getNumericValueOrDefault(req.query.pageSize, 10);
    let field = getStringValueOrDefault(req.query.sortField, "");
    let direction = getStringValueOrDefault(req.query.sortOrder, "");

    orchestrator
        .getPermissions(number, size, field, direction)
        .subscribe(result => {
            if(result.data.permissions.length > 0) {
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

export let getPermissionsByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getPermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        if(result.data.permissions.length > 0) {
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

export let getResourcePermissionsByArray = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getResourcePermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        if(result.data.permissions.length > 0) {
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

export let getPermissionById = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  orchestrator
    .getPermissionById(permissionId)
    .subscribe(permission => {
        if(permission) {
            res.status(200);
            res.send(JSON.stringify(permission));
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

export let savePermission = (req: Request, res: Response) => {
  orchestrator.addPermission(req.body)
    .subscribe(permission => {
        if(permission) {
            res.status(201);
            res.send(JSON.stringify(permission));
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

export let updatePermission = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  let permission = req.body;
  orchestrator
    .updatePermission(permissionId, permission)
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

export let deletePermission = (req: Request, res: Response) => {
  let permissionId = req.params.permissionId;
  orchestrator
    .deletePermission(permissionId)
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

