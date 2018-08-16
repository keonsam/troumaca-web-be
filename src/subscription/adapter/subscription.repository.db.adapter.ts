import { SubscriptionRepository } from "../subscription.repository";
import { Observable } from "rxjs/Observable";
import { Subscription } from "../subscription";
import { Observer } from "rxjs/Observer";
import { subscriptions } from "../../db";
import { generateUUID } from "../../uuid.generator";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    public getSubscriptionInformation(): Observable<any> {
        const information = {
            "Asset Management": {
                "description": "Manage assets in the cloud to create effective databases breakdowns",
                "features": ["Assets", "Asset Types", "Asset Classes", "Attributes", "Site Management", "Data Types"],
                "route": ["/assets"],
                "cost": "199.99",
                "subscribed": false
            },
            "User Management": {
                "description": "Allows users to access and management your assets",
                "features": ["Users", "Authorization", "Profile Page"],
                "route": ["/parties/users"],
                "cost": "Free",
                "subscribed": true
            },
            "Organization Management": {
                "description": "Create organizations to manage their assets and users in the cloud",
                "features": ["Organization", "Organization Profile Page"],
                "route": ["/parties"],
                "cost": "Free",
                "subscribed": true
            },
            "Depreciation Management": {
                "description": "Manage asset depreciation",
                "features": ["Asset Depreciation", "Tax Depreciation", "Depreciation Schedule"],
                "route": ["/depreciation"],
                "cost": "99.99",
                "subscribed": false
            }
        };
        return Observable.of(information);
    }

    public getSubscription(type: string): Observable<Subscription> {
        return Observable.create(function (observer: Observer<Subscription>) {
            const query = {
                "type": type
            };
            subscriptions.findOne(query, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }

    public addSubscription(subscription: Subscription): Observable<Subscription> {
        return Observable.create(function (observer: Observer<Subscription>) {
            subscription.subscriptionId = generateUUID();
            subscription.subscribed = true;

            subscriptions.insert(subscription, function (err: any, doc: any) {
                if (!err) {
                    observer.next(doc);
                } else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}