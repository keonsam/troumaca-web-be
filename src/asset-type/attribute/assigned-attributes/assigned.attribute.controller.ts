import {Request, Response} from "express";
import {AssignedAttributeOrchestrator} from "./assigned.attribute.orchestrator";

const orchestrator: AssignedAttributeOrchestrator = new AssignedAttributeOrchestrator();

export let getAssignedAttributesByClassId = (req: Request, res: Response) => {
  const assetTypeClassId = req.params.assetTypeClassId;

  orchestrator.getAssignedAttributesByClassId(assetTypeClassId)
    .subscribe(assignedAttributes => {
      res.status(200);
      res.send(JSON.stringify(assignedAttributes));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};
