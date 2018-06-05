import {Request, Response} from "express";
import {ResourcePermissionOrchestrator} from "./resource.permission.orchestrator";
//import {getNumericValueOrDefault} from '../../number.util';
//import {getStringValueOrDefault} from '../../string.util';

let orchestrator:ResourcePermissionOrchestrator = new ResourcePermissionOrchestrator();

export  let getAllResourcePermissions = (req: Request, res: Response) => {
  orchestrator
    .getAllResourcePermissions()
    .subscribe(response => {
      res.send(JSON.stringify(response));
    });
};

export let  getResourcePermissionsByResourceId = (req: Request, res: Response) => {
  let resourceId = req.params.resourceId;
  orchestrator
    .getResourcePermissionsByResourceId(resourceId)
    .subscribe(response => {
      res.send(JSON.stringify(response));
    });
};
// export let getResourcePermissions = (req: Request, res: Response) => {
//   let number = getNumericValueOrDefault(req.query.pageNumber, 1);
//   let size = getNumericValueOrDefault(req.query.pageSize, 10);
//   let field = getStringValueOrDefault(req.query.sortField, "");
//   let direction = getStringValueOrDefault(req.query.sortOrder, "");
//
//   orchestrator
//     .getResourcePermissions(number, size, field, direction)
//     .subscribe(resourcePermissions => {
//       res.send(JSON.stringify(resourcePermissions.data));
//     });
// };
//
// export let getResourcePermissionById = (req: Request, res: Response) => {
//   let resourcePermissionId = req.params.resourcePermissionId;
//   orchestrator
//     .getResourcePermissionById(resourcePermissionId)
//     .subscribe(resourcePermission => {
//       let body = JSON.stringify(resourcePermission);
//       res.send(body);
//     });
// };
//
// export let saveResourcePermission = (req: Request, res: Response) => {
//   let resourcePermission = req.body.resourcePermission;
//   let resourcePermissionPermissions = req.body.resourcePermissionPermission;
//   orchestrator.addResourcePermission(resourcePermission, resourcePermissionPermissions)
//     .subscribe(resourcePermission => {
//       res.send(JSON.stringify(resourcePermission));
//     }, error => {
//       res.send(error);
//       console.log(error);
//     });
// }
//
// export let updateResourcePermission = (req: Request, res: Response) => {
//   let resourcePermissionId = req.params.resourcePermissionId;
//   let resourcePermission = req.body;
//   orchestrator
//     .updateResourcePermission(resourcePermissionId, resourcePermission)
//     .subscribe(resourcePermission => {
//       res.send(JSON.stringify(resourcePermission));
//     });
//
// };
//
// export let deleteResourcePermission = (req: Request, res: Response) => {
//   let resourcePermissionId = req.params.resourcePermissionId;
//   orchestrator
//     .deleteResourcePermission(resourcePermissionId)
//     .subscribe(numRemoved => {
//       res.send(JSON.stringify(numRemoved));
//     });
// };
