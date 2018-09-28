import { Request, Response } from "express";
import { OrganizationProfileOrchestrator } from "./organization.profile.orchestrator";
import { shapeOrganizationResponse2 } from "../organization.profile.response.shaper";

const organizationProfileOrchestrator: OrganizationProfileOrchestrator = new OrganizationProfileOrchestrator();

export let findOrganization = (req: Request, res: Response) => {
  const searchStr: string =  req.query.q;
  const pageSize: number = req.query.pageSize;

  // organizationProfileOrchestrator.findOrganization(searchStr, pageSize)
  //   .map(value => {
  //     return shapeOrganizationResponse2("organizations", value); // TODO: change to new method
  //   }).subscribe(organizations => {
  //   const body = JSON.stringify(organizations);
  //   res.send(body);
  // }, error => {
  //   res.send(JSON.stringify(error));
  // });

};
