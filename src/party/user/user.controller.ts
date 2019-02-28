import {Request, Response} from "express";
import {UserOrchestrator} from "./user.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {User} from "../../data/party/user";
import {Credential} from "../../data/authentication/credential";
import {Person} from "../../data/party/person";
import { HeaderNormalizer } from "../../header.normalizer";

const userOrchestrator: UserOrchestrator = new UserOrchestrator();

export let findUser = (req: Request, res: Response) => {

  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

  userOrchestrator.findUser(searchStr, pageSize, headerOptions)
      .subscribe(users => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(users));
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });

};

export let getUsers = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator.getUsers(number, size, field, direction, headerOptions)
      .subscribe(result => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(result.data));
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });
};

export let getUser = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };
  const partyId = req.params.partyId;
  userOrchestrator.getUser(partyId, headerOptions)
    .subscribe(user => {
      if (user) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(user));
      } else {
        res.status(404);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
      }
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let saveUser = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  const body = req.body;
  const person: Person = body.user;
  const credential: Credential = body.credential;
  const partyAccessRoles: string[] = body.partyAccessRoles;

  if (!person || !person.firstName || !person.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'User' must exist, and contain first and last name."});
    return;
  }

  userOrchestrator.saveUser(person, credential, partyAccessRoles, headerOptions)
    .subscribe(person => {
      if (person) {
        res.status(201);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(person));
      } else {
        res.status(404);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Could not create user."}));
      }
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  const body = req.body;
  const partyId = req.params.partyId;
  const user: User = body.user;
  const credential: Credential = body.credential;
  const partyAccessRoles: string[] = body.partyAccessRoles;

  userOrchestrator
      .updateUser(partyId, user, credential, partyAccessRoles, headerOptions)
      .subscribe(affected => {
        if (affected > 0) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify(affected));
        } else {
          res.status(404);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
        }
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });
};

export let deleteUser = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };
  const partyId = req.params.partyId;
  userOrchestrator
    .deleteUser(partyId, headerOptions)
    .subscribe(affected => {
      if (affected > 0) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(affected));
      } else {
        res.status(404);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "No Data Found For " + req.params.partyId}));
      }
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let getUserMe = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  userOrchestrator.getUserMe(headerOptions)
      .subscribe(user => {
        if (user) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify(user));
        } else {
          res.status(404);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify({message: "No Profile Found."}));
        }
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });
};

export let updateUserMe = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  const user: User = req.body.user;
  const credential: Credential = req.body.credential;

  if (!user || !user.firstName || !user.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'User' must exist, and contain first and last name."});
    return;
  }

  userOrchestrator
      .updateUserMe(user, credential, headerOptions)
      .subscribe(affected => {
        if (affected > 0) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify(affected));
        } else {
          res.status(404);
          res.setHeader("content-type", "application/json");
          res.send(JSON.stringify({message: "Could not update profile."}));
        }
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });
};

export let getUserMenu = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);
  const correlationId = req.headers["Correlation-Id"];
  const ownerPartyId = req.headers["Owner-Party-Id"];
  const requestingPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": correlationId,
    "Owner-Party-Id": ownerPartyId,
    "Party-Id": requestingPartyId
  };

  userOrchestrator.getUserMenu(headerOptions)
      .subscribe(usersMenu => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(usersMenu));
      }, error => {
        res.status(500);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
      });

};
