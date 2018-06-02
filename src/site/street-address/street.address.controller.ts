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
    .subscribe(streetAddresses => {
      console.log(streetAddresses);
      res.send(JSON.stringify(streetAddresses.data));
    });
};

export let getStreetAddressById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getStreetAddressById(siteId)
    .subscribe(streetAddress => {
      let body = JSON.stringify(streetAddress);
      res.send(body);
    });

};

export let saveStreetAddress = (req: Request, res: Response) => {
  orchestrator.saveStreetAddress(req.body)
    .subscribe(streetAddress => {
      res.send(JSON.stringify(streetAddress));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateStreetAddress = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let streetAddress = req.body;
  orchestrator
    .updateStreetAddress(siteId, streetAddress)
    .subscribe(streetAddress => {
      res.send(JSON.stringify(streetAddress));
    });

};

export let deleteStreetAddress = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteStreetAddress(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

