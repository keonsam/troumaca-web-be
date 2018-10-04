import { Response, Request } from "express";
import { ConfirmationOrchestrator } from "./confirmation.orchestrator";
import { Confirmation } from "../../../data/authentication/confirmation";

const confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();

export let resendConfirmCode = (req: Request, res: Response) => {

    const correlationId = req.headers.correlationid;

    if (!correlationId) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
        return;
    }

    const confirmationId = req.params.confirmationId;
    const credentialId = req.params.credentialId;

    const headerOptions = {
        correlationId: correlationId,
        sourceSystemHost: req.headers.host,
        sourceSystemName: ""
    };

    confirmationOrchestrator
        .resendConfirmCode(confirmationId, credentialId, headerOptions)
        .subscribe(next => {
            const body = JSON.stringify(next);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });

};

export let confirmCode = (req: Request, res: Response) => {

  const confirmation: Confirmation = req.body;

  if (!confirmation || !confirmation.code || !confirmation.confirmationId ||  !confirmation.credentialId) {
      res.status(400);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "'Confirmation' must be sent and have confirmation code, confirmationId and credentialId."}));
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
    correlationId: correlationId
  };

  confirmationOrchestrator
    .confirmCode(confirmation.confirmationId, confirmation.credentialId, confirmation, headerOptions)
    .subscribe(next => {
      const body = JSON.stringify(next);
      res.setHeader("content-type", "application/json");
      res.status(200);
      res.send(body);
    }, error => {
      res.status(!error.code ? 500 : error.code);
      const msg = !error.message ? "Internal Server Error" : error.message;
      res.send(JSON.stringify(msg));
      console.log(error);
    });

};

// export let getConfirmationsUsername = (req: Request, res: Response) => {
//   let credentialConfirmationId = req.params.credentialConfirmationId;
//   confirmationOrchestrator.getConfirmationsUsername(credentialConfirmationId)
//     .subscribe(username => {
//       if (username) {
//           res.status(200);
//           res.send(JSON.stringify(username));
//       }else {
//         res.status(404);
//         res.send(JSON.stringify({message: 'No Data Found For ' + req.params.credentialConfirmationId}));
//       }
//     }, error => {
//       res.status(500);
//       res.send(error);
//       console.log(error);
//     });
// };
