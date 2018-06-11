import {Request, Response} from "express";
import {StreetAddressOrchestrator} from "./street.address.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:StreetAddressOrchestrator = new StreetAddressOrchestrator();

export let getStreetAddresses = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getStreetAddresses(number, size, field, direction)
    .subscribe(result => {
        if(result.data.streetAddresses.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let getStreetAddressById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getStreetAddressById(siteId)
    .subscribe(streetAddress => {
        if(streetAddress) {
            res.status(200);
            res.send(JSON.stringify(streetAddress));
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

export let saveStreetAddress = (req: Request, res: Response) => {
  orchestrator.saveStreetAddress(req.body)
    .subscribe(streetAddress => {
        if(streetAddress) {
            res.status(201);
            res.send(JSON.stringify(streetAddress));
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

export let updateStreetAddress = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let streetAddress = req.body;
  orchestrator
    .updateStreetAddress(siteId, streetAddress)
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

export let deleteStreetAddress = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteStreetAddress(siteId)
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

