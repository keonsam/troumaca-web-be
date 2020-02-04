import {Ctx, Query, Resolver, UseMiddleware} from "type-graphql";
import {isAuth} from "../../middleware/isAuth";
import {of} from "rxjs";
import {Cards} from "../../data/subscription/cards";
import {Card} from "../../data/subscription/card";
import {SubInfo} from "../../data/subscription/sub.info";
import {Invoice} from "../../data/subscription/invoice";
import {Invoices} from "../../data/subscription/invoices";

@Resolver()
export class SubscriptionResolver {

    cards =  [
        new Card("Credit Card", "Visa", "****-*****- *230", true),
        new Card("Credit Card", "MasterCard", "****-*****- *245", false)
        ];

    invoices = [
        new Invoice("June 2019", "Due on 14 June 2019 (in 3 days)", "$25", "unpaid"),
        new Invoice("May 2019", "", "$25", "paid"),
        new Invoice("April 2019", "", "$25", "paid"),
        new Invoice("April 2019", "", "$25", "paid"),
        new Invoice("March 2019", "", "$25", "paid")
    ];

    @UseMiddleware(isAuth)
    @Query( () => SubInfo)
    async getSubInfo(@Ctx("req") req?: any): Promise<SubInfo> {
        const subInfo: SubInfo = new SubInfo();
        subInfo.sub = "1 year - recurring per month @ $ 100";
        subInfo.card = this.cards[0];
        subInfo.invoice = "Next Due on 14 June 2019 (in 3 days)";
        return await of(subInfo).toPromise();
    }

    @UseMiddleware(isAuth)
    @Query( () => Cards)
    async getPayments(@Ctx("req") req?: any): Promise<Cards> {
        const cards: Cards = new Cards();
        cards.cards = this.cards;
        return await of(cards).toPromise();
    }

    @UseMiddleware(isAuth)
    @Query( () => Invoices)
    async getInvoices(@Ctx("req") req?: any): Promise<Invoices> {
        const invoices: Invoices = new Invoices();
        invoices.unPaid = 1;
        invoices.paid = 5;
        invoices.invoices = this.invoices;
        return await of(invoices).toPromise();
    }
}
