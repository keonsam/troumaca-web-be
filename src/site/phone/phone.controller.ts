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
    .subscribe(phones => {
      res.send(JSON.stringify(phones.data));
    });
};

export let getPhoneById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getPhoneById(siteId)
    .subscribe(phone => {
      let body = JSON.stringify(phone);
      res.send(body);
    });

};

export let savePhone = (req: Request, res: Response) => {
  orchestrator.savePhone(req.body)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updatePhone = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let phone = req.body;
  orchestrator
    .updatePhone(siteId, phone)
    .subscribe(phone => {
      res.send(JSON.stringify(phone));
    });

};

export let deletePhone = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deletePhone(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

