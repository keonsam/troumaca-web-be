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
        if (resourceTypes.length > 0) {
            res.status(200);
            res.send(JSON.stringify(resourceTypes));
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

export let getResourceTypes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getResourceTypes(number, size, field, direction)
    .subscribe(result => {
        if(result.data.resourceTypes.length > 0) {
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

export let getResourceTypeById = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  orchestrator
    .getResourceTypeById(resourceTypeId)
    .subscribe(resourceType => {
        if(resourceType) {
            res.status(200);
            res.send(JSON.stringify(resourceType));
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

export let saveResourceType = (req: Request, res: Response) => {
  orchestrator.addResourceType(req.body)
    .subscribe(resourceType => {
        if(resourceType) {
            res.status(201);
            res.send(JSON.stringify(resourceType));
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

export let updateResourceType = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  let resourceType = req.body;
  orchestrator
    .updateResourceType(resourceTypeId, resourceType)
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

export let deleteResourceType = (req: Request, res: Response) => {
  let resourceTypeId = req.params.resourceTypeId;
  orchestrator
    .deleteResourceType(resourceTypeId)
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
