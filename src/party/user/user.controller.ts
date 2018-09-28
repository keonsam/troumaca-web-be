import { Request, Response } from "express";
import { UserOrchestrator } from "./user.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const userOrchestrator: UserOrchestrator = new UserOrchestrator();

export let findUser = (req: Request, res: Response) => {
  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  userOrchestrator.findUser(searchStr, pageSize)
    .subscribe(users => {
        res.status(200);
        res.send(JSON.stringify(users));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });

};

export  let getUsers = (req: Request, res: Response) => {

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator.getUsers(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export  let getUser = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  const sessionId = req.cookies["sessionId"];
  userOrchestrator.getUser(partyId, sessionId)
    .subscribe(userResponse => {
        if (userResponse.user) {
            res.status(200);
            res.send(JSON.stringify(userResponse.toJson()));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export  let saveUser = (req: Request, res: Response) => {
  const user = req.body.user;
  const credential = req.body.credential;
  const partyAccessRoles = req.body.partyAccessRoles;
  const sessionId = req.cookies["sessionId"];

    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }
  userOrchestrator.saveUser(user, credential, partyAccessRoles, sessionId)
    .subscribe(user => {
        res.status(201);
        res.send(JSON.stringify(user));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  const user = req.body.user;
  const credential = req.body.credential;
  const partyAccessRoles = req.body.partyAccessRoles;
  if (!req.body) {
      return res.status(400).send({
          message: "User can not be empty"
      });
  }
  userOrchestrator
    .updateUser(partyId, user, credential, partyAccessRoles)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        } else {
            res.status(404);
            res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let deleteUser = (req: Request, res: Response) => {
    const partyId = req.params.partyId;
    userOrchestrator
        .deleteUser(partyId)
        .subscribe(affected => {
            if (affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};