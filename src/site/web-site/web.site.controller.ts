import { Request, Response } from "express";
import { WebSiteOrchestrator } from "./web.site.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const orchestrator: WebSiteOrchestrator = new WebSiteOrchestrator();

export let getWebSites = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator
    .getWebSites(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let getWebSiteById = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .getWebSiteById(siteId)
    .subscribe(webSite => {
        if (webSite) {
            res.status(200);
            res.send(JSON.stringify(webSite));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });

};

export let saveWebSite = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Web Site can not be empty"
        });
    }
  orchestrator.saveWebSite(req.body)
    .subscribe(webSite => {
        if (webSite) {
            res.status(201);
            res.send(JSON.stringify(webSite));
        } else {
            res.status(204);
            res.send(JSON.stringify({message: "Not Saved"}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateWebSite = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  const webSite = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Web Site can not be empty"
        });
    }
  orchestrator
    .updateWebSite(siteId, webSite)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteWebSite = (req: Request, res: Response) => {
  const siteId = req.params.siteId;
  orchestrator
    .deleteWebSite(siteId)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.siteId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

