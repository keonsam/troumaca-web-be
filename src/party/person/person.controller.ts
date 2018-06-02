import {Request, Response} from "express";
import {PersonOrchestrator} from "./person.orchestrator";
import {shapePersonResponse2} from "./person.response.shaper";

let personOrchestrator:PersonOrchestrator = new PersonOrchestrator();

export let findPerson = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  personOrchestrator.findPerson(searchStr, pageSize)
    .map(value => {
      return shapePersonResponse2("persons", value); //TODO: change to new method
    }).subscribe(persons => {
    let body = JSON.stringify(persons);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};
