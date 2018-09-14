import { NextFunction, Request, Response } from "express";
import { SessionOrchestrator } from "../session/session.orchestrator";

const checkSession = (req: Request, res: Response, next: NextFunction) => {

  const sessionOrchestrator = new SessionOrchestrator();

  checkSession(req, function (err: Error, validSession: boolean) {
    if (err || !validSession) {
      res.status(440);
      res.send("Invalid session...");
    }

    next();
  });

  function checkSession(req: Request, callback: (err:Error, validSession:boolean) => void) {
    const cookies: any = req.cookies;
    const sessionId: string = cookies["sessionId"];
    sessionOrchestrator
      .isValidSession(sessionId)
      .subscribe(isValid => {
        if (isValid) {
          callback(null, true);
        } else {
          var e:Error = new Error("Invalid session...");
          callback(e, false);
        }
      });
  }
};

export default checkSession;
