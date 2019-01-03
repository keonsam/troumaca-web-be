import { Request, Response } from "express";
import { PartyOrchestrator } from "./party.orchestrator";
import { ContactInfo } from "../data/party/contact.info";

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

    partyOrchestrator.getContactInfo(type, requestingPartyId)
        .subscribe( contactInfo => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(contactInfo));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

export let addContactInfo = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.body.type;
    const contactInfo: ContactInfo = req.body.contactInfo;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.addContactInfo(type, contactInfo, headerOptions)
        .subscribe( contactInfo => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(contactInfo));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

export let updateContactInfo = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const contactInfoId = req.params.contactInfoId;
    const type: string = req.body.type;
    const contactInfo: ContactInfo = req.body.contactInfo;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.updateContactInfo(type, contactInfo, contactInfoId)
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

    partyOrchestrator.getAddress(type, requestingPartyId)
        .subscribe( value => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(value));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

export let addAddress = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const type: string = req.body.type;
    const address = req.body.address;
    address.partyId = requestingPartyId;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.addAddress(type, address, headerOptions)
        .subscribe( value => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(value));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

export let updateAddress = (req: Request, res: Response) => {
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];
    const siteId = req.params.siteId;
    const type: string = req.body.type;
    const address = req.body.address;

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };
    res.setHeader("content-type", "application/json");

    partyOrchestrator.updateAddress(type, address, siteId)
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

