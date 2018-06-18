import {Request, Response} from "express";
import {UnitOfMeasureOrchestrator} from "./unit.of.measure.orchestrator";

let unitOfMeasureOrchestrator: UnitOfMeasureOrchestrator = new UnitOfMeasureOrchestrator();

export let findUnitOfMeasure = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  unitOfMeasureOrchestrator.findUnitOfMeasure(searchStr,pageSize)
    .subscribe(unitOfMeasures => {
    let body = JSON.stringify(unitOfMeasures);
    res.status(200);
    res.send(body);
  }, error => {
      res.status(500);
    res.send(JSON.stringify({message: 'Error Occurred'}));
    console.log(error);
  });

};
