import {Request, Response} from "express";
import {UnitOfMeasurementConversionOrchestrator} from "./unit.of.measurement.conversion.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const unitOfMeasurementConversionOrchestrator:UnitOfMeasurementConversionOrchestrator = new UnitOfMeasurementConversionOrchestrator();

export let findUnitOfMeasurementConversions = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  unitOfMeasurementConversionOrchestrator.findUnitOfMeasurementConversions(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(assetNameTypes => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(assetNameTypes));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getUnitOfMeasurementConversions = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  unitOfMeasurementConversionOrchestrator.getUnitOfMeasurementConversions(ownerPartyId.toString(), number, size, sort, headerOptions)
  .subscribe(page => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(page));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getUnitOfMeasurementConversionById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let unitOfMeasurementConversionId = req.params.unitOfMeasurementConversionId;

  unitOfMeasurementConversionOrchestrator.getUnitOfMeasurementConversionById(unitOfMeasurementConversionId, ownerPartyId.toString(), headerOptions)
  .subscribe(assetNameType => {
    if (assetNameType) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(assetNameType));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementConversionId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addUnitOfMeasurementConversion = (req: Request, res: Response) => {

  const assetNameType = req.body;
  if (!assetNameType) {
    return res.status(400).send({message: "Asset Name Type can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementConversionOrchestrator.addUnitOfMeasurementConversion(assetNameType, headerOptions)
  .subscribe(assetType => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(assetType));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateUnitOfMeasurementConversion = (req: Request, res: Response) => {

  const assetNameType = req.body;
  let unitOfMeasurementConversionId = req.params.unitOfMeasurementConversionId;
  if (!assetNameType && !unitOfMeasurementConversionId && assetNameType.unitOfMeasurementConversionId) {
    return res.status(400).send({
      message: "Asset Name Type nor \"unitOfMeasurementConversionId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementConversionOrchestrator.updateUnitOfMeasurementConversion(assetNameType, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementConversionId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteUnitOfMeasurementConversion = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions['Owner-Party-ID'];

  let unitOfMeasurementConversionId = req.params.unitOfMeasurementConversionId;
  if (!unitOfMeasurementConversionId) {
    return res.status(400).send({message: "Require \"unitOfMeasurementConversionId\"."});
  }

  unitOfMeasurementConversionOrchestrator.deleteUnitOfMeasurementConversion(unitOfMeasurementConversionId, ownerPartyId.toString(), headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementConversionId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};
