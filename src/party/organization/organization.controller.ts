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
    .subscribe(organizations => {
      res.send(JSON.stringify(organizations.data));
    });
};

export  let getOrganization = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  organizationOrchestrator
    .getOrganization(partyId)
    .subscribe(organization => {
      let body = JSON.stringify(organization);
      res.send(body);
    }, error => {
      res.send(JSON.stringify(error));
    });
};

export  let saveOrganization = (req: Request, res: Response) => {
  let organization = req.body;
  organizationOrchestrator
    .saveOrganization(organization)
    .subscribe(organization => {
      res.send(JSON.stringify(organization));
    });
};

export let deleteOrganization = (req: Request, res: Response) => {
  let partyId = req.params.partyId;

  organizationOrchestrator
    .deleteOrganization(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    });
};

export let updateOrganization = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let organization = req.body;
  organizationOrchestrator
    .updateOrganization(partyId, organization)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    });
};
