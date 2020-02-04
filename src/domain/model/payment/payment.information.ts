import { Party } from "../party/party";

export class PaymentInformation extends Party {
    paymentId: string;
    paymentMethodId: string;
    method: string;
    status: string;

    type: string;
    cardName: string;
    cardNumber: string;
    cardExpDate: Date;
    cardCVV: string;
    ending: string;
}
