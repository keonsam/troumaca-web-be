import { Request, Response } from "express";
import { StreetAddressOrchestrator } from "./street.address.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: StreetAddressOrchestrator = new StreetAddressOrchestrator();

export let getStreetAddresses = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getStreetAddresses(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getStreetAddressById = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .getStreetAddressById(siteId)
    .subscribe(streetAddress => {
        if (streetAddress) {
            res.status(200);
            res.send(JSON.stringify(streetAddress));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let saveStreetAddress = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Street Address can not be empty"
        });
    }
  orchestrator.saveStreetAddress(req.body)
    .subscribe(streetAddress => {
        res.status(201);
        res.send(JSON.stringify(streetAddress));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateStreetAddress = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const streetAddress = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Street Address can not be empty"
        });
    }
  orchestrator
    .updateStreetAddress(siteId, streetAddress)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteStreetAddress = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .deleteStreetAddress(siteId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

