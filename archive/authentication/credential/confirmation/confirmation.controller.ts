// import {Response, Request} from "express";
// import {ConfirmationOrchestrator} from "./confirmation.orchestrator";
// import {Confirmation} from "../../../domain/model/authentication/confirmation";
// import { HeaderNormalizer } from "../../../header.normalizer";
//
// const confirmationOrchestrator: ConfirmationOrchestrator = new ConfirmationOrchestrator();
//
// export let resendConfirmCode = (req: Request, res: Response) => {
//
//   HeaderNormalizer.normalize(req);
//   const correlationId = req.headers["Correlation-Id"];
//   const ownerPartyId = req.headers["Owner-Party-Id"];
//   const requestingPartyId = req.headers["Party-Id"];
//
//   const confirmation = req.body;
//
//   if (!correlationId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//     return;
//   }
//
//   if (!confirmation.confirmationId || !confirmation.credentialId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "'Confirmation' is required containing confirmationId and credentialId."}));
//     return;
//   }
//
//   const headerOptions = {
//     "Correlation-Id": correlationId,
//     "Owner-Party-Id": ownerPartyId,
//     "Party-Id": requestingPartyId
//   };
//
//   confirmationOrchestrator
//     .resendConfirmCode(confirmation.confirmationId, confirmation.credentialId, headerOptions)
//     .subscribe(next => {
//       const body = JSON.stringify(next);
//       res.status(201);
//       res.setHeader("content-type", "application/json");
//       res.send(body);
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let resendConfirmCodeByUsername = (req: Request, res: Response) => {
//
//   HeaderNormalizer.normalize(req);
//   const correlationId = req.headers["Correlation-Id"];
//   const ownerPartyId = req.headers["Owner-Party-Id"];
//   const requestingPartyId = req.headers["Party-Id"];
//
//   const confirmation = req.body;
//
//   if (!correlationId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//     return;
//   }
//
//   if (!confirmation.username) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "'Confirm' by username a \"username\" value."}));
//     return;
//   }
//
//   const headerOptions = {
//     "Correlation-Id": correlationId,
//     "Owner-Party-Id": ownerPartyId,
//     "Party-Id": requestingPartyId
//   };
//
//   confirmationOrchestrator
//     .resendConfirmCodeByUsername(confirmation.username, headerOptions)
//     .subscribe(next => {
//       const body = JSON.stringify(next);
//       res.status(201);
//       res.setHeader("content-type", "application/json");
//       res.send(body);
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//       console.log(error);
//     });
//
// };
//
// export let confirmCode = (req: Request, res: Response) => {
//
//   HeaderNormalizer.normalize(req);
//   const correlationId = req.headers["Correlation-Id"];
//   const ownerPartyId = req.headers["Owner-Party-Id"];
//   const requestingPartyId = req.headers["Party-Id"];
//
//   const confirmation: Confirmation = req.body;
//
//   if (!confirmation || !confirmation.code || !confirmation.confirmationId || !confirmation.credentialId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "'Confirmation' must be sent and have confirmation code, confirmationId and credentialId."}));
//     return;
//   }
//
//
//   if (!correlationId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//     return;
//   }
//
//     const headerOptions = {
//         "Correlation-Id": correlationId,
//         "Owner-Party-Id": ownerPartyId,
//         "Party-Id": requestingPartyId
//     };
//
//   confirmationOrchestrator
//     .confirmCode(confirmation.confirmationId, confirmation.credentialId, confirmation.code, headerOptions)
//     .subscribe(next => {
//       const body = JSON.stringify(next);
//       res.setHeader("content-type", "application/json");
//       res.status(200);
//       res.send(body);
//     }, error => {
//       res.status(!error.code ? 500 : error.code);
//       const msg = !error.message ? "Internal Server Error" : error.message;
//       res.send(JSON.stringify(msg));
//       console.log(error);
//     });
//
// };
//
// export let validateCode = (req: Request, res: Response) => {
//
//   HeaderNormalizer.normalize(req);
//   const correlationId = req.headers["Correlation-Id"];
//   const ownerPartyId = req.headers["Owner-Party-Id"];
//
//   const confirmation: Confirmation = req.body;
//
//   if (!confirmation || !confirmation.code || !confirmation.credentialId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "'Confirmation' must be sent and have confirmation code, confirmationId and credentialId."}));
//     return;
//   }
//
//
//   if (!correlationId) {
//     res.status(400);
//     res.setHeader("content-type", "application/json");
//     res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//     return;
//   }
//
//   const headerOptions = {
//     "Correlation-Id": correlationId,
//     "Owner-Party-Id": ownerPartyId
//   };
//
//   confirmationOrchestrator
//   .validateCode(confirmation.credentialId, confirmation.code, headerOptions)
//   .subscribe(next => {
//     const body = JSON.stringify(next);
//     res.setHeader("content-type", "application/json");
//     res.status(200);
//     res.send(body);
//   }, error => {
//     res.status(!error.code ? 500 : error.code);
//     const msg = !error.message ? "Internal Server Error" : error.message;
//     res.send(JSON.stringify(msg));
//     console.log(error);
//   });
//
// };
