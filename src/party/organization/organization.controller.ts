import { Request, Response } from "express";
import { OrganizationOrchestrator } from "./organization.orchestrator";
import { getNumericValueOrDefault } from "../../number.util";
import { getStringValueOrDefault } from "../../string.util";

const organizationOrchestrator: OrganizationOrchestrator = new OrganizationOrchestrator();

export let findOrganizations = (req: Request, res: Response) => {
    const searchStr: string =  req.query.q;
    const pageSize: number = req.query.pageSize;

    organizationOrchestrator
        .findOrganization(searchStr, pageSize)
        .subscribe( organizations => {
            res.status(200);
            res.send(JSON.stringify(organizations));
        });
};

export let sendJoinRequest = (req: Request, res: Response) => {

    const request: string = req.body.request;
    const sessionId: string = req.cookies["sessionId"];
    if (!request) {
        return res.status(400).send({
            message: "A join request to an organization must be sent"
        });
    }

    organizationOrchestrator
        .sendJoinRequest(request, sessionId)
        .subscribe( valid => {
            if (valid) {
                res.status(200);
                res.send(JSON.stringify(true));
            } else {
                res.status(404);
                res.send(JSON.stringify('error'));
            };
        });
};

export  let getOrganizations = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

  organizationOrchestrator
    .getOrganizations(number, size, field, direction)
    .subscribe(result => {
        res.status(200);
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export  let getOrganization = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  const sessionId = req.cookies["sessionId"];
  organizationOrchestrator
    .getOrganization(partyId, sessionId)
    .subscribe(organization => {
        if (organization) {
            res.status(200);
            res.send(JSON.stringify(organization));
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

export  let saveOrganization = (req: Request, res: Response) => {
  const organization = req.body.organization;
  const sessionId = req.cookies["sessionId"];
  const type = req.body.type;
    if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
  organizationOrchestrator
    .saveOrganization(organization, sessionId, type)
    .subscribe(organization => {
        res.status(201);
        res.send(JSON.stringify(organization));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export let updateOrganization = (req: Request, res: Response) => {
  const partyId = req.params.partyId;
  const organization = req.body;
    if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
  organizationOrchestrator
    .updateOrganization(partyId, organization)
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

export let deleteOrganization = (req: Request, res: Response) => {
    const partyId = req.params.partyId;

    organizationOrchestrator
        .deleteOrganization(partyId)
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
