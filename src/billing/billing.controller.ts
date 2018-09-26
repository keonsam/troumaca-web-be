import { Request, Response } from "express";
import { BillingOrchestrator } from "./billing.orchestrator";
import { Billing } from "../data/party/billing";

const billingOrchestrator: BillingOrchestrator = new BillingOrchestrator();

export const getPaymentMethods = (req: Request, res: Response) => {

    billingOrchestrator.getPaymentMethods()
        .subscribe( paymentMethods => {
           if (!paymentMethods) {
               res.status(404);
               res.send(JSON.stringify({message: "No Payment Methods Found"}));
           } else {
               res.status(200);
               res.setHeader("content-type", "application/json");
               res.send(JSON.stringify(paymentMethods));
           }
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const getBillings = (req: Request, res: Response) => {

    billingOrchestrator.getBillings()
        .subscribe( billings => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(billings));
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const getCreditCards = (req: Request, res: Response) => {

    billingOrchestrator.getCreditCards()
        .subscribe( creditCards => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(creditCards));
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};


export const addCreditCard = (req: Request, res: Response) => {

    const creditCard = req.body;

    if (!creditCard) {
        res.status(400);
        res.send(JSON.stringify({message: "Credit Card must exist"}));
    }

    billingOrchestrator.addCreditCard(creditCard)
        .subscribe( value => {
            const body = JSON.stringify(value);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const updateCreditCard = (req: Request, res: Response) => {

    const creditCard = req.body;
    const creditCardId = req.params.creditCardId;

    if (!creditCard) {
        res.status(400);
        res.send(JSON.stringify({message: "Credit Card must exist"}));
    }

    billingOrchestrator.updateCreditCard(creditCard, creditCardId)
        .subscribe( num => {
            const body = JSON.stringify(num);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const deleteCreditCard = (req: Request, res: Response) => {

    const creditCardId = req.params.creditCardId;

    billingOrchestrator.deleteCreditCard(creditCardId)
        .subscribe( num => {
            const body = JSON.stringify(num);
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

// export const getBilling = (req: Request, res: Response) => {
//
//     billingOrchestrator.getBilling()
//         .subscribe( billing => {
//             const body = JSON.stringify(billing);
//             res.status(200);
//             res.setHeader("content-type", "application/json");
//             res.send(body);
//         }, error => {
//             console.log(error);
//             res.status(500);
//             res.send(JSON.stringify({message: "Server Error, please try again"}));
//         });
// };

// export const addBilling = (req: Request, res: Response) => {
//
//     const billing: Billing = req.body.billing;
//     const method: any = req.body.method;
//
//     if (!billing || !method) {
//         res.status(400);
//         res.send(JSON.stringify({message: "Either 'billing' or 'method' cannot be empty"}));
//     }
//
//     billingOrchestrator.addBilling(billing, method)
//         .subscribe( billing => {
//             const body = JSON.stringify(billing);
//             res.status(201);
//             res.setHeader("content-type", "application/json");
//             res.send(body);
//         }, error => {
//             console.log(error);
//             res.status(500);
//             res.send(JSON.stringify({message: "Server Error, please try again"}));
//         });
// };
//
// export const updateBilling = (req: Request, res: Response) => {
//
//     const billing: Billing = req.body.billing;
//     const method: any = req.body.method;
//     const billingId: string = req.params.billingId;
//
//     if (!billing || !method) {
//         res.status(400);
//         res.send(JSON.stringify({message: "Either 'billing' or 'method' cannot be empty"}));
//     }
//
//     if (!billingId) {
//         res.status(400);
//         res.send(JSON.stringify({message: "billingId is required"}));
//     }
//
//     billingOrchestrator.updateBilling(billingId, billing, method)
//         .subscribe( numReplaced => {
//             const body = JSON.stringify(numReplaced);
//             res.status(201);
//             res.setHeader("content-type", "application/json");
//             res.send(body);
//         }, error => {
//             console.log(error);
//             res.status(500);
//             res.send(JSON.stringify({message: "Server Error, please try again"}));
//         });
// };

// VALIDATION

export const cardName = (req: Request, res: Response) => {
  const name: string = req.body;

  if (!name) {
      res.status(400);
      res.send(JSON.stringify({message: "card name is required"}));
  }

  billingOrchestrator.cardName(name)
      .subscribe( valid => {
          const body = JSON.stringify({valid});
          res.status(201);
          res.setHeader("content-type", "application/json");
          res.send(body);
      }, error => {
          console.log(error);
          res.status(500);
          res.send(JSON.stringify({message: "Server Error, please try again"}));
      });
};

export const cardNumber = (req: Request, res: Response) => {
    const number: string = req.body;

    if (!number) {
        res.status(400);
        res.send(JSON.stringify({message: "card number is required"}));
    }

    billingOrchestrator.cardNumber(number)
        .subscribe( valid => {
            const body = JSON.stringify({valid});
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const cardExpDate = (req: Request, res: Response) => {
    const date: Date = req.body;

    if (!date) {
        res.status(400);
        res.send(JSON.stringify({message: "card expire date is required"}));
    }

    billingOrchestrator.cardExpDate(date)
        .subscribe( valid => {
            const body = JSON.stringify({valid});
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const cardCVV = (req: Request, res: Response) => {
    const cvv: string = req.body;

    if (!cvv) {
        res.status(400);
        res.send(JSON.stringify({message: "card cvv is required"}));
    }

    billingOrchestrator.cardCVV(cvv)
        .subscribe( valid => {
            const body = JSON.stringify({valid});
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};


