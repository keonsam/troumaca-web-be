import { NextFunction, Request, Response } from "express";
import { SessionOrchestrator } from "../session/session.orchestrator";

const checkSession = (req: Request, res: Response, next: NextFunction) => {

  const sessionOrchestrator = new SessionOrchestrator();

    checkSession(req, function (err: Error, validSession: boolean) {
    if (err || !validSession) {
        res.status(440);
        res.send("Invalid session...");
    } else {
        next();
    }
  });

  function checkSession(req: Request, callback: (err: Error, validSession: boolean) => void) {
    const sessionId: string =  req.cookies["sessionId"];
    sessionOrchestrator
      .isValidSession(sessionId)
      .subscribe(isValid => {
        if (isValid) {
          callback(undefined, true);
        } else {
          const e: Error = new Error("Invalid session...");
          callback(e, false);
        }
      });
  }
};

export default checkSession;
