import {Request, Response} from "express";
import {EmailOrchestrator} from "./email.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";

const orchestrator: EmailOrchestrator = new EmailOrchestrator();

export let getEmails = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getEmails(number, size, field, direction)
    .subscribe(result => {
      res.status(200);
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getEmailById = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .getEmailById(siteId)
    .subscribe(email => {
      if (email) {
        res.status(200);
        res.send(JSON.stringify(email));
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

export let saveEmail = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Email can not be empty"
    });
  }
  orchestrator.saveEmail(req.body)
    .subscribe(email => {
      res.status(201);
      res.send(JSON.stringify(email));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updateEmail = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const email = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Email can not be empty"
    });
  }
  orchestrator
    .updateEmail(siteId, email)
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

export let deleteEmail = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .deleteEmail(siteId)
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

