import {Request, Response} from "express";
import {SiteOrchestrator} from "./site.orchestrator";

let siteOrchestrator:SiteOrchestrator = new SiteOrchestrator();

export let findSite = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  siteOrchestrator.findSite(searchStr, pageSize)
      .subscribe(sites => {
          if (sites.length > 0) {
              res.status(200);
              res.send(JSON.stringify(sites));
          } else {
              res.status(404);
              res.send(JSON.stringify({message: 'No Data Found'}));
          }
      }, error => {
          res.status(400);
          res.send(JSON.stringify({message: 'Error Occurred'}));
          console.log(error);
      });
};
