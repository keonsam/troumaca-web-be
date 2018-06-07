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
        if (accessRoles.length > 0) {
            res.status(200);
            res.send(JSON.stringify(accessRoles));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
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
    .subscribe(result => {
        if(result.data.accessRoles.length > 0) {
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

export let getAccessRoleById = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  orchestrator
    .getAccessRoleById(accessRoleId)
    .subscribe(accessRole => {
        if(accessRole) {
            res.status(200);
            res.send(JSON.stringify(accessRole));
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

export let saveAccessRole = (req: Request, res: Response) => {
  let accessRole = req.body.accessRole;
  let grants = req.body.grant
  orchestrator.addAccessRole(accessRole, grants)
    .subscribe(accessRole => {
        if(accessRole) {
            res.status(201);
            res.send(JSON.stringify(accessRole));
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

export let updateAccessRole = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  let accessRole = req.body.accessRole;
  let grants = req.body.grant
  orchestrator
    .updateAccessRole(accessRoleId, accessRole, grants)
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

export let deleteAccessRole = (req: Request, res: Response) => {
  let accessRoleId = req.params.accessRoleId;
  orchestrator
    .deleteAccessRole(accessRoleId)
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

