import { Request, Response } from "express";
import { SessionOrchestrator } from "./session.orchestrator";

const sessionOrchestrator: SessionOrchestrator = new SessionOrchestrator();

export let isValidSession = (req: Request, res: Response) => {
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

    const sessionId = req.cookies["sessionId"];

    sessionOrchestrator.isValidSession(sessionId, headerOptions)
        .subscribe(next => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(next));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "An Error has occurred"}));
            console.log(error);
        });
};

// export let getPartyId = (req: Request, res: Response) => {
//     const correlationId = req.headers.correlationid;
//
//     if (!correlationId) {
//         res.status(400);
//         res.setHeader("content-type", "application/json");
//         res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//         return;
//     }
//
//     const headerOptions = {
//         correlationId: correlationId,
//         sourceSystemHost: req.headers.host,
//         sourceSystemName: ""
//     };
//
//     const sessionId = req.cookies["sessionId"];
//
//     if (!sessionId) {
//         res.status(400);
//         res.setHeader("content-type", "application/json");
//         res.send(JSON.stringify({message: "A \"sessionId\" is required."}));
//         return;
//     }
//
//     sessionOrchestrator.getSession(sessionId, headerOptions)
//         .subscribe(next => {
//             res.status(200);
//             res.send(JSON.stringify(next.partyId));
//         }, error => {
//             res.status(500);
//             res.send(JSON.stringify({message: "Error Occurred"}));
//             console.log(error);
//         });
// };
//
// export let handleSessionLogOut = (req: Request, res: Response) => {
//     const correlationId = req.headers.correlationid;
//
//     if (!correlationId) {
//         res.status(400);
//         res.setHeader("content-type", "application/json");
//         res.send(JSON.stringify({message: "A \"correlationId\" is required."}));
//         return;
//     }
//
//     const headerOptions = {
//         correlationId: correlationId,
//         sourceSystemHost: req.headers.host,
//         sourceSystemName: ""
//     };
//
//     const sessionId = req.cookies["sessionId"];
//
//     if (!sessionId) {
//         res.status(400);
//         res.setHeader("content-type", "application/json");
//         res.send(JSON.stringify({message: "A \"sessionId\" is required."}));
//         return;
//     }
//     sessionOrchestrator.handleSessionLogOut(sessionId, headerOptions)
//         .subscribe(next => {
//             res.status(200);
//           res.send(JSON.stringify(next));
//         }, error => {
//           res.status(500);
//           res.send(JSON.stringify({message: "Error Occurred"}));
//           console.log(error);
//         });
// };
