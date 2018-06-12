import {Request, Response} from "express";
import {OrganizationOrchestrator} from "./organization.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";

let organizationOrchestrator:OrganizationOrchestrator = new OrganizationOrchestrator();

export  let getOrganizations = (req: Request, res: Response) => {
  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  organizationOrchestrator
    .getOrganizations(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export  let getOrganization = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  organizationOrchestrator
    .getOrganization(partyId)
    .subscribe(organization => {
        if(organization) {
            res.status(200);
            res.send(JSON.stringify(organization));
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

export  let saveOrganization = (req: Request, res: Response) => {
  let organization = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
  organizationOrchestrator
    .saveOrganization(organization)
    .subscribe(organization => {
        res.status(201);
        res.send(JSON.stringify(organization));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: 'Error Occurred'}));
        console.log(error);
    });
};

export let updateOrganization = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let organization = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
  organizationOrchestrator
    .updateOrganization(partyId, organization)
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

export let deleteOrganization = (req: Request, res: Response) => {
    let partyId = req.params.partyId;

    organizationOrchestrator
        .deleteOrganization(partyId)
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
