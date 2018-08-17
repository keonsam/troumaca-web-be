import { Request, Response } from "express";
import { PhoneOrchestrator } from "./phone.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: PhoneOrchestrator = new PhoneOrchestrator();

export let getPhones = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getPhones(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getPhoneById = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .getPhoneById(siteId)
    .subscribe(phone => {
        if (phone) {
            res.status(200);
            res.send(JSON.stringify(phone));
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

export let savePhone = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Phone can not be empty"
        });
    }
  orchestrator.savePhone(req.body)
    .subscribe(phone => {
        res.status(201);
        res.send(JSON.stringify(phone));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updatePhone = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const phone = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Phone can not be empty"
        });
    }
  orchestrator
    .updatePhone(siteId, phone)
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

export let deletePhone = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .deletePhone(siteId)
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

