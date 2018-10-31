import {Request, Response} from "express";
import {UserOrchestrator} from "./user.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {User} from "../../data/party/user";
import {Credential} from "../../data/authentication/credential";
import {PartyAccessRole} from "../../data/authorization/party.access.role";

const userOrchestrator: UserOrchestrator = new UserOrchestrator();

export let findUser = (req: Request, res: Response) => {
  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

  userOrchestrator.findUser(searchStr, pageSize)
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

  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator.getUsers(number, size, field, direction)
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
  const partyId = req.params.partyId;
  userOrchestrator.getUser(partyId)
    .subscribe(userResponse => {
      if (userResponse.user) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(userResponse));
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
  const partyId = res.locals.partyId;
  userOrchestrator.getUser(partyId)
    .subscribe(userResponse => {
      if (userResponse.user) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(userResponse));
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

export let saveUser = (req: Request, res: Response) => {
  const user: User = req.body.user;
  const credential: Credential = req.body.credential;
  const partyAccessRoles: PartyAccessRole[] = req.body.partyAccessRoles;

  if (!user || !user.firstName || !user.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'User' must exist, and contain first and last name."});
    return;
  }

  if (!credential || !credential.username) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'Credential' must exist, and contain username."});
    return;
  }

  if (partyAccessRoles.length < 1) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'PartAccessRoles' must contain at least 1 accessRole."});
    return;
  }

  userOrchestrator.saveUser(user, credential, partyAccessRoles)
    .subscribe(user => {
      res.status(201);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(user));
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  const user: User = req.body.user;
  const credential: Credential = req.body.credential;
  const partyAccessRoles: PartyAccessRole[] = req.body.partyAccessRoles;

  if (!user || !user.firstName || !user.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'User' must exist, and contain first and last name."});
    return;
  }

  if (partyAccessRoles.length < 1) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'PartAccessRoles' must contain at least 1 accessRole."});
    return;
  }

  userOrchestrator
    .updateUser(partyId, user, credential, partyAccessRoles)
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

export let updateUserMe = (req: Request, res: Response) => {
  const partyId = res.locals.partyId;
  const user: User = req.body.user;
  const credential: Credential = req.body.credential;

  if (!user || !user.firstName || !user.lastName) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send({message: "'User' must exist, and contain first and last name."});
    return;
  }

  userOrchestrator
    .updateUserMe(partyId, user, credential)
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

export let deleteUser = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  userOrchestrator
    .deleteUser(partyId)
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