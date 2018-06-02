import {Request, Response} from "express";
import {PostOfficeBoxOrchestrator} from "./post.office.box.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PostOfficeBoxOrchestrator = new PostOfficeBoxOrchestrator();

export let getPostOfficeBoxes = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getPostOfficeBoxes(number, size, field, direction)
    .subscribe(postOfficeBoxes => {
      res.send(JSON.stringify(postOfficeBoxes.data));
    });
};

export let getPostOfficeBoxById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getPostOfficeBoxById(siteId)
    .subscribe(postOfficeBox => {
      let body = JSON.stringify(postOfficeBox);
      res.send(body);
    });

};

export let savePostOfficeBox = (req: Request, res: Response) => {
  orchestrator.savePostOfficeBox(req.body)
    .subscribe(postOfficeBox => {
      res.send(JSON.stringify(postOfficeBox));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updatePostOfficeBox = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let postOfficeBox = req.body;
  orchestrator
    .updatePostOfficeBox(siteId, postOfficeBox)
    .subscribe(postOfficeBox => {
      res.send(JSON.stringify(postOfficeBox));
    });

};

export let deletePostOfficeBox = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deletePostOfficeBox(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

