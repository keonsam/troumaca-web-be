import { Party } from "./party";

export class Subscription extends Party {
    subscriptionId: string;
    moduleId: string;
    subscribed: boolean;
    name: string;
    cost: string;
}
