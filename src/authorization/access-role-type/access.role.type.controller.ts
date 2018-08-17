import { Request, Response } from "express";
import { AccessRoleTypeOrchestrator } from "./access.role.type.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: AccessRoleTypeOrchestrator = new AccessRoleTypeOrchestrator();

export let findAccessRoleTypes = (req: Request, res: Response) => {
  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  orchestrator.findAccessRoleTypes(searchStr, pageSize)
    .subscribe( accessRoleTypes => {
        res.status(200);
        res.send(JSON.stringify(accessRoleTypes));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getAccessRoleTypes = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getAccessRoleTypes(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));

    });
};

export let getAccessRoleTypeById = (req: Request, res: Response) => {
  const accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .getAccessRoleTypeById(accessRoleTypeId)
    .subscribe(accessRoleType => {
        if (accessRoleType) {
            res.status(200);
            res.send(JSON.stringify(accessRoleType));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.accessRoleTypeId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let saveAccessRoleType = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Access Role Type can not be empty"
        });
    }
  orchestrator.addAccessRoleType(req.body)
    .subscribe(accessRoleType => {
        res.status(201);
        res.send(JSON.stringify(accessRoleType));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateAccessRoleType = (req: Request, res: Response) => {
  const accessRoleTypeId = req.params.accessRoleTypeId;
  const accessRoleType = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Access Role Type can not be empty"
        });
    }
  orchestrator
    .updateAccessRoleType(accessRoleTypeId, accessRoleType)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.accessRoleTypeId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteAccessRoleType = (req: Request, res: Response) => {
  const accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .deleteAccessRoleType(accessRoleTypeId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.accessRoleTypeId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

