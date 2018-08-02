import { Request, Response } from "express";
import { AccountOrchestrator } from "./account.orchestrator";

const accountOrchestrator: AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  const sessionId: string = req.cookies["sessionId"];
  accountOrchestrator.saveAccount(req.body.accountType, req.body.user, req.body.organization, sessionId)
    .subscribe(accountResponse => {
        res.status(201);
        res.send(JSON.stringify(accountResponse));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};
