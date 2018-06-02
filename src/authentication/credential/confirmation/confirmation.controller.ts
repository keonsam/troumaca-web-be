import {Response, Request, NextFunction} from 'express';
import {ConfirmationOrchestrator} from "./confirmation.orchestrator";

let confirmationOrchestrator:ConfirmationOrchestrator = new ConfirmationOrchestrator();

// router.post("/verify-credentials-confirmations", function (req, res, next) {
export let verifyCredentialConfirmation = (req: Request, res: Response) => {
  let credentialConfirmation = req.body;
  confirmationOrchestrator.verifyCredentialConfirmation(credentialConfirmation)
    .subscribe(next => {
      res.send(next);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.get("/send-confirmation-codes/phone/:confirmationId", function (req, res, next) {
export let sendPhoneVerificationCode = (req: Request, res: Response) => {
  let confirmationId = req.params.confirmationId;
  confirmationOrchestrator.sendPhoneVerificationCode(confirmationId)
    .subscribe(credentialConfirmation => {
      res.send(JSON.stringify(credentialConfirmation));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let getConfirmationsUsername = (req: Request, res: Response) => {
  let credentialConfirmationId = req.params.credentialConfirmationId;
  confirmationOrchestrator.getConfirmationsUsername(credentialConfirmationId)
    .subscribe(username => {
      res.send(JSON.stringify(username));
    }, error => {
      res.status(400);
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
