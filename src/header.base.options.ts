import {Request} from "express";
import {HeaderNormalizer} from "./header.normalizer";

export class HeaderBaseOptions {
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
    return {
      "Correlation-ID": correlationId,
      "Owner-Party-ID": ownerPartyId
    };
  }
}