import {Response, Request} from "express";
import { HeaderNormalizer } from "../header.normalizer";
import {PartyRelationshipOrchestrator} from "./party.relationship.orchestrator";
const partyRelationshipOrchestrator: PartyRelationshipOrchestrator = new PartyRelationshipOrchestrator();

export let checkPartyRelationship = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const checkPartyRelationship = req.body;

  if (!correlationId) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  if (!checkPartyRelationship.toPartyId) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "'Check Party Relationship' is required to contain toPartyId."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  partyRelationshipOrchestrator
  .getPartyRelationship(checkPartyRelationship.toPartyId, headerOptions)
  .subscribe(next => {
    const body = JSON.stringify(next);
    res.status(201);
    res.setHeader("content-type", "application/json");
    res.send(body);
  }, error => {
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};