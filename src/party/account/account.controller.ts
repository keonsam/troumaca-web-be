// import {Request, Response} from "express";
// import {AccountOrchestrator} from "./account.orchestrator";
//
// let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();
//
// export  let saveAccount = (req: Request, res: Response) => {
//   let account = req.body;
//   console.log(req.cookies);
//   let cookie = req.cookies["sessionId"];
//   console.log(cookie);
//   let sessionId:string = "d845ced1-9990-4692-b2fe-6b62999a669f";
//   accountOrchestrator.saveAccount(account, sessionId)
//     .subscribe(account => {
//       res.send(JSON.stringify(account));
//     });
// };
