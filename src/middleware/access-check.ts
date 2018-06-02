import {NextFunction, Request, Response} from "express";
import {SessionOrchestrator} from "../session/session.orchestrator";

let checkAccess = (req: Request, res: Response, next: NextFunction) => {

  const sessionOrchestrator = new SessionOrchestrator();

  // GET 'http://www.example.com/admin/new'
  // console.log(req.originalUrl); // '/admin/new'
  // console.log(req.baseUrl); // '/admin'
  // console.log(req.path); // '/new'

  let dev:boolean = true;
  // TODO: move this to its own file
  let openPaths:Array<string> = [
    '/sessions/is-valid-session',
    '/send-confirmation-codes',
    '/get-confirmations-username',
    '/verify-credentials-confirmations',
    '/forgot-password',
    '/authenticate',
    '/validate-edit-username',
    '/validate-username',
    '/validate-password',
    '/credentials'
  ];

  // dev mode > no session id > view open page
  // dev mode > no session id > view close page
  // dev mode > session id > view open page
  // dev mode > session id > view close page

  // production mode > no session id > view open page
  // production mode > no session id > view close page
  // production mode > session id > view open page
  // production mode > session id > view close page

  function isNotSecureEndPoint(originalPath:string) {
    // if (dev) {
    //   return true;
    // }
    // this limit the url if you can think of a better regex let me know
    // let testRegex = /\/[a-z-]*\/[a-z-]*\/[a-z-]*/gi; // test the string not a pro
    // let matchRegex = /\/[a-z-]*\/[a-z-]*\//gi; // not good with regex if you can fix this that will be great
    let matchRegex = /\/[a-z-]*\//gi;
    if(originalPath.indexOf("send-confirmation-codes") !== -1 || originalPath.indexOf("get-confirmations-username") !== -1 ) {
      originalPath = originalPath.match(matchRegex)[0].slice(0, -1);
    }

    if(openPaths.indexOf(originalPath) !== -1) {
      return true;
    }else {
      return false;
    }
  }

  // function isMode() {
  //
  // }
   // probably because the this is invoke or it don't have req, res, and next
  // return function(/*req:Request, res:Response, next:NextFunction*/) {
    let cookies:any = req.cookies;
    let sessionId:string = cookies["sessionId"];
    let originalUrl = req.originalUrl;
    // if requesting an open page do nothing
    if (isNotSecureEndPoint(originalUrl)) {
      next();
    } else if (sessionId) {
      sessionOrchestrator
        .isValidSession(sessionId)
        .subscribe(isValid => {
          if (isValid) {
            next();
          } else {
            res.status(440);
            res.send("Invalid session...");
          }
        });
    } else {
      res.status(401);
      res.send( "Cannot access this resource without a session...");
    }
  //};
};

export default checkAccess;
