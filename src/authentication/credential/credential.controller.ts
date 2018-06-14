import {Request, Response} from "express";
import {CredentialOrchestrator} from './credential.orchestrator';
import {ValidateResponse} from "./validate.response";
import {AuthenticateResponse} from "./authenticate.response";

let credentialOrchestrator:CredentialOrchestrator = new CredentialOrchestrator();

// router.post("/validate-username", function (req, res, next) {
export let isValidUsername = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }
  credentialOrchestrator.isValidUsername(req.body)
    .subscribe((next:ValidateResponse) => {
        res.status(200);
        res.send(next.valid);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let isValidEditUsername = (req: Request, res: Response) => {
  let partyId = req.body.partyId;
  let username = req.body.username;
    if (!req.body) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }
  credentialOrchestrator.isValidEditUsername(partyId, username)
    .subscribe((next:ValidateResponse) => {
        res.status(200);
        res.send(next.valid);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

// router.post("/validate-password", function (req, res, next) {
export let isValidPassword = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }
  credentialOrchestrator.isValidPassword(req.body)
    .subscribe((next:ValidateResponse) => {
        res.status(200);
        res.send(next.valid);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

// router.post("/forgot-password", function (req, res, next) {
export let forgotPassword = (req: Request, res: Response) => {
  let username = req.body.username;
    if (!req.body) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }
  credentialOrchestrator.forgotPassword(username)
    .subscribe((next:ValidateResponse) => {
        res.status(200);
        res.send(next.valid);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

// router.post("/authenticate", function (req, res, next) {
export let authenticate = (req: Request, res: Response) => {
  let credential = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Authenticate can not be empty"
        });
    }
  credentialOrchestrator.authenticate(credential)
    .subscribe((authenticateResponse: AuthenticateResponse) => {
      if (authenticateResponse && authenticateResponse.session && authenticateResponse.session.sessionId) {
        let sessionId = authenticateResponse.session.sessionId;
        // { path: '/', httpOnly: true, secure: false, maxAge: null }
        res.cookie("sessionId", sessionId, {path: '/', maxAge: 20*60*1000, httpOnly: true });
      }
      res.status(200);
      res.send(JSON.stringify(authenticateResponse.toJson()));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

// router.post("/", function (req, res, next) {
export let addCredential = (req: Request, res: Response) => {
  let credential = req.body;
  let opt = {correlationId:req.headers["correlationid"]};
    if (!req.body) {
        return res.status(400).send({
            message: "Credential can not be empty"
        });
    }
  credentialOrchestrator.addCredential(credential, opt)
    .subscribe(credentialConfirmation => {
        res.status(201);
        res.send(JSON.stringify(credentialConfirmation));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateCredential = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let credential = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Credential can not be empty"
        });
    }
  credentialOrchestrator
    .updateCredential(partyId, credential)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For ' + req.params.partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

