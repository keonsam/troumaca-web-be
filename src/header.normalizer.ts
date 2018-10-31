import {Request} from "express";
import headerCaseNormalizer from "header-case-normalizer";


export class HeaderNormalizer {
  static normalize(req: Request) {
    for (const [name, value] of Object.entries(req.headers)) {
      delete req.headers[name];

      req.headers[headerCaseNormalizer(name)] =  value;
    }
  }
}