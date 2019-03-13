import {Request, Response} from "express";
import {UnitOfMeasurementOrchestrator} from "./unit.of.measurement.orchestrator";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";
import {HeaderBaseOptions} from "../header.base.options";
import {getDirectionValueOrDefault} from "../direction.util";
import {Sort} from "../util/sort";
import {Order} from "../util/order";

const unitOfMeasurementOrchestrator:UnitOfMeasurementOrchestrator = new UnitOfMeasurementOrchestrator();

export let findUnitOfMeasurements = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  unitOfMeasurementOrchestrator.findUnitOfMeasurements(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
    .subscribe(unitOfMeasurements => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(unitOfMeasurements));
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(400);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let getUnitOfMeasurements = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  unitOfMeasurementOrchestrator.getUnitOfMeasurements(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getUnitOfMeasurementById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let unitOfMeasurementId = req.params.unitOfMeasurementId;

  unitOfMeasurementOrchestrator.getUnitOfMeasurementById(unitOfMeasurementId, ownerPartyId.toString(), headerOptions)
    .subscribe(unitOfMeasurement => {
      if (unitOfMeasurement) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(unitOfMeasurement));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let addUnitOfMeasurement = (req: Request, res: Response) => {

  const unitOfMeasurement = req.body;
  if (!unitOfMeasurement) {
    return res.status(400).send({message: "Unit Of Measurement  can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementOrchestrator.addUnitOfMeasurement(unitOfMeasurement, headerOptions)
    .subscribe(unitOfMeasurement => {
      res.setHeader('Content-Type', 'application/json');
      res.status(201);
      res.send(JSON.stringify(unitOfMeasurement));
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};

export let updateUnitOfMeasurement = (req: Request, res: Response) => {

  const unitOfMeasurement = req.body;
  let unitOfMeasurementId = req.params.unitOfMeasurementId;
  if (!unitOfMeasurement && !unitOfMeasurementId && unitOfMeasurement.unitOfMeasurementId) {
    return res.status(400).send({
      message: "Unit Of Measurement  nor \"unitOfMeasurementId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementOrchestrator.updateUnitOfMeasurement(unitOfMeasurement, headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};


export let deleteUnitOfMeasurement = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions['Owner-Party-ID'];

  let unitOfMeasurementId = req.params.unitOfMeasurementId;
  if (!unitOfMeasurementId) {
    return res.status(400).send({message: "Require \"unitOfMeasurementId\"."});
  }

  unitOfMeasurementOrchestrator.deleteUnitOfMeasurement(unitOfMeasurementId, ownerPartyId.toString(), headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};
