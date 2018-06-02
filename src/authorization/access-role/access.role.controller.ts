import {Request, Response} from "express";
import {AccessRoleOrchestrator} from "./access.role.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:AccessRoleOrchestrator = new AccessRoleOrchestrator();

export let findAccessRoles = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  orchestrator.findAccessRoles(searchStr, pageSize)
    .subscribe( accessRoles => {
      res.send(JSON.stringify(accessRoles));
    }, error => {
    res.status(400);
    res.send(error);
    console.log(error);
  });
};

export let getAccessRoles = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getAccessRoles(number, size, field, direction)
    .subscribe(accessRoles => {
      res.send(JSON.stringify(accessRoles.data));
    });
};

export let getAccessRoleById = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  orchestrator
    .getAccessRoleById(accessRoleId)
    .subscribe(accessRole => {
      let body = JSON.stringify(accessRole);
      res.send(body);
    });
};

export let saveAccessRole = (req: Request, res: Response) => {
  let accessRole = req.body.accessRole;
  let grants = req.body.grant
  orchestrator.addAccessRole(accessRole, grants)
    .subscribe(accessRole => {
      res.send(JSON.stringify(accessRole));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateAccessRole = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  let accessRole = req.body.accessRole;
  let grants = req.body.grant
  orchestrator
    .updateAccessRole(accessRoleId, accessRole, grants)
    .subscribe(accessRole => {
      res.send(JSON.stringify(accessRole));
    });

};

export let deleteAccessRole = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  orchestrator
    .deleteAccessRole(accessRoleId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

