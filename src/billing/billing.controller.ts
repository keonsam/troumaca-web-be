import { Request, Response } from "express";
import { BillingOrchestrator } from "./billing.orchestrator";

const billingOrchestrator: BillingOrchestrator = new BillingOrchestrator();

export const getBillings = (req: Request, res: Response) => {

    res.setHeader("content-type", "application/json");


    billingOrchestrator.getBillings(res.locals.partyId)
        .subscribe( billings => {
            res.status(200);
            res.send(JSON.stringify(billings));
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

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

export const getPaymentInformation = (req: Request, res: Response) => {

    res.setHeader("content-type", "application/json");

    billingOrchestrator.getPaymentInformation(res.locals.partyId)
        .subscribe( paymentInformation => {
            res.status(200);
            res.send(JSON.stringify(paymentInformation));
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};


export const addPaymentInformation = (req: Request, res: Response) => {

    const paymentInformation = req.body;

    res.setHeader("content-type", "application/json");

    // TODO: Fix these errors
    if (!paymentInformation || !paymentInformation.cardName || !paymentInformation.cardNumber || !paymentInformation.cardCVV || !paymentInformation.cardExpDate) {
        res.status(400);
        res.send(JSON.stringify({message: "Credit Card must exist and contain card name, number, cvv and expiry date."}));
    }

    billingOrchestrator.addPaymentInformation(paymentInformation, res.locals.partyId)
        .subscribe( value => {
            const body = JSON.stringify(value);
            res.status(201);
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const updatePaymentInformation = (req: Request, res: Response) => {

    const paymentInfo = req.body;
    const paymentId = req.params.paymentId;
    res.setHeader("content-type", "application/json");

    if (!paymentInfo) {
        res.status(400);
        res.send(JSON.stringify({message: "Payment Information is required."}));
    }

    billingOrchestrator.updatePaymentInformation(paymentInfo, paymentId)
        .subscribe( num => {
            if (num) {
                const body = JSON.stringify(num);
                res.status(200);
                res.send(body);
            } else {
                res.status(404);
                res.send(JSON.stringify({message : `No data found for ${paymentId}.`}));
            }
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};

export const deletePaymentInformation = (req: Request, res: Response) => {

    const paymentId = req.params.paymentId;
    res.setHeader("content-type", "application/json");

    billingOrchestrator.deletePaymentInformation(paymentId)
        .subscribe( num => {
            const body = JSON.stringify(num);
            res.status(201);
            res.send(body);
        }, error => {
            console.log(error);
            res.status(500);
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};


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

export const isValidPaymentMethod = (req: Request, res: Response) => {
    const partyId: string = res.locals.partyId;

    billingOrchestrator.isValidPaymentMethod(partyId)
        .subscribe( valid => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({valid}));
        }, error => {
            console.log(error);
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Server Error, please try again"}));
        });
};


