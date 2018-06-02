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
    .subscribe(webSites => {
      res.send(JSON.stringify(webSites.data));
    });
};

export let getWebSiteById = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .getWebSiteById(siteId)
    .subscribe(webSite => {
      let body = JSON.stringify(webSite);
      res.send(body);
    });

};

export let saveWebSite = (req: Request, res: Response) => {
  orchestrator.saveWebSite(req.body)
    .subscribe(webSite => {
      res.send(JSON.stringify(webSite));
    }, error => {
      res.send(error);
      console.log(error);
    });
}

export let updateWebSite = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  let webSite = req.body;
  orchestrator
    .updateWebSite(siteId, webSite)
    .subscribe(webSite => {
      res.send(JSON.stringify(webSite));
    });

};

export let deleteWebSite = (req: Request, res: Response) => {
  let siteId = req.params.siteId;
  orchestrator
    .deleteWebSite(siteId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

