import {Request, Response} from "express";
import {AccessRoleOrchestrator} from "./access.role.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";

const orchestrator: AccessRoleOrchestrator = new AccessRoleOrchestrator();

export let findAccessRoles = (req: Request, res: Response) => {
  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

  orchestrator.findAccessRoles(searchStr, pageSize)
    .subscribe(accessRoles => {
      res.status(200);
      res.send(JSON.stringify(accessRoles));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getAccessRoles = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getAccessRoles(number, size, field, direction)
    .subscribe(result => {
      res.status(200);
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));

    });
};

export let getAccessRoleById = (req: Request, res: Response) => {
  orchestrator
    .getAccessRoleById(req.params.accessRoleId)
    .subscribe(accessRole => {
      if (accessRole) {
        res.status(200);
        res.send(JSON.stringify(accessRole));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.accessRoleId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let saveAccessRole = (req: Request, res: Response) => {
  const accessRole = req.body.accessRole;
  const grants = req.body.grants;
  if (!req.body) {
    return res.status(400).send({
      message: "Access Role can not be empty"
    });
  }
  orchestrator.addAccessRole(accessRole, grants)
    .subscribe(accessRole => {
      res.status(201);
      res.send(JSON.stringify(accessRole));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updateAccessRole = (req: Request, res: Response) => {
  const accessRoleId = req.params.accessRoleId;
  const accessRole = req.body.accessRole;
  const grants = req.body.grants;
  if (!req.body) {
    return res.status(400).send({
      message: "Access Role can not be empty"
    });
  }
  orchestrator
    .updateAccessRole(accessRoleId, accessRole, grants)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: {message: "No Data Found For " + req.params.accessRoleId}}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let deleteAccessRole = (req: Request, res: Response) => {
  const accessRoleId = req.params.accessRoleId;
  orchestrator
    .deleteAccessRole(accessRoleId)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: {message: "No Data Found For " + req.params.accessRoleId}}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

