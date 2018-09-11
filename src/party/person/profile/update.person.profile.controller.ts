import { Request, Response } from "express";
import { UpdatePersonProfileOrchestrator } from "./person.profile.orchestrator";
import { shapePersonResponse2 } from "./person.profile.response.shaper";

const personProfileOrchestrator: UpdatePersonProfileOrchestrator = new UpdatePersonProfileOrchestrator();

export let findPerson = (req: Request, res: Response) => {
  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  personProfileOrchestrator.findPerson(searchStr, pageSize)
    .map(value => {
      return shapePersonResponse2("persons", value); // TODO: change to new method
    }).subscribe(persons => {
    const body = JSON.stringify(persons);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};
