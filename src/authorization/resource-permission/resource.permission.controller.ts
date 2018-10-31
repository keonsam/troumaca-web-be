import {Request, Response} from "express";
import {ResourcePermissionOrchestrator} from "./resource.permission.orchestrator";
// import {getNumericValueOrDefault} from '../../number.util';
// import {getStringValueOrDefault} from '../../string.util';

const orchestrator: ResourcePermissionOrchestrator = new ResourcePermissionOrchestrator();

export let getAllResourcePermissions = (req: Request, res: Response) => {
  orchestrator
    .getAllResourcePermissions()
    .subscribe(response => {
      res.status(200);
      res.send(JSON.stringify(response));
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));

    });
};

export let getResourcePermissionsByResourceId = (req: Request, res: Response) => {
  const resourceId = req.params.resourceId;
  orchestrator
    .getResourcePermissionsByResourceId(resourceId)
    .subscribe(response => {
      if (response.length > 0) {
        res.status(200);
        res.send(JSON.stringify(response));
      } else {
        res.status(404);
        res.send(JSON.stringify({message: "No Data Found For " + req.params.resourceId}));
      }
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
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
