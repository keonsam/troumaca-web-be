import {Request, Response} from "express";
import {getNumericValueOrDefault} from '../../number.util';
import {getStringValueOrDefault} from '../../string.util';
import {AssetTypeClassOrchestrator} from './asset.type.class.orchestrator';

let orchestrator:AssetTypeClassOrchestrator = new AssetTypeClassOrchestrator();

export  let findAssetTypeClass = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  orchestrator.findAssetTypeClass(searchStr, pageSize)
    .subscribe(assetTypeClasses => {
        if (assetTypeClasses.length > 0) {
            res.status(200);
            res.send(JSON.stringify(assetTypeClasses));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let getAssetTypeClasses = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  orchestrator.getAssetTypeClasses(number, size, field, direction)
    .subscribe(result => {
        if(result.data.assetTypeClasses.length > 0) {
            res.status(200);
            res.send(JSON.stringify(result.data));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}));
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });

};

export let getAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssetTypeClass(assetTypeClassId)
    .subscribe(assetTypeClassResponse => {
        if(assetTypeClassResponse) {
            res.status(200);
            res.send(JSON.stringify(assetTypeClassResponse.toJson()));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let saveAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClass = req.body.newAssetTypeClass;
  let assignedAttributes = req.body.newAssignedAttributes;

  orchestrator.saveAssetTypeClass(assetTypeClass, assignedAttributes)
    .subscribe(assetTypeClass => {
        if(assetTypeClass) {
            res.status(201);
            res.send(JSON.stringify(assetTypeClass));
        }else {
            res.status(204);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;
  let assetTypeClass = req.body.newAssetTypeClass;
  let assignedAttribute = req.body.newAssignedAttributes;

  orchestrator.updateAssetTypeClass(assetTypeClassId, assetTypeClass, assignedAttribute)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Updated'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let deleteAssetTypeClass = (req: Request, res: Response) => {
  let assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.deleteAssetTypeClass(assetTypeClassId)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Deleted'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};
