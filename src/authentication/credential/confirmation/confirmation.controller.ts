import {Response, Request, NextFunction} from 'express';
import {ConfirmationOrchestrator} from "./confirmation.orchestrator";

let confirmationOrchestrator:ConfirmationOrchestrator = new ConfirmationOrchestrator();

// router.post("/verify-credentials-confirmations", function (req, res, next) {
export let verifyCredentialConfirmation = (req: Request, res: Response) => {
  let credentialConfirmation = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Confirmation can not be empty"
        });
    }
  confirmationOrchestrator.verifyCredentialConfirmation(credentialConfirmation)
    .subscribe(next => {
      res.status(200);
      res.send(next);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });
};

export let confirmCode = (req: Request, res: Response) => {
  // let credential = req.body;

  // if (!req.body) {
  //   return res.status(400).send({message: "Confirmation can not be empty"});
  // }

  let correlationId = req.headers.correlationid;

  if (!correlationId) {
    res.status(400);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  let confirmationId = req.params.confirmationId;
  let credentialId = req.params.credentialId;

  let headerOptions = {
    correlationId: correlationId,
    sourceSystemHost: req.headers.host,
    sourceSystemName: ""
  };

  confirmationOrchestrator
    .confirmCode(confirmationId, credentialId, headerOptions)
    .subscribe(next => {
      res.status(200);
      res.send(next);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });

};

export let resendConfirmCode = (req: Request, res: Response) => {
  // let credential = req.body;

  // if (!req.body) {
  //   return res.status(400).send({message: "Confirmation can not be empty"});
  // }

  let correlationId = req.headers.correlationid;

  if (!correlationId) {
    res.status(400);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
    return;
  }

  let confirmationId = req.params.confirmationId;
  let credentialId = req.params.credentialId;

  let headerOptions = {
    correlationId: correlationId,
    sourceSystemHost: req.headers.host,
    sourceSystemName: ""
  };

  confirmationOrchestrator
    .resendConfirmCode(confirmationId, credentialId, headerOptions)
    .subscribe(next => {
      res.status(200);
      res.send(next);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: 'Error Occurred'}));
      console.log(error);
    });

};

// router.get("/send-confirmation-codes/phone/:confirmationId", function (req, res, next) {
export let sendPhoneVerificationCode = (req: Request, res: Response) => {
  let confirmationId = req.params.confirmationId;
  confirmationOrchestrator.sendPhoneVerificationCode(confirmationId)
    .subscribe(credentialConfirmation => {
      if (credentialConfirmation) {
          res.status(200);
          res.send(JSON.stringify(credentialConfirmation));
      } else {
          res.status(404);
          res.send(JSON.stringify({message: 'No Data Found For ' + req.params.confirmationId}));
      }
    }, error => {
      res.status(500);
      res.send(error);
      console.log(error);
    });
};

export let getConfirmationsUsername = (req: Request, res: Response) => {
  let credentialConfirmationId = req.params.credentialConfirmationId;
  confirmationOrchestrator.getConfirmationsUsername(credentialConfirmationId)
    .subscribe(username => {
      if (username) {
          res.status(200);
          res.send(JSON.stringify(username));
      }else {
        res.status(404);
        res.send(JSON.stringify({message: 'No Data Found For ' + req.params.credentialConfirmationId}));
      }
    }, error => {
      res.status(500);
      res.send(error);
      console.log(error);
    });
};

// router.get("/send-confirmation-codes/email/:confirmationId", function (req, res, next) {
// export let sendEmailVerificationCode = (req: Request, res: Response) => {
//   let confirmationId = req.params.confirmationId;
//   confirmationOrchestrator.sendEmailVerificationCode(confirmationId)
//     .subscribe(credentialConfirmation => {
//       res.send(JSON.stringify(credentialConfirmation));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
// };
