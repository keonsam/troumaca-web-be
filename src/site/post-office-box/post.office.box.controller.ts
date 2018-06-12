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
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
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
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.siteId}))
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let savePostOfficeBox = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Post Office Box can not be empty"
        });
    }
  orchestrator.savePostOfficeBox(req.body)
    .subscribe(postOfficeBox => {
        res.status(201);
        res.send(JSON.stringify(postOfficeBox));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
}

export let updatePostOfficeBox = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let postOfficeBox = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Post Office Box can not be empty"
        });
    }
  orchestrator
    .updatePostOfficeBox(siteId, postOfficeBox)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.siteId}));
        }
    }, error => {
        res.status(500);
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
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

