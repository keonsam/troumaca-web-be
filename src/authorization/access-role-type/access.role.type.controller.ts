import {Request, Response} from "express";
import {AccessRoleTypeOrchestrator} from "./access.role.type.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:AccessRoleTypeOrchestrator = new AccessRoleTypeOrchestrator();

export let findAccessRoleTypes = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  orchestrator.findAccessRoleTypes(searchStr, pageSize)
    .subscribe( accessRoleTypes => {
        if (accessRoleTypes.length > 0) {
            res.status(200);
            res.send(JSON.stringify(accessRoleTypes));
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

export let getAccessRoleTypes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getAccessRoleTypes(number, size, field, direction)
    .subscribe(result => {
        if(result.data.accessRoleTypes.length > 0) {
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

export let getAccessRoleTypeById = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .getAccessRoleTypeById(accessRoleTypeId)
    .subscribe(accessRoleType => {
        if(accessRoleType) {
            res.status(200);
            res.send(JSON.stringify(accessRoleType));
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

export let saveAccessRoleType = (req: Request, res: Response) => {
  orchestrator.addAccessRoleType(req.body)
    .subscribe(accessRoleType => {
        if(accessRoleType) {
            res.status(201);
            res.send(JSON.stringify(accessRoleType));
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

export let updateAccessRoleType = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  let accessRoleType = req.body;
  orchestrator
    .updateAccessRoleType(accessRoleTypeId, accessRoleType)
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

export let deleteAccessRoleType = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .deleteAccessRoleType(accessRoleTypeId)
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

