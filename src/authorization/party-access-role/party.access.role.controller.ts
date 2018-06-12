import {Request, Response} from "express";
import {PartyAccessRoleOrchestrator} from "./party.access.role.orchestrator";
//import {getNumericValueOrDefault} from '../../number.util';
//import {getStringValueOrDefault} from '../../string.util';

let orchestrator:PartyAccessRoleOrchestrator = new PartyAccessRoleOrchestrator();

// export let findPartyAccessRoles = (req: Request, res: Response) => {
//   let searchStr:string =  req.query.q;
//   let pageSize:number = req.query.pageSize;
//
//   orchestrator.findPartyAccessRoles(searchStr, pageSize)
//     .subscribe( partyAccessRoles => {
//       res.send(JSON.stringify(partyAccessRoles));
//     }, error => {
//     res.status(400);
//     res.send(error);
//     console.log(error);
//   });
// };
//

// export let getPartyAccessRoles = (req: Request, res: Response) => {
//   orchestrator
//     .getPartyAccessRoles()
//     .subscribe(partyAccessRoles => {
//       res.send(JSON.stringify(partyAccessRoles));
//     });
// };
//
// export let getPartyAccessRoleById = (req: Request, res: Response) => {
//   let partyId = req.params.partyId;
//   orchestrator
//     .getPartyAccessRoleById(partyId)
//     .subscribe(partyAccessRoles => {
//       let body = JSON.stringify(partyAccessRoles);
//       res.send(body);
//     });
// };

// export let savePartyAccessRole = (req: Request, res: Response) => {
//   let partyAccessRole = req.body.partyAccessRole;
//   let grants = req.body.grant
//   orchestrator.addPartyAccessRole(partyAccessRole, grants)
//     .subscribe(partyAccessRole => {
//       res.send(JSON.stringify(partyAccessRole));
//     }, error => {
//       res.send(error);
//       console.log(error);
//     });
// }

// export let updatePartyAccessRole = (req: Request, res: Response) => {
//   let partyAccessRoleId = req.params.partyAccessRoleId;
//   let partyAccessRole = req.body.partyAccessRole;
//   let grants = req.body.grant
//   orchestrator
//     .updatePartyAccessRole(partyAccessRoleId, partyAccessRole, grants)
//     .subscribe(partyAccessRole => {
//       res.send(JSON.stringify(partyAccessRole));
//     });
//
// };
//
// export let deletePartyAccessRole = (req: Request, res: Response) => {
//   let partyAccessRoleId = req.params.partyAccessRoleId;
//   orchestrator
//     .deletePartyAccessRole(partyAccessRoleId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     });
// };

