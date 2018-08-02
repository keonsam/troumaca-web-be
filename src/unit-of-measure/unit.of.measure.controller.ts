import { Request, Response } from "express";
import { UnitOfMeasureOrchestrator } from "./unit.of.measure.orchestrator";

const unitOfMeasureOrchestrator: UnitOfMeasureOrchestrator = new UnitOfMeasureOrchestrator();

export let findUnitOfMeasure = (req: Request, res: Response) => {
  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  unitOfMeasureOrchestrator.findUnitOfMeasure(searchStr, pageSize)
    .subscribe(unitOfMeasures => {
    const body = JSON.stringify(unitOfMeasures);
    res.status(200);
    res.send(body);
  }, error => {
      res.status(500);
    res.send(JSON.stringify({message: "Error Occurred"}));
    console.log(error);
  });

};
