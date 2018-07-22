import {Request, Response} from "express";
import {SubscriptionOrchestrator} from "./subscription.orchestrator";

const subscriptionOrchestrator: SubscriptionOrchestrator = new SubscriptionOrchestrator();

export const getSubscription = (req: Request, res: Response) => {

    subscriptionOrchestrator.getSubscription(req.params.type)
        .subscribe( subscription => {
            const body = JSON.stringify(subscription);
            res.status(200).send(body);
        }, error => {
         console.log(error);
         res.status(500);
         res.send(JSON.stringify({message: 'Server Error, please try again'}));
    });
};

export const addSubscription = (req: Request, res: Response) => {

    const subscription = req.body;

    if (!subscription) {
        res.status(400);
        res.send(JSON.stringify({message: "Subscription cannot be empty"}));
    }

    subscriptionOrchestrator.addSubscription(subscription)
        .subscribe( subscription => {
            const body = JSON.stringify(subscription);
            res.status(201);
            res.setHeader('content-type', 'application/json');
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: 'Server Error, please try again'}));
        });
};



