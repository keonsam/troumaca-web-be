import { Request, Response } from "express";
import { PersonProfileOrchestrator } from "./person.profile.orchestrator";
// import { shapePersonResponse2 } from "../person.profile.response.shaper";

const personProfileOrchestrator: PersonProfileOrchestrator = new PersonProfileOrchestrator();

export let createPersonProfile = (req: Request, res: Response) => {

  const personProfile = req.body;
  const headers = req.headers;
  const correlationId = headers.correlationid;

  let options = {
    correlationId: correlationId
  };

  personProfileOrchestrator.createProfilePerson(personProfile, options)
  .map(value => {
    // TODO: change to new method
    // return shapePersonResponse2("persons", value);
    return value;
  }).subscribe(persons => {
    const body = JSON.stringify(persons);
    res.setHeader("content-type", "application/json");
    res.status(200);
    res.send(body);
  }, error => {
    console.log("Error: " + JSON.stringify(error));

    let status = 500;
    if (error.code) { status = error.code; }
    if (error.status) { status = error.status; }

    res.setHeader("content-type", "application/json");
    res.status(status);
    res.send(JSON.stringify(error));
  });

};

export let findPerson = (req: Request, res: Response) => {

  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  personProfileOrchestrator.findPerson(searchStr, pageSize)
  .map(value => {
    // TODO: change to new method
    // return shapePersonResponse2("persons", value);
    return value;
  }).subscribe(persons => {
    const body = JSON.stringify(persons);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};
