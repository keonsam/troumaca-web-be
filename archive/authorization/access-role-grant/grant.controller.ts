import {Request, Response} from "express";
import {GrantOrchestrator} from "./grant.orchestrator";
import {getNumericValueOrDefault} from "../../number.util";
import {getStringValueOrDefault} from "../../string.util";

const orchestrator: GrantOrchestrator = new GrantOrchestrator();


// export let getGrantsByAccessRoleId = (req: Request, res: Response) => {
//   let accessRoleId = req.params.accessRoleId;
//   orchestrator
//     .getGrantsByAccessRoleId(accessRoleId)
//     .subscribe(response => {
//       res.send(JSON.stringify(response));
//     });
// };

// export let getGrantsByArray = (req: Request, res: Response) => {
//
//   let number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   let size = getNumericValueOrDefault(req.query.pageSize, 10);
//   let field = getStringValueOrDefault(req.query.sortField, "");
//   let direction = getStringValueOrDefault(req.query.sortOrder, "");
//   let assignedArray = req.body.assignedArray;
//
//   orchestrator.getGrantsByArray(number, size, field, direction, assignedArray)
//     .subscribe(result => {
//       res.send(JSON.stringify(result.data));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
//
// };
//
// export let getResourceGrantsByArray = (req: Request, res: Response) => {
//
//   let number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   let size = getNumericValueOrDefault(req.query.pageSize, 10);
//   let field = getStringValueOrDefault(req.query.sortField, "");
//   let direction = getStringValueOrDefault(req.query.sortOrder, "");
//   let assignedArray = req.body.assignedArray;
//
//   orchestrator.getResourceGrantsByArray(number, size, field, direction, assignedArray)
//     .subscribe(result => {
//       res.send(JSON.stringify(result.data));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
//
// };
//
// export let getGrants = (req: Request, res: Response) => {
//   let number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   let size = getNumericValueOrDefault(req.query.pageSize, 10);
//   let field = getStringValueOrDefault(req.query.sortField, "");
//   let direction = getStringValueOrDefault(req.query.sortOrder, "");
//
//   orchestrator
//     .getGrants(number, size, field, direction)
//     .subscribe(grants => {
//       res.send(JSON.stringify(grants.data));
//     });
// };
//
// export let getGrantById = (req: Request, res: Response) => {
//   let grantId = req.params.grantId;
//   orchestrator
//     .getGrantById(grantId)
//     .subscribe(grant => {
//       let body = JSON.stringify(grant);
//       res.send(body);
//     });
// };
//
// export let saveGrant = (req: Request, res: Response) => {
//   orchestrator.addGrant(req.body)
//     .subscribe(grant => {
//       res.send(JSON.stringify(grant));
//     }, error => {
//       res.send(error);
//       console.log(error);
//     });
// }
//
// export let updateGrant = (req: Request, res: Response) => {
//   let grantId = req.params.grantId;
//   let grant = req.body;
//   orchestrator
//     .updateGrant(grantId, grant)
//     .subscribe(grant => {
//       res.send(JSON.stringify(grant));
//     });
//
// };
//
// export let deleteGrant = (req: Request, res: Response) => {
//   let grantId = req.params.grantId;
//   orchestrator
//     .deleteGrant(grantId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     });
// };

