import {Request, Response} from 'express'
import {SessionOrchestrator} from './session.orchestrator'

let sessionOrchestrator:SessionOrchestrator = new SessionOrchestrator();

export let getSimpleSession = (req: Request, res: Response) => {
  let sessionId = req.cookies["sessionId"];
  sessionOrchestrator.getSimpleSession(sessionId)
    .subscribe(next => {
      res.status(200);
      res.send(JSON.stringify(next));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let getPartyId = (req: Request, res: Response) => {
  let sessionId = req.cookies["sessionId"];
  sessionOrchestrator.getSimpleSession(sessionId)
    .subscribe(next => {
      res.status(200);
      res.send(JSON.stringify(next.partyId));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let isValidSession = (req: Request, res: Response) => {
  let sessionId = req.cookies["sessionId"];
  sessionOrchestrator.isValidSession(sessionId)
    .subscribe(next => {
      res.status(200);
      res.send(JSON.stringify(next));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let handleSessionLogOut = (req: Request, res: Response) => {
  let sessionId = req.cookies["sessionId"];
  sessionOrchestrator.handleSessionLogOut(sessionId)
    .subscribe(next => {
      res.status(200);
      res.send(JSON.stringify(next));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};
