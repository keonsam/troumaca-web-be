import {Request, Response} from "express";
import {WebSiteOrchestrator} from "./web.site.orchestrator";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';

let orchestrator:WebSiteOrchestrator = new WebSiteOrchestrator();

export let getWebSites = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getWebSites(number, size, field, direction)
    .subscribe(result => {
        if(result.data.webSites.length > 0) {
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

export let getWebSiteById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getWebSiteById(siteId)
    .subscribe(webSite => {
        if(webSite) {
            res.status(200);
            res.send(JSON.stringify(webSite));
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

export let saveWebSite = (req: Request, res: Response) => {
  orchestrator.saveWebSite(req.body)
    .subscribe(webSite => {
        if(webSite) {
            res.status(201);
            res.send(JSON.stringify(webSite));
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

export let updateWebSite = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let webSite = req.body;
  orchestrator
    .updateWebSite(siteId, webSite)
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

export let deleteWebSite = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteWebSite(siteId)
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

