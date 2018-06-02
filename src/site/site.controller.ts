import {Request, Response} from "express";
import {SiteOrchestrator} from "./site.orchestrator";
import {shapeSiteResponse2} from "./site.response.shaper";

let siteOrchestrator:SiteOrchestrator = new SiteOrchestrator();

export let findSite = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  siteOrchestrator.findSite(searchStr, pageSize)
  .map(value => {
      return shapeSiteResponse2(value);
  }).subscribe(sites => {
    let body = JSON.stringify(sites);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};
