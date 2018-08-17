import { Request, Response } from "express";
import { AccountOrchestrator } from "./account.orchestrator";

const accountOrchestrator: AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  const sessionId: string = req.cookies["sessionId"];

  if (!sessionId) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"sessionId\" is required."}));
      return;
  }

  if (!req.body.user) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "No \"user\" exists. User can not be empty."}));
      return;
  }

  accountOrchestrator.saveAccount(req.body.user, req.body.organization, sessionId)
    .subscribe(accountResponse => {
        res.status(201);
        res.send(JSON.stringify(accountResponse));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};
