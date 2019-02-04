import {Request, Response} from "express";
import {UnitOfMeasurementSystemOrchestrator} from "./unit.of.measurement.system.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {HeaderBaseOptions} from "../../header.base.options";
import {getDirectionValueOrDefault} from "../../direction.util";
import {Sort} from "../../util/sort";
import {Order} from "../../util/order";

const unitOfMeasurementSystemOrchestrator:UnitOfMeasurementSystemOrchestrator = new UnitOfMeasurementSystemOrchestrator();

export let findUnitOfMeasurementSystems = (req: Request, res: Response) => {

  const searchText: string = req.query.q;
  const pageNumber = getNumericValueOrDefault(req.query.pageNumber, 1);
  const pageSize = getNumericValueOrDefault(req.query.pageSize, 10);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  unitOfMeasurementSystemOrchestrator.findUnitOfMeasurementSystems(ownerPartyId.toString(), searchText, pageNumber, pageSize, headerOptions)
  .subscribe(unitOfMeasurementSystems => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(unitOfMeasurementSystems));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let getUnitOfMeasurementSystems = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getDirectionValueOrDefault(req.query.sortOrder, null);

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];

  let sort:Sort = new Sort().add(new Order(direction, field));
  unitOfMeasurementSystemOrchestrator.getUnitOfMeasurementSystems(ownerPartyId.toString(), number, size, sort, headerOptions)
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

export let getUnitOfMeasurementSystemById = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions["Owner-Party-ID"];
  let unitOfMeasurementSystemId = req.params.unitOfMeasurementSystemId;

  unitOfMeasurementSystemOrchestrator.getUnitOfMeasurementSystemById(unitOfMeasurementSystemId, ownerPartyId.toString(), headerOptions)
  .subscribe(unitOfMeasurementSystem => {
    if (unitOfMeasurementSystem) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(unitOfMeasurementSystem));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementSystemId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let addUnitOfMeasurementSystem = (req: Request, res: Response) => {

  const unitOfMeasurementSystem = req.body;
  if (!unitOfMeasurementSystem) {
    return res.status(400).send({message: "Unit Of Measurement System can not be empty"});
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementSystemOrchestrator.addUnitOfMeasurementSystem(unitOfMeasurementSystem, headerOptions)
  .subscribe(unitOfMeasurementSystem => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201);
    res.send(JSON.stringify(unitOfMeasurementSystem));
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};

export let updateUnitOfMeasurementSystem = (req: Request, res: Response) => {

  const unitOfMeasurementSystem = req.body;
  let unitOfMeasurementSystemId = req.params.unitOfMeasurementSystemId;
  if (!unitOfMeasurementSystem && !unitOfMeasurementSystemId && unitOfMeasurementSystem.unitOfMeasurementSystemId) {
    return res.status(400).send({
      message: "Unit Of Measurement System nor \"unitOfMeasurementSystemId\" can not be empty"
    });
  }

  let headerOptions = HeaderBaseOptions.create(req);

  unitOfMeasurementSystemOrchestrator.updateUnitOfMeasurementSystem(unitOfMeasurementSystem, headerOptions)
  .subscribe(affect => {
    if (affect.affected > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(affect));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404);
      res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementSystemId}));
    }
  }, error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};


export let deleteUnitOfMeasurementSystem = (req: Request, res: Response) => {

  let headerOptions = HeaderBaseOptions.create(req);
  let ownerPartyId = headerOptions['Owner-Party-ID'];

  let unitOfMeasurementSystemId = req.params.unitOfMeasurementSystemId;
  if (!unitOfMeasurementSystemId) {
    return res.status(400).send({message: "Require \"unitOfMeasurementSystemId\"."});
  }

  unitOfMeasurementSystemOrchestrator.deleteUnitOfMeasurementSystem(unitOfMeasurementSystemId, ownerPartyId.toString(), headerOptions)
    .subscribe(affect => {
      if (affect.affected > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(affect));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + unitOfMeasurementSystemId}));
      }
    }, error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });

};
