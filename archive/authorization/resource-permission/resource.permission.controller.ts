import {Request, Response} from "express";
import {ResourcePermissionOrchestrator} from "./resource.permission.orchestrator";
// import {getNumericValueOrDefault} from '../../number.util';
// import {getStringValueOrDefault} from '../../string.util';

const orchestrator: ResourcePermissionOrchestrator = new ResourcePermissionOrchestrator();

// export let getAllResourcePermissions = (req: Request, res: Response) => {
//   orchestrator
//     .getAllResourcePermissions()
//     .subscribe(response => {
//       res.status(200);
//       res.send(JSON.stringify(response));
//     }, error => {
//       res.status(500);
//       res.send(JSON.stringify({message: "Error Occurred"}));
//
//     });
// };
