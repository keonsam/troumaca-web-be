import {Request, Response} from "express";
import {AccountOrchestrator} from "./account.orchestrator";
import {User} from "./user/user";
import {Organization} from "./organization/organization";

let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  let sessionId:string = req.cookies["sessionId"];
  accountOrchestrator.saveAccount(req.body.accountType, req.body.user, req.body.organization, sessionId)
    .subscribe(accountResponse => {
        if(accountResponse.created) {
            res.status(201);
            res.send(JSON.stringify(accountResponse));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'Not Saved'}))
        }
    }, error => {
        res.status(400);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};
