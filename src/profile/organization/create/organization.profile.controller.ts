import { Request, Response } from "express";
import { OrganizationProfileOrchestrator } from "./organization.profile.orchestrator";
// import { shapeOrganizationResponse2 } from "../organization.profile.response.shaper";

const organizationProfileOrchestrator: OrganizationProfileOrchestrator = new OrganizationProfileOrchestrator();

export let createProfileOrganization = (req: Request, res: Response) => {
  const organizationProfile = req.body;
  const headers = req.headers;
  const correlationId = headers.correlationid;

  let options = {
    correlationId: correlationId
  };

  organizationProfileOrchestrator.createProfileOrganization(organizationProfile, options)
  .map(value => {
    // TODO: change to new method
    // shapeOrganizationResponse2("organizations", value);
    return value
  }).subscribe(org => {
    const body = JSON.stringify(org);
    res.setHeader("content-type", "application/json");
    res.status(200);
    res.send(body);

  }, error => {
    console.log("Error: " + JSON.stringify(error));

    let status = 500;
    if (error.code) { status = error.code; }
    if (error.status) { status = error.status; }

    res.setHeader("content-type", "application/json");
    res.status(status);
    res.send(JSON.stringify(error));
  });

};

export let createProfilePhoto = (req: Request, res: Response) => {
  let organizationProfile = req.body;

  let options = {
    correlationId:req.headers.correlationId
  };

  organizationProfileOrchestrator.createProfilePhoto(organizationProfile, options)
  .map(value => {
      // shapeOrganizationResponse2("organizations", value); // TODO: change to new method
      return null
  }).subscribe(organizations => {
    const body = JSON.stringify(organizations);
    res.status(200);
    res.send(body);
  }, error => {
    res.send(JSON.stringify(error));
  });

};


export let createProfile = (req: Request, res: Response) => {

  let organizationProfile = req.body;

  organizationProfileOrchestrator.createProfile(organizationProfile)
    .map(value => {
      // shapeOrganizationResponse2("organizations", value); // TODO: change to new method
      return null
    }).subscribe(organizations => {
      const body = JSON.stringify(organizations);
      res.send(body);
    }, error => {
      res.send(JSON.stringify(error));
    });

};
