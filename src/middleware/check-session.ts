import { NextFunction, Request, Response } from "express";
import { SessionOrchestrator } from "../session/session.orchestrator";
import {MiddlewareError} from "./middleware-error";

const checkSession = (req: Request, res: Response, next: NextFunction) => {

  const sessionOrchestrator = new SessionOrchestrator();

  checkSessionValidity(req, function (err: Error, validSession: boolean) {
    if (err || !validSession) {
        res.status(440);
        res.send("Invalid session...");
    } else {
        next();
    }
  });

<<<<<<< HEAD
  function checkSession(req: Request, callback: (err: Error, validSession: boolean) => void) {
    const sessionId: string =  req.cookies["sessionId"];
=======
  function checkSessionValidity(req: Request, callback: (err:Error, validSession:boolean) => void) {
    const cookies: any = req.cookies;
    const sessionId: string = cookies["sessionId"];
>>>>>>> 1cf9f8160a94ab96d834d644f090fee024f9cf22
    sessionOrchestrator
      .isValidSession(sessionId)
      .subscribe(isValid => {
        if (isValid) {
          callback(undefined, true);
        } else {
<<<<<<< HEAD
          const e: Error = new Error("Invalid session...");
=======
          var e:Error = new MiddlewareError("Invalid session...");
>>>>>>> 1cf9f8160a94ab96d834d644f090fee024f9cf22
          callback(e, false);
        }
      });
  }
};

export default checkSession;
