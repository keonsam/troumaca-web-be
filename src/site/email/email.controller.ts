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
    .subscribe(result => {
        if(result.data.emails.length > 0) {
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

export let getEmailById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getEmailById(siteId)
    .subscribe(email => {
        if(email) {
            res.status(200);
            res.send(JSON.stringify(email));
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

export let saveEmail = (req: Request, res: Response) => {
  orchestrator.saveEmail(req.body)
    .subscribe(email => {
        if(email) {
            res.status(201);
            res.send(JSON.stringify(email));
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

export let updateEmail = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let email = req.body;
  orchestrator
    .updateEmail(siteId, email)
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

export let deleteEmail = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteEmail(siteId)
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

