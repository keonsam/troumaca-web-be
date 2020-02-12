import {Request} from "express";
import { HeaderNormalizer } from "./header.normalizer";
import { generateUUID } from "./uuid.generator";

export class HeaderBaseOptions {

  correlationId: string;
  ownerPartyId: string;
  partyId: string;

  constructor(req: Request) {
    HeaderNormalizer.normalize(req);
      let correlationId = req.headers["Correlation-ID"];
      if (!correlationId) {
        correlationId = req.headers["Correlation-Id"];
      }
      let ownerPartyId = req.headers["Owner-Party-ID"];
      if (!ownerPartyId) {
        ownerPartyId = req.headers["Owner-Party-Id"];
      }
      let partyId =  req.headers["Party-ID"];
      if (!partyId) {
        partyId =  req.headers["Party-Id"];
      }
      if (!partyId) {
        partyId =  req.headers["Requester-Party-Id"];
      }

    this.correlationId = correlationId ? correlationId.toString() : generateUUID();
    this.ownerPartyId = ownerPartyId ? ownerPartyId.toString() : "";
    this.partyId = partyId ? partyId.toString() : "";
  }

  toHeaders() {
    return {
      "Correlation-ID": this.correlationId,
      "Owner-Party-ID": this.partyId,
      "Party-ID": this.partyId,
      "Requester-Party-ID": this.partyId
    };
  }
}
