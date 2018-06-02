import {Request, Response} from "express";
import {UserOrchestrator} from "./user.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {shapeUserResponse2} from "../user/user.response.shaper";

let userOrchestrator:UserOrchestrator = new UserOrchestrator();


export let findUser = (req: Request, res: Response) => {
  let searchStr:string =  req.query.q;
  let pageSize:number = req.query.pageSize;

  userOrchestrator.findUser(searchStr, pageSize)
    .map(value => {
      return shapeUserResponse2("persons", value); //TODO: change to new method
    }).subscribe(users => {
    let body = JSON.stringify(users);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};

export  let getUsers = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator.getUsers(number, size, field, direction)
    .subscribe(users => {
      res.send(JSON.stringify(users.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export  let getUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  userOrchestrator.getUser(partyId)
    .subscribe(user => {
      let body = JSON.stringify(user);
      res.send(body);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export  let saveUser = (req: Request, res: Response) => {
  let user = req.body.user;
  let partyAccessRoles = req.body.partyAccessRoles;
  userOrchestrator.saveUser(user, partyAccessRoles)
    .subscribe(result => {
      res.send(JSON.stringify(result.data));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let deleteUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;

  userOrchestrator
    .deleteUser(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let user = req.body.user;
  let partyAccessRoles = req.body.partyAccessRoles;
  userOrchestrator
    .updateUser(partyId, user, partyAccessRoles)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let updateUserMe = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let user = req.body.user;
  let credential = req.body.credential;
  userOrchestrator
    .updateUserMe(partyId, user, credential)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};
