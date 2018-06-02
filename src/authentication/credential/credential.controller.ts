import {Request, Response} from "express";
import {CredentialOrchestrator} from './credential.orchestrator';
import {ValidateResponse} from "./validate.response";
import {AuthenticateResponse} from "./authenticate.response";

let credentialOrchestrator:CredentialOrchestrator = new CredentialOrchestrator();

// router.post("/validate-username", function (req, res, next) {
export let isValidUsername = (req: Request, res: Response) => {
  credentialOrchestrator.isValidUsername(req.body)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let isValidEditUsername = (req: Request, res: Response) => {
  let partyId = req.body.partyId;
  let username = req.body.username;
  credentialOrchestrator.isValidEditUsername(partyId, username)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/validate-password", function (req, res, next) {
export let isValidPassword = (req: Request, res: Response) => {
  credentialOrchestrator.isValidPassword(req.body)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/forgot-password", function (req, res, next) {
export let forgotPassword = (req: Request, res: Response) => {
  let username = req.body.username;
  credentialOrchestrator.forgotPassword(username)
    .subscribe((next:ValidateResponse) => {
      res.send(next.valid);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/authenticate", function (req, res, next) {
export let authenticate = (req: Request, res: Response) => {
  let credential = req.body;
  credentialOrchestrator.authenticate(credential)
    .subscribe((authenticateResponse: AuthenticateResponse) => {
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      //res.setHeader('Content-Type', 'application/json');
      if (authenticateResponse && authenticateResponse.session && authenticateResponse.session.sessionId) {
        let sessionId = authenticateResponse.session.sessionId;
        // { path: '/', httpOnly: true, secure: false, maxAge: null }
        res.cookie("sessionId", sessionId, {path: '/', maxAge: 20*60*1000, httpOnly: true });
      }
      res.send(JSON.stringify(authenticateResponse.toJson()));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/", function (req, res, next) {
export let addCredential = (req: Request, res: Response) => {
  let credential = req.body;
  let opt = {correlationId:req.headers["correlationid"]};
  credentialOrchestrator.addCredential(credential, opt)
    .subscribe(credentialConfirmation => {
      res.setHeader('Content-Type', 'application/json');
      res.send(credentialConfirmation);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let updateCredential = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let credential = req.body;
  credentialOrchestrator
    .updateCredential(partyId, credential)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

