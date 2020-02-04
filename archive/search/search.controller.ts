import {Request, Response} from "express";
import {SearchOrchestrator} from "./search.orchestrator";
import {HeaderNormalizer} from "../header.normalizer";

const searchOrchestrator: SearchOrchestrator = new SearchOrchestrator();

export let search = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);

  const indexName: string = req.params.indexName;
  const query: Map<string, Object> = req.query;

  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];


  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };


  searchOrchestrator.search(indexName, query, headerOptions)
  .subscribe(result => {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result));
  }, error => {
    res.status(!error.code ? 500 : error.code);
    const msg = !error.message ? "Internal Server Error" : error.message;
    res.send(JSON.stringify(msg));
    console.log(error);
  });
};