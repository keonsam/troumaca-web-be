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
      res.send(JSON.stringify(accessRoleTypes));
    }, error => {
      res.status(400);
      res.send(error);
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
    .subscribe(accessRoleTypes => {
      res.send(JSON.stringify(accessRoleTypes.data));
    });
};

export let getAccessRoleTypeById = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .getAccessRoleTypeById(accessRoleTypeId)
    .subscribe(accessRoleType => {
      let body = JSON.stringify(accessRoleType);
      res.send(body);
    });
};

export let saveAccessRoleType = (req: Request, res: Response) => {
  orchestrator.addAccessRoleType(req.body)
    .subscribe(accessRoleType => {
      res.send(JSON.stringify(accessRoleType));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateAccessRoleType = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  let accessRoleType = req.body;
  orchestrator
    .updateAccessRoleType(accessRoleTypeId, accessRoleType)
    .subscribe(accessRoleType => {
      res.send(JSON.stringify(accessRoleType));
    });

};

export let deleteAccessRoleType = (req: Request, res: Response) => {
  let accessRoleTypeId = req.params.accessRoleTypeId;
  orchestrator
    .deleteAccessRoleType(accessRoleTypeId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

