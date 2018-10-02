import { SubscriptionRepository } from "../../repository/subscription.repository";
import { Subscription } from "../../data/party/subscription";
import { Observable ,  Observer, of } from "rxjs";
import { subscriptions } from "../../db";
import { generateUUID } from "../../uuid.generator";
import { Module } from "../../data/party/module";
import { switchMap } from "rxjs/operators";

export class SubscriptionRepositoryNeDbAdapter implements SubscriptionRepository {

    getSubscriptionModules(): Observable<Module[]> {
        const modules: Module[] = [
            {
                moduleId: "d76d3eef-4858-42b1-93f0-93ace4b88ac2",
                name: "Asset Management",
                subscribed: false,
                information: {
                    description: "Manage assets in the cloud to create effective databases breakdowns",
                    features: ["Assets", "Asset Types", "Asset Classes", "Attributes", "Site Management", "Data Types"],
                    route: "/assets",
                    price: "199.99",
                }
            },
            {
                moduleId: "e350595f-3628-4522-8ff0-ff8ecc0a8c15",
                name: "User Management",
                subscribed: false,
                information: {
                    description: "Allows users to access and management your assets",
                    features: ["Users", "Authorization", "Profile Page"],
                    route: "parties/users/listing",
                    price: "Free",
                }
            },
            {
                moduleId: "ea88c01b-1a13-4680-a560-3f9ac4fc72fb",
                name: "Organization Management",
                subscribed: false,
                information: {
                    description: "Create organizations to manage their assets and users in the cloud",
                    features: ["Organization", "Organization Profile Page"],
                    route: "/parties",
                    price: "Free",
                }
            },
            {
                moduleId: "c51ee5b3-fdc4-4fdb-82b4-866be5350b90",
                name: "Depreciation Management",
                subscribed: false,
                information: {
                    description: "Manage asset depreciation",
                    features: ["Asset Depreciation", "Tax Depreciation", "Depreciation Schedule"],
                    route: "/depreciation",
                    price: "99.99",
                }
            }
        ];
        return this.getSubscriptionsLocal()
            .pipe( switchMap( subscriptionArr => {
                if (!subscriptionArr) {
                    return of(modules);
                } else {
                    subscriptionArr.forEach(x => {
                       modules.find(v => v.moduleId === x.moduleId).subscribed = true;
                    });
                    return of(modules);
                }
            }));
    }

    private getSubscriptionsLocal(): Observable<Subscription[]> {
        return Observable.create( (observer: Observer<Subscription[]>) => {
            subscriptions.find({}, (err: any, doc: any) => {
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