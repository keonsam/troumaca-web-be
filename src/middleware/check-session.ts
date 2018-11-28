import {NextFunction, Request, Response} from "express";
import {SessionOrchestrator} from "../session/session.orchestrator";

const checkSession = (req: Request, res: Response, next: NextFunction) => {

  const sessionOrchestrator = new SessionOrchestrator();

  checkSession(req, function (err: Error, validSession: boolean) {
    if (err || !validSession) {
      res.status(440);
      res.send("Invalid session...");
      return;
    } else {
      next();
    }
  });

  function checkSession(req: Request, callback: (err: Error, validSession: boolean) => void) {
    const sessionId: string = req.cookies["sessionId"];
    sessionOrchestrator
      .isValidSession(sessionId)
      .subscribe(isValid => {
        if (isValid) {
          req.headers["Party-Id"] = isValid.partyId;
          // remove below after converting
          res.locals.partyId = isValid.partyId;
          callback(undefined, true);
        } else {
          const e: Error = new Error("Invalid session...");
          callback(e, false);
          return;
        }
      });
  }
};

export default checkSession;
