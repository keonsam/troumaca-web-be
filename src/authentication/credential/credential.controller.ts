import {Request, Response} from "express";
import {CredentialOrchestrator} from "./credential.orchestrator";
import {AuthenticatedCredential} from "../../data/authentication/authenticated.credential";
import {Credential} from "../../data/authentication/credential";
import {HeaderNormalizer} from "../../header.normalizer";

const credentialOrchestrator: CredentialOrchestrator = new CredentialOrchestrator();

export let getCredential = (req: Request, res: Response) => {
    res.setHeader("content-type", "application/json");
    const correlationId = req.headers.correlationid;
    const partyId = req.params.partyId;

    const headerOptions = {
        correlationId: correlationId
    };
    // credentialOrchestrator.getCredentialByPartyId(partyId, headerOptions)
    //     .subscribe( user => {
    //         if (user) {
    //             res.status(200);
    //             res.send(JSON.stringify(user));
    //         } else {
    //             res.status(404);
    //             res.setHeader("content-type", "application/json");
    //             res.send(JSON.stringify({message: "No Registered Credential Found."}));
    //         }
    //     }, error => {
    //         res.status(!error.code ? 500 : error.code);
    //         const msg = !error.message ? "Internal Server Error" : error.message;
    //         res.send(JSON.stringify(msg));
    //         console.log(error);
    //     });
};

export let isValidUsername = (req: Request, res: Response) => {

  const username = req.body.username;
  const partyId = req.body.partyId;

  if (!username) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "Username can not be empty."}));
    return;
  }

  credentialOrchestrator.isValidUsername(username, partyId)
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

  const password: string = req.body.password;

  if (!password) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "A password must exist."}));
    return;
  }

  credentialOrchestrator.isValidPassword(password)
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

    const credential: Credential = req.body;

    if (!credential || !credential.username) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "'Credential' contain username."}));
        return;
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

export let updateCredential = (req: Request, res: Response) => {
    // here is the weird thing about this api
    // because you don't need to be login to used this route
    // anyone that has access to your partyId can change your username or password
    // in general terms this would not change your username

    const correlationId = req.headers.correlationid;
    const credential = req.body.credential;
    const user = req.body.user;
    const partyId = req.params.partyId;

    if (!correlationId) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
        return;
    }

    if (!credential || !credential.password) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "'Credential' must be sent, and must contain a password."}));
        return;
    }

    if (!user || !user.firstName || !user.lastName) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "'User' must be sent, and contain first and last name."}));
        return;
    }

    const headerOptions = {
        correlationId: correlationId
    };

    credentialOrchestrator.updateCredential(credential, user,  partyId, headerOptions)
        .subscribe(confirmation => {
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(confirmation));
        }, error => {
            res.status(!error.code ? 500 : error.code);
            const msg = !error.message ? "Internal Server Error" : error.message;
            res.send(JSON.stringify(msg));
            console.log(error);
        });

};