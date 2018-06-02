import {Request, Response} from "express";
import {ResourceTypeOrchestrator} from "./resource.type.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:ResourceTypeOrchestrator = new ResourceTypeOrchestrator();


export let findResourceTypes = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  orchestrator.findResourceTypes(searchStr, pageSize)
    .subscribe( resourceTypes => {
      res.send(JSON.stringify(resourceTypes));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let getResourceTypes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getResourceTypes(number, size, field, direction)
    .subscribe(resourceTypes => {
      res.send(JSON.stringify(resourceTypes.data));
    });
};

export let getResourceTypeById = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  orchestrator
    .getResourceTypeById(resourceTypeId)
    .subscribe(resourceType => {
      let body = JSON.stringify(resourceType);
      res.send(body);
    });
};

export let saveResourceType = (req: Request, res: Response) => {
  orchestrator.addResourceType(req.body)
    .subscribe(resourceType => {
      res.send(JSON.stringify(resourceType));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateResourceType = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  let resourceType = req.body;
  orchestrator
    .updateResourceType(resourceTypeId, resourceType)
    .subscribe(resourceType => {
      res.send(JSON.stringify(resourceType));
    });

};

export let deleteResourceType = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  orchestrator
    .deleteResourceType(resourceTypeId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};
