import {Request, Response} from "express";
import {UnitOfMeasureOrchestrator} from "./unit.of.measure.orchestrator";

let unitOfMeasureOrchestrator: UnitOfMeasureOrchestrator = new UnitOfMeasureOrchestrator();

export let findUnitOfMeasure = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  unitOfMeasureOrchestrator.findUnitOfMeasure(searchStr,pageSize)
    .map(value => {
      return value // upgraded to new method
    }).subscribe(unitOfMeasures => {
    let body = JSON.stringify(unitOfMeasures);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};
