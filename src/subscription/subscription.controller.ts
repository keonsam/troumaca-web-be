import { Request, Response } from "express";
import { SubscriptionOrchestrator } from "./subscription.orchestrator";

const subscriptionOrchestrator: SubscriptionOrchestrator = new SubscriptionOrchestrator();

export const getApps = (req: Request, res: Response) => {
    res.setHeader("content-type", "application/json");
    subscriptionOrchestrator.getApps(res.locals.partyId)
        .subscribe( apps => {
            const body = JSON.stringify(apps);
            res.status(200).send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const getSubscriptions = (req: Request, res: Response) => {
    res.setHeader("content-type", "application/json");

    subscriptionOrchestrator.getSubscriptions(res.locals.partyId)
        .subscribe(subscriptions => {
            const body = JSON.stringify(subscriptions);
            res.status(201);
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const addSubscription = (req: Request, res: Response) => {

    const subscription = req.body;
    res.setHeader("content-type", "application/json");

    if (!subscription) {
        res.status(400);
        res.send(JSON.stringify({message: "Subscription cannot be empty"}));
    }

    subscriptionOrchestrator.addSubscription(subscription, res.locals.partyId)
        .subscribe( subscription => {
            const body = JSON.stringify(subscription);
            res.status(201);
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};



