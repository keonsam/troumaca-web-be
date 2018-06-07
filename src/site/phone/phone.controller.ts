import {Request, Response} from "express";
import {PhoneOrchestrator} from "./phone.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PhoneOrchestrator = new PhoneOrchestrator();

export let getPhones = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getPhones(number, size, field, direction)
    .subscribe(result => {
        if(result.data.phones.length > 0) {
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

export let getPhoneById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getPhoneById(siteId)
    .subscribe(phone => {
        if(phone) {
            res.status(200);
            res.send(JSON.stringify(phone));
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

export let savePhone = (req: Request, res: Response) => {
  orchestrator.savePhone(req.body)
    .subscribe(phone => {
        if(phone) {
            res.status(201);
            res.send(JSON.stringify(phone));
        }else {
            res.status(204);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updatePhone = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let phone = req.body;
  orchestrator
    .updatePhone(siteId, phone)
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

export let deletePhone = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deletePhone(siteId)
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

