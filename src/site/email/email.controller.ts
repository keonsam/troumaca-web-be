import {Request, Response} from "express";
import {EmailOrchestrator} from "./email.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:EmailOrchestrator = new EmailOrchestrator();

export let getEmails = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getEmails(number, size, field, direction)
    .subscribe(emails => {
      res.send(JSON.stringify(emails.data));
    });
};

export let getEmailById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getEmailById(siteId)
    .subscribe(email => {
      let body = JSON.stringify(email);
      res.send(body);
    });
};

export let saveEmail = (req: Request, res: Response) => {
  orchestrator.saveEmail(req.body)
    .subscribe(email => {
      res.send(JSON.stringify(email));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateEmail = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let email = req.body;
  orchestrator
    .updateEmail(siteId, email)
    .subscribe(email => {
      res.send(JSON.stringify(email));
    });

};

export let deleteEmail = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteEmail(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

