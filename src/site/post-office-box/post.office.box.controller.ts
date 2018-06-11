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
    .subscribe(result => {
        if(result.data.postOfficeBoxes.length > 0) {
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

export let getPostOfficeBoxById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getPostOfficeBoxById(siteId)
    .subscribe(postOfficeBox => {
        if(postOfficeBox) {
            res.status(200);
            res.send(JSON.stringify(postOfficeBox));
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

export let savePostOfficeBox = (req: Request, res: Response) => {
  orchestrator.savePostOfficeBox(req.body)
    .subscribe(postOfficeBox => {
        if(postOfficeBox) {
            res.status(201);
            res.send(JSON.stringify(postOfficeBox));
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

export let updatePostOfficeBox = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let postOfficeBox = req.body;
  orchestrator
    .updatePostOfficeBox(siteId, postOfficeBox)
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

export let deletePostOfficeBox = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deletePostOfficeBox(siteId)
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

