import { Request, Response } from "express";
import { DataTypeOrchestrator } from "./data.type.orchestrator";

const dataTypeOrchestrator: DataTypeOrchestrator = new DataTypeOrchestrator();

export let getDataTypes = (req: Request, res: Response) => {

  dataTypeOrchestrator.getDataTypes()
    .subscribe(dataTypes => {
      res.send(JSON.stringify(dataTypes));
    }, error => {
      res.status(500);
      res.send({message: "Error Occurred"});
      console.log(error);
    });

};