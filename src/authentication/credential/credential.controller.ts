import {Request, Response} from "express";
import {CredentialOrchestrator} from "./credential.orchestrator";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Credential} from "../../data/authentication/credential";
import {HeaderNormalizer} from "../../header.normalizer";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

export let isValidUsername = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const username = req.body.username;

  if (!username) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "Username can not be empty."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.isValidUsername(username, headerOptions)
    .subscribe((next: boolean) => {
      res.status(200);
      const resp = {valid: next};
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(resp));
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Internal Server Error"}));
      console.log(error);
    });

};

export let isValidPassword = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const password: string = req.body.password;

  if (!password) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A password must exist."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.isValidPassword(password, headerOptions)
    .subscribe((next: boolean) => {
      res.status(200);
      const resp = {valid: next};
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(resp));
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Internal Server Error"}));
      console.log(error);
    });

};

export let addCredential = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const credential = req.body.credential;
  const person = req.body.user;

  if (!correlationId) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  if (!credential || !credential.username || !credential.password) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "'Credential' must be sent, and must contain username and password."}));
    return;
  }

  if (!person || !person.firstName || !person.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "'User' must be sent, and contain first and last name."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.addCredential(credential, person, headerOptions)
    .subscribe(confirmation => {
      res.status(201);
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(confirmation));
    }, error => {
      res.status(!error.code ? 500 : error.code);
      const msg = !error.message ? "Internal Server Error" : error.message;
      res.send(JSON.stringify(msg));
      console.log(error);
    });

};

export let authenticate = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const credential: Credential = req.body;

  if (!credential || !credential.username || !credential.password) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "'Credential' must be sent, and must contain username and password."}));
    return;
  }

  if (!correlationId) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.authenticate(credential, headerOptions)
  .subscribe((authenticatedCredential: AuthenticatedCredential) => {
    if (authenticatedCredential && authenticatedCredential.sessionId) {
      res.cookie("sessionId", authenticatedCredential.sessionId, {
        path: "/",
        maxAge: 20 * 60000,
        httpOnly: true
      });
    }
    const body = JSON.stringify(authenticatedCredential);
    res.status(200);
    res.setHeader("content-type", "application/json");
    res.send(body);
  }, error => {
    res.status(500);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "Internal Occurred"}));
    console.log(error);
  });

};

export let forgetPassword = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const credential: Credential = req.body;

  if (!credential || !credential.username) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "'Credential' contain username."}));
      return;
  }

  if (!correlationId) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
      return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.forgetPassword(credential, headerOptions)
  .subscribe(confirmation => {
    if (confirmation && confirmation.confirmationId) {
      const body = JSON.stringify(confirmation);
      res.status(201);
      res.setHeader("content-type", "application/json");
      res.send(body);
  } else {
      const body = JSON.stringify(confirmation);
      res.status(404);
      res.setHeader("content-type", "application/json");
      res.send(body);
    }
  }, error => {
    res.status(500);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "Internal Occurred"}));
    console.log(error);
  });

};

export let changePassword = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const changePassword = req.body;

  // if (!changePassword || !changePassword.username) {
  //   res.status(400);
  //   res.setHeader("content-type", "application/json");
  //   res.send(JSON.stringify({message: "'Credential' contain username."}));
  //   return;
  // }

  if (!correlationId) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  credentialOrchestrator.changePassword(changePassword, headerOptions)
    .subscribe(changedPassword => {
      const body = JSON.stringify(changedPassword);
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.send(body);
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Internal Occurred"}));
      console.log(error);
    });

};
