import { Request, Response } from "express";
import { BillingOrchestrator } from "./billing.orchestrator";
import { Billing } from "./billing";

const billingOrchestrator: BillingOrchestrator = new BillingOrchestrator();

export const getBilling = (req: Request, res: Response) => {

    billingOrchestrator.getBilling()
        .subscribe( billing => {
            const body = JSON.stringify(billing);
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const addBilling = (req: Request, res: Response) => {

    const billing: Billing = req.body.billing;
    const method: any = req.body.method;

    if (!billing || !method) {
        res.status(400);
        res.send(JSON.stringify({message: "Either 'billing' or 'method' cannot be empty"}));
    }

    billingOrchestrator.addBilling(billing, method)
        .subscribe( billing => {
            const body = JSON.stringify(billing);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const updateBilling = (req: Request, res: Response) => {

    const billing: Billing = req.body.billing;
    const method: any = req.body.method;
    const billingId: string = req.params.billingId;

    if (!billing || !method) {
        res.status(400);
        res.send(JSON.stringify({message: "Either 'billing' or 'method' cannot be empty"}));
    }

    if (!billingId) {
        res.status(400);
        res.send(JSON.stringify({message: "billingId is required"}));
    }

    billingOrchestrator.updateBilling(billingId, billing, method)
        .subscribe( numReplaced => {
            const body = JSON.stringify(numReplaced);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

