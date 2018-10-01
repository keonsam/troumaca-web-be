import { Request, Response } from "express";
import { CredentialOrchestrator } from "./credential.orchestrator";
import { AuthenticatedCredential } from "../../data/authentication/authenticated.credential";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

// TODO: Consider removing
// router.post("/validate-username", function (req, res, next) {
export let isValidUsername = (req: Request, res: Response) => {

  const username = req.body.username;
  const partyId = req.body.partyId;

  if (!username) {
    return res.status(400).send({message: "Username can not be empty"});
  }

  credentialOrchestrator.isValidUsername(username, partyId)
  .subscribe((next: boolean) => {
    res.status(200);
    const resp = {valid: next};
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(resp));
  }, error => {
    res.status(500);
    res.send(JSON.stringify({message: "Internal Server Error"}));
    console.log(error);
  });

};

export let isValidPassword = (req: Request, res: Response) => {

  if (!req.body) {
      return res.status(400).send({message: "Password can not be empty"});
  }

  credentialOrchestrator.isValidPassword(req.body)
  .subscribe((next: boolean) => {
      res.status(200);
      const resp = {valid: next};
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(resp));
  }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Internal Server Error"}));
      console.log(error);
  });

};

export let addCredential = (req: Request, res: Response) => {

  const correlationId = req.headers.correlationid;

  if (!correlationId) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
      return;
  }

  const createCredential = req.body;
  if (!createCredential) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "No \"credential\" exists. Credential can not be empty."}));
      return;
  }

  if (!createCredential.username || createCredential.username.length <= 0) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"username\" is required."}));
      return;
  }

  if (!createCredential.password || createCredential.password.length <= 0) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"password\" is required."}));
      return;
  }

  const headerOptions = {
      correlationId: correlationId
  };

  credentialOrchestrator.addCredential(createCredential, headerOptions)
  .subscribe(createdCredential => {
      res.status(201);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(createdCredential.confirmation));
  }, error => {
    res.status(!error.code ? 500 : error.code);
    let msg = !error.message ? "Internal Server Error" : error.message;
    res.send(JSON.stringify(msg));
    console.log(error);
  });

};

export let authenticate = (req: Request, res: Response) => {

  const credential = req.body;

  if (!req.body) {
      return res.status(400).send({message: "Authenticate can not be empty"});
  }

  const correlationId = req.headers.correlationid;

  if (!correlationId) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
      return;
  }

  const headerOptions = {
      correlationId: correlationId,
      sourceSystemHost: req.headers.host,
      sourceSystemName: ""
  };

  credentialOrchestrator.authenticate(credential, headerOptions)
  .subscribe((authenticatedCredential: AuthenticatedCredential) => {
      console.log(authenticatedCredential);
      if (authenticatedCredential.sessionId) {
          res.cookie("sessionId", authenticatedCredential.sessionId, {path: "/", maxAge: 20 * 60 * 1000, httpOnly: true });
      }
      const body = JSON.stringify(authenticatedCredential.toJson());
      res.status(200);
      res.send(body);
  }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
  });

};

// router.post("/forgot-password", function (req, res, next) {
// export let forgotPassword = (req: Request, res: Response) => {
//   let username = req.body.username;
//   if (!req.body) {
//     return res.status(400).send({message: "Username can not be empty"});
//   }
//
//   credentialOrchestrator.forgotPassword(username)
//     .subscribe((next:ValidateResponse) => {
//       res.status(200);
//       res.send(next.valid);
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: 'Error Occurred'}));
//       console.log(error);
//     });
// };

// router.post("/", function (req, res, next) {

// export let updateCredential = (req: Request, res: Response) => {
//   let partyId = req.params.partyId;
//   let credential = req.body;
//   if (!req.body) {
//     return res.status(400).send({message: "Credential can not be empty"});
//   }
//
//   credentialOrchestrator
//     .updateCredential(partyId, credential)
//     .subscribe(affected => {
//       if (affected > 0) {
//         res.status(200);
//         res.send(JSON.stringify(affected));
//       } else {
//         res.status(404);
//         res.send(JSON.stringify({message: 'No Data Found For ' + req.params.partyId}));
//       }
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: 'Error Occurred'}));
//       console.log(error);
//     });
// };

// export let deleteCredential = (req: Request, res: Response) => {
//   let credentialId:string = req.params.credentialId;
//
//   if (!credentialId) {
//     return res.status(400).send({message: "Credential Id can not be empty"});
//   }
//
//   let corId = req.headers["correlationid"];
//
//   if (!corId) {
//     return res.status(400).send({message: "Correlation Id can not be empty"});
//   }
//
//   let options = {correlationId:req.headers["correlationid"]};
//
//   credentialOrchestrator
//   .deleteCredential(credentialId, options)
//   .subscribe(affected => {
//     if (affected) {
//       res.status(200);
//       res.send(JSON.stringify(affected));
//     } else {
//       res.status(404);
//       res.send(JSON.stringify({message: 'No Data Found For ' + credentialId}));
//     }
//   }, error => {
//     res.status(500);
//     res.send(JSON.stringify({message: 'Error Occurred'}));
//     console.log(error);
//   });
//
// };

