import { Request, Response } from "express";
import { PartyOrchestrator } from "./party.orchestrator";
import { ContactInfo } from "../domain/model/party/contact.info";

const partyOrchestrator: PartyOrchestrator = new PartyOrchestrator();

export let getContactInfo = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.query.type;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.getContactInfo(type, headerOptions)
        .subscribe( contactInfo => {
            if (contactInfo) {
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(contactInfo));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found"}));
            }
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

// export let addContactInfo = (req: Request, res: Response) => {
//     const correlationId = req.headers["Correlation-Id"];
//     const ownerPartyId = req.headers["Owner-Party-Id"];
//     const requestingPartyId = req.headers["Party-Id"];
//     const type: string = req.body.type;
//     const contactInfo: ContactInfo = req.body.contactInfo;
//
//     const headerOptions = {
//         "Correlation-Id": correlationId,
//         "Owner-Party-Id": ownerPartyId,
//         "Party-Id": requestingPartyId
//     };
//     res.setHeader("content-type", "application/json");
//
//     partyOrchestrator.addContactInfo(requestingPartyId, type, contactInfo, headerOptions)
//         .subscribe( contactInfo => {
//             res.status(200);
//             res.setHeader("content-type", "application/json");
//             res.send(JSON.stringify(contactInfo));
//         }, error => {
//             res.status(500);
//             res.setHeader("content-type", "application/json");
//             res.send(JSON.stringify({message: "Internal Server Error"}));
//             console.log(error);
//         });
// };

export let updateContactInfo = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.params.type;
    const contactInfo: ContactInfo = req.body;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.updateContactInfo(type, contactInfo, headerOptions)
        .subscribe( num => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(num));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

// address

export let getAddress = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.query.type;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.getAddress(type, headerOptions)
        .subscribe( address => {
            if (address) {
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(address));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found"}));
            }
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

// export let addAddress = (req: Request, res: Response) => {
//     const correlationId = req.headers["Correlation-Id"];
//     const ownerPartyId = req.headers["Owner-Party-Id"];
//     const requestingPartyId = req.headers["Party-Id"];
//     const type: string = req.body.type;
//     const address = req.body.address;
//     address.partyId = requestingPartyId;
//
//     const headerOptions = {
//         "Correlation-Id": correlationId,
//         "Owner-Party-Id": ownerPartyId,
//         "Party-Id": requestingPartyId
//     };
//     res.setHeader("content-type", "application/json");
//
//     partyOrchestrator.addAddress(type, address, headerOptions)
//         .subscribe( value => {
//             res.status(200);
//             res.setHeader("content-type", "application/json");
//             res.send(JSON.stringify(value));
//         }, error => {
//             res.status(500);
//             res.setHeader("content-type", "application/json");
//             res.send(JSON.stringify({message: "Internal Server Error"}));
//             console.log(error);
//         });
// };

export let updateAddress = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.params.type;
    const address = req.body;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.updateAddress(type, address, headerOptions)
        .subscribe( num => {
            if (num) {
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(num));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "Failed to update" + requestingPartyId }));
            }
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

