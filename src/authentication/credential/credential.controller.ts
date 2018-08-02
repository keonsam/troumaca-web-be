import {Request, Response} from "express";
import {CredentialOrchestrator} from './credential.orchestrator';
import {ValidateResponse} from "./validate.response";
import {AuthenticateResponse} from "./authenticate.response";
import { AuthenticatedCredential } from "./authenticated.credential";

let credentialOrchestrator:CredentialOrchestrator = new CredentialOrchestrator();

// TODO: Consider removing
// router.post("/validate-username", function (req, res, next) {
export let isValidUsername = (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).send({message: "Username can not be empty"});
  }

  credentialOrchestrator.isValidUsername(req.body)
    .subscribe((next:boolean) => {
      res.status(200);
      let resp = {valid: next};
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(resp));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let isValidPassword = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({message: "Password can not be empty"});
    }

    credentialOrchestrator.isValidPassword(req.body)
        .subscribe((next:boolean) => {
            res.status(200);
            let resp = {valid:next};
            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify(resp));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

export let addCredential = (req: Request, res: Response) => {

    let correlationId = req.headers.correlationid;

    console.log(correlationId);
    console.log(req.headers);
    console.log(req.body);

    if (!correlationId) {
        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
        return;
    }

    let credential = req.body;
    if (!credential) {
        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({message: "No \"credential\" exists. Credential can not be empty."}));
        return;
    }

    if (!credential.username || credential.username.length <= 0) {
        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({message: "A \"username\" is required."}));
        return;
    }

    if (!credential.password || credential.password.length <= 0) {
        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({message: "A \"password\" is required."}));
        return;
    }

    let headerOptions = {
        correlationId: correlationId,
        sourceSystemHost: req.headers.host,
        sourceSystemName: ""
    };

    credentialOrchestrator.addCredential(credential, headerOptions)
        .subscribe(credentialConfirmation => {
            res.status(201);
            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify(credentialConfirmation));
        }, error => {
            res.status(500);
            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });

};

export let authenticate = (req: Request, res: Response) => {
    let credential = req.body;

    if (!req.body) {
        return res.status(400).send({message: "Authenticate can not be empty"});
    }

    let correlationId = req.headers.correlationid;

    if (!correlationId) {
        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
        return;
    }

    let headerOptions = {
        correlationId: correlationId,
        sourceSystemHost: req.headers.host,
        sourceSystemName: ""
    };

    credentialOrchestrator.authenticate(credential, headerOptions)
        .subscribe((authenticatedCredential: AuthenticatedCredential) => {
            if (authenticatedCredential.sessionId) {
                res.cookie("sessionId", authenticatedCredential.sessionId, {path: '/', maxAge: 20*60*1000, httpOnly: true });
            }
            const body = JSON.stringify(authenticatedCredential);
            res.status(200);
            res.send(body);
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};

// TODO: Consider removing
// export let isValidEditUsername = (req: Request, res: Response) => {
//   let partyId = req.body.partyId;
//   let username = req.body.username;
//   if (!req.body) {
//     return res.status(400).send({message: "Username can not be empty"});
//   }
//
//   credentialOrchestrator.isValidEditUsername(partyId, username)
//     .subscribe((next:ValidateResponse) => {
//         res.status(200);
//         res.send(next.valid);
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: 'Error Occurred'}));
//       console.log(error);
//     });
// };

// router.post("/validate-password", function (req, res, next) {

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

// router.post("/authenticate", function (req, res, next) {

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

