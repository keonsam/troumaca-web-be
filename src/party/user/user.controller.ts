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
    .subscribe(users => {
        res.status(200);
        res.send(JSON.stringify(users));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });

};

export  let getUsers = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator.getUsers(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export  let getUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  userOrchestrator.getUser(partyId)
    .subscribe(userResponse => {
        if(userResponse) {
            res.status(200);
            res.send(JSON.stringify(userResponse.toJson()));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For '+ req.params.partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export  let saveUser = (req: Request, res: Response) => {
  let user = req.body.user;
  let partyAccessRoles = req.body.partyAccessRoles;
    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }
  userOrchestrator.saveUser(user, partyAccessRoles)
    .subscribe(user => {
        res.status(201);
        res.send(JSON.stringify(user));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let user = req.body.user;
  let partyAccessRoles = req.body.partyAccessRoles;
    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }
  userOrchestrator
    .updateUser(partyId, user, partyAccessRoles)
    .subscribe(affected => {
        if(affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For '+ req.params.partyId}));
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateUserMe = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let user = req.body.user;
  let credential = req.body.credential;
    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }
  userOrchestrator
    .updateUserMe(partyId, user, credential)
    .subscribe(affected => {
        if (affected > 0) {
            res.status(200);
            res.send(JSON.stringify(affected));
        }else {
            res.status(404);
            res.send(JSON.stringify({message: 'No Data Found For '+ req.params.partyId}))
        }
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let deleteUser = (req: Request, res: Response) => {
    let partyId = req.params.partyId;
    userOrchestrator
        .deleteUser(partyId)
        .subscribe(affected => {
            if(affected > 0) {
                res.status(200);
                res.send(JSON.stringify(affected));
            }else {
                res.status(404);
                res.send(JSON.stringify({message: 'No Data Found For '+ req.params.partyId}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: 'Error Occurred'}));
            console.log(error);
        });
};