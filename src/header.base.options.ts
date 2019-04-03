import {Request} from "express";
import {HeaderNormalizer} from "./header.normalizer";

export class HeaderBaseOptions {
  "Correlation-ID": string;
  "Owner-Party-ID": string;
  "Party-ID": string;
  static create(req: Request) {
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
    return {
      "Correlation-ID": correlationId ? correlationId.toString() : undefined,
      "Owner-Party-ID": ownerPartyId ? ownerPartyId.toString() : undefined,
      "Party-ID": partyId ? partyId.toString() : undefined
    };
  }
}
