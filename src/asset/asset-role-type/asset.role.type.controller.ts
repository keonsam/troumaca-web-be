import {Request, Response} from "express";
import {AssetRoleTypeOrchestrator} from "./asset.role.type.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";

const assetRoleTypeOrchestrator:AssetRoleTypeOrchestrator = new AssetRoleTypeOrchestrator();

export let findAssetRoleTypes = (req: Request, res: Response) => {

  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleTypeOrchestrator.findAssetRoleTypes(searchStr, pageSize, headerOptions)
  .subscribe(assetRoleTypes => {
    res.status(200);
    res.send(JSON.stringify(assetRoleTypes));
  }, error => {
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetRoleTypes = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleTypeOrchestrator.getAssetRoleTypes(number, size, field, direction, headerOptions)
  .subscribe(result => {
    res.status(200);
    res.send(JSON.stringify(result.data));
  }, error => {
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getAssetRoleTypeById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleTypeOrchestrator.getAssetRoleTypeById(req.params.assetRoleTypeId, headerOptions)
  .subscribe(assetRoleType => {
    if (assetRoleType) {
      res.status(200);
      res.send(JSON.stringify(assetRoleType));
    } else {
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
    }
  }, error => {
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addAssetRoleType = (req: Request, res: Response) => {

  const otherAssetType = req.body;
  if (!otherAssetType) {
    return res.status(400).send({message: "Asset Role Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleTypeOrchestrator.addAssetRoleType(otherAssetType, headerOptions)
  .subscribe(assetType => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetType));
  }, error => {
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateAssetRoleType = (req: Request, res: Response) => {

  const assetRoleType = req.body;
  if (!assetRoleType && !req.params.assetRoleTypeId && assetRoleType.assetRoleTypeId) {
    return res.status(400).send({message: "Asset Role Type nor \"assetRoleTypeId\" can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  assetRoleTypeOrchestrator.updateAssetRoleType(assetRoleType, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
    }
  }, error => {
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteAssetRoleType = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);

  if (!req.params.assetRoleTypeId) {
    return res.status(400).send({message: "Require \"assetRoleTypeId\"."});
  }


  assetRoleTypeOrchestrator.deleteAssetRoleType(req.params.assetRoleTypeId, headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.assetRoleTypeId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};
