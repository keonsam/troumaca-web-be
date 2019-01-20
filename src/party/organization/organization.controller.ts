import {Request, Response} from "express";
import {OrganizationOrchestrator} from "./organization.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";
import {Organization} from "../../data/party/organization";
import {HeaderNormalizer} from "../../header.normalizer";

const organizationOrchestrator: OrganizationOrchestrator = new OrganizationOrchestrator();

export let findOrganizations = (req: Request, res: Response) => {
  const searchStr: string = req.query.q;
  const pageSize: number = req.query.pageSize;

    res.setHeader("content-type", "application/json");
    organizationOrchestrator
        .findOrganization(searchStr, pageSize)
        .subscribe( organizations => {
            res.status(200);
            res.send(JSON.stringify(organizations));
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let getOrganizations = (req: Request, res: Response) => {
  const number = getNumericValueOrDefault(req.query.pageNumber, 1);
  const size = getNumericValueOrDefault(req.query.pageSize, 10);
  const field = getStringValueOrDefault(req.query.sortField, "");
  const direction = getStringValueOrDefault(req.query.sortOrder, "");

    res.setHeader("content-type", "application/json");
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
    res.setHeader("content-type", "application/json");
    organizationOrchestrator
    .getOrganization(partyId)
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

export  let getOrganizationCompany = (req: Request, res: Response) => {
    HeaderNormalizer.normalize(req);
    const correlationId = req.headers["Correlation-Id"];
    const ownerPartyId = req.headers["Owner-Party-Id"];
    const requestingPartyId = req.headers["Party-Id"];

    const headerOptions = {
        "Correlation-Id": correlationId,
        "Owner-Party-Id": ownerPartyId,
        "Party-Id": requestingPartyId
    };

    res.setHeader("content-type", "application/json");
    organizationOrchestrator
        .getOrganizationCompany(requestingPartyId)
        .subscribe(organizationCompany => {
            if (organizationCompany) {
                res.status(200);
                res.send(JSON.stringify(organizationCompany));
            } else {
                res.status(404);
                res.send(JSON.stringify({message: "No Data Found For "}));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export  let saveOrganization = (req: Request, res: Response) => {
  const organization: Organization = req.body;
    if (!organization || !organization.name || !organization.purpose) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "'Organization' must be sent, and must contain name and purpose."}));
        return;
    }
    res.setHeader("content-type", "application/json");
    organizationOrchestrator
    .saveOrganization(organization)
    .subscribe(organization => {
        res.status(201);
        res.send(JSON.stringify(organization));
    }, error => {
        res.status(500);
        res.send(JSON.stringify({message: "Error Occurred"}));
        console.log(error);
    });
};

export  let addCustomer = (req: Request, res: Response) => {
  HeaderNormalizer.normalize(req);

  const organization: Organization = req.body;
  organization.partyId = req.headers["Party-Id"];

  if (!organization || !organization.name) {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify({message: "'Organization' must be sent, and must contain name and purpose."}));
    return;
  }

  const reqCorrelationId = req.headers["Correlation-Id"];
  const reqPartyId = req.headers["Party-Id"];

  const headerOptions = {
    "Correlation-Id": reqCorrelationId,
    "Party-Id": reqPartyId
  };

  organizationOrchestrator.addCustomer(organization, headerOptions)
    .subscribe(org => {
      res.status(201);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify(org));
    }, error => {
      res.status(500);
      res.setHeader("content-type", "application/json");
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};

export  let saveOrganizationCompany = (req: Request, res: Response) => {
    const organization: Organization = req.body;

    if (!organization || !organization.name || !organization.purpose) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({message: "'Organization' must be sent, and must contain name and purpose."}));
        return;
    }

    organization.partyId = res.locals.partyId;

    organizationOrchestrator
        .saveOrganizationCompany(organization)
        .subscribe(organizationRes => {
            res.status(201);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify(organizationRes));
        }, error => {
            res.status(500);
            res.setHeader("content-type", "application/json");
            res.send(JSON.stringify({message: "Error Occurred"}));
            console.log(error);
        });
};

export let saveAccessRequest = (req: Request, res: Response) => {

    const request = req.body;

    if (!request || !request.organizationId) {
        res.status(400);
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify({
            message: "'Access Request' must exist and contains organizationId"
        }));
        return;
    }

    request.partyId = res.locals.partyId;

    organizationOrchestrator
        .saveAccessRequest(request)
        .subscribe( accessRequest => {
            if (accessRequest) {
                res.status(201);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify(accessRequest));
            } else {
                res.status(404);
                res.setHeader("content-type", "application/json");
                res.send(JSON.stringify("Error"));
            }
        }, error => {
            res.status(500);
            res.send(JSON.stringify({message: "Internal Server Error"}));
            console.log(error);
        });
};

export let updateOrganization = (req: Request, res: Response) => {
    const partyId = req.params.partyId;
    const organization = req.body;
    res.setHeader("content-type", "application/json");
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

export let updateOrganizationCompany = (req: Request, res: Response) => {
    const organization = req.body;
    res.setHeader("content-type", "application/json");
    if (!organization) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }
    organizationOrchestrator
        .updateOrganization(res.locals.partyId, organization)
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
    res.setHeader("content-type", "application/json");

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
