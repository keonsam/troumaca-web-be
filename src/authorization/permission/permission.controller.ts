import { Request, Response } from "express";
import { PermissionOrchestrator } from "./permission.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: PermissionOrchestrator = new PermissionOrchestrator();


export let getPermissions = (req: Request, res: Response) => {
    console.log(req.query);
    const number = getNumericValueOrDefault(req.query.pageNumber, 1);
    const size = getNumericValueOrDefault(req.query.pageSize, 10);
    const field = getStringValueOrDefault(req.query.sortField, "");
    const direction = getStringValueOrDefault(req.query.sortOrder, "");

    orchestrator
        .getPermissions(number, size, field, direction)
        .subscribe(result => {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));

        });
};

export let getPermissionsByArray = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");
  const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

  orchestrator.getPermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));

    });
};

export let getResourcePermissionsByArray = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");
  const assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];

  orchestrator.getResourcePermissionsByArray(number, size, field, direction, assignedArray)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));

    });

};

export let getPermissionById = (req: Request, res: Response) => {
  const permissionId = req.params.permissionId;
  orchestrator
    .getPermissionById(permissionId)
    .subscribe(permission => {
        if (permission) {
            res.status(200);
            res.send(JSON.stringify(permission));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.permissionId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let savePermission = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Permission can not be empty"
        });
    }
  orchestrator.addPermission(req.body)
    .subscribe(permission => {
        res.status(201);
        res.send(JSON.stringify(permission));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updatePermission = (req: Request, res: Response) => {
  const permissionId = req.params.permissionId;
  const permission = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Permission can not be empty"
        });
    }
  orchestrator
    .updatePermission(permissionId, permission)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.permissionId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deletePermission = (req: Request, res: Response) => {
  const permissionId = req.params.permissionId;
  orchestrator
    .deletePermission(permissionId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.permissionId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

