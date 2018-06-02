import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AttributeOrchestrator} from './attribute.orchestrator';

let orchestrator:AttributeOrchestrator = new AttributeOrchestrator();

export let getAvailableAttributes = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getAvailableAttributes(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getAssignedAttributes = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");
  let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(","): [];

  orchestrator.getAssignedAttributes(number, size, field, direction, assignedArray)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getAssignedAttributeByClassId = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssignedAttributeByClassId(assetTypeClassId)
    .subscribe(assignedAttributes => {
      res.send(JSON.stringify(assignedAttributes));
    });
};

export let getAttributes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAttributes(number, size, field, direction)
    .subscribe(attributes => {
      res.send(JSON.stringify(attributes.data));
    });
};

export let saveAttribute = (req: Request, res: Response) => {
  orchestrator.saveAttribute(req.body)
    .subscribe(assets => {
      res.send(JSON.stringify(assets));
    });
};

export let getAttributeCount = (req: Request, res: Response) => {
  orchestrator.getAttributeCount()
    .subscribe(assetCount => {
      res.send(JSON.stringify(assetCount));
    });
};

export let getAttributeById = (req: Request, res: Response) => {
  orchestrator.getAttributeById(req.params.attributeId)
    .subscribe(attribute => {
      res.send(JSON.stringify(attribute));
    });
};


export let updateAttribute = (req: Request, res: Response) => {
  orchestrator.updateAttribute(req.params.attributeId, req.body)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });

};

export let deleteAttribute = (req: Request, res: Response) => {
  orchestrator.deleteAttribute(req.params.attributeId)
    .subscribe(affected => {
      res.send(JSON.stringify(affected));
    });
};
