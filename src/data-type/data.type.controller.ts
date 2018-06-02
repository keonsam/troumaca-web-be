import {Request, Response} from "express";
import {DataTypeOrchestrator} from "./data.type.orchestrator";

let dataTypeOrchestrator:DataTypeOrchestrator = new DataTypeOrchestrator();

export let getDataTypes = (req: Request, res: Response) => {

  dataTypeOrchestrator.getDataTypes()
    .subscribe(dataTypes => {
      res.send(JSON.stringify(dataTypes));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });

};