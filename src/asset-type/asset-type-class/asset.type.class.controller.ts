import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetTypeClassOrchestrator} from './asset.type.class.orchestrator';
import {shapeAssetTypeClassesResponse2} from "./asset.type.class.response.shaper";

let orchestrator:AssetTypeClassOrchestrator = new AssetTypeClassOrchestrator();

export  let findAssetTypeClass = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  orchestrator.findAssetTypeClass(searchStr, pageSize)
    .map(value => {
      return shapeAssetTypeClassesResponse2("assetTypeClasses", value);
    }).subscribe(assetTypeClasses => {
    let body = JSON.stringify(assetTypeClasses);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });
};

export let getAssetTypeClasses = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAssetTypeClasses(number, size, field, direction)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};

export let getAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssetTypeClass(assetTypeClassId)
    .subscribe((data) => {
      res.send(JSON.stringify(data.toJson()));
    }, error => {
      res.send(JSON.stringify(error));
    });
};

export let saveAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClass = req.body.newAssetTypeClass;
  let assignedAttributes = req.body.newAssignedAttributes;

  orchestrator.saveAssetTypeClass(assetTypeClass, assignedAttributes)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let updateAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;
  let assetTypeClass = req.body.newAssetTypeClass;
  let assignedAttribute = req.body.newAssignedAttributes;

  orchestrator.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttribute)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let deleteAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.deleteAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClass => {
      res.send(JSON.stringify(assetTypeClass));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};
