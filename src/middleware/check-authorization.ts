import {NextFunction, Request, Response} from "express";

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {

  checkAuthorization(req, function (err: Error, authorized: boolean) {
    if (err || !authorized) {
      res.send({message: "Unauthorized", status: 401});
    }

    next();
  });

  function checkAuthorization(req: Request, callback: (err: Error, authorized: boolean) => void) {
    throw new Error("Not Implemented");
  }

};

export default checkAuthorization;