import {Request, Response} from "express";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {AssetClassificationOrchestrator} from "./asset.classification.orchestrator";
import {HeaderNormalizer} from "../../header.normalizer";

const orchestrator: AssetClassificationOrchestrator = new AssetClassificationOrchestrator();


export let addAssetClassification = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const assetClassification = req.body;

  if (!assetClassification) {
    return res.status(400).send({message: "Asset Type Class can not be empty"});
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  orchestrator.addAssetClassification(assetClassification, headerOptions)
    .subscribe(assetTypeClass => {
      res.status(201);
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let findAssetTypeClass = (req: Request, res: Response) => {
  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

  orchestrator.findAssetTypeClass(searchStr, pageSize)
    .subscribe(assetTypeClasses => {
      res.status(200);
      res.send(JSON.stringify(assetTypeClasses));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getAssetTypeClasses = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAssetTypeClasses(number, size, field, direction)
    .subscribe(result => {
      res.status(200);
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getAssetTypeClass = (req: Request, res: Response) => {
  const assetTypeClassId = req.params.assetClassificationId;
  orchestrator.getAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClassResponse => {
      if (assetTypeClassResponse) {
        res.status(200);
        res.send(JSON.stringify(assetTypeClassResponse));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetClassificationId}));
      }
    }, error => {
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};



export let updateAssetTypeClass = (req: Request, res: Response) => {
  const assetTypeClassId = req.params.assetClassificationId;
  const assetTypeClass = req.body.assetTypeClass;
  const assignedAttribute = req.body.assignedAttributes;
  if (!req.body) {
    return res.status(400).send({
      message: "Asset Type Class can not be empty"
    });
  }
  orchestrator.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttribute)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetClassificationId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let deleteAssetTypeClass = (req: Request, res: Response) => {
  const assetTypeClassId = req.params.assetClassificationId;

  orchestrator.deleteAssetTypeClass(assetTypeClassId)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetClassificationId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};
