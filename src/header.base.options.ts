import {Request} from "express";
import {HeaderNormalizer} from "./header.normalizer";

export class HeaderBaseOptions {
  static create(req: Request) {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-ID"];
    const ownerPartyId = req.headers["Owner-Party-ID"];
    return {
      "Correlation-ID": correlationId,
      "Owner-Party-ID": ownerPartyId
    };
  }
}