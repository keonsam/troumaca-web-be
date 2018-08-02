import { Request, Response } from "express";
import { ValueOrchestrator } from "./value.orchestrator";

const valueOrchestrator: ValueOrchestrator = new ValueOrchestrator();

// export let getValuesByAssetTypeId = (req: Request, res: Response) => {
//     valueOrchestrator.getValuesByAssetTypeId(req.params.assetTypeId)
//         .subscribe(result => {
//             res.send(JSON.stringify(result.data));
//         }, error => {
//             res.status(400);
//             res.send(error);
//             console.log(error);
//         });
// };
//
// export let saveValue = (req: Request, res: Response) => {
//   valueOrchestrator.saveValue(req.body)
//     .subscribe(assets => {
//       res.send(JSON.stringify(assets));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
// };
//
// export let updateValue = (req: Request, res: Response) => {
//   valueOrchestrator.updateValue(req.params.assetTypeId, req.body)
//     .subscribe(affected => {
//       res.send(JSON.stringify(affected));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
// };
//
// export let deleteValue = (req: Request, res: Response) => {
//   valueOrchestrator.deleteValue(req.params.valueId)
//     .subscribe(affected => {
//       res.send(JSON.stringify(affected));
//     }, error => {
//       res.status(400);
//       res.send(error);
//       console.log(error);
//     });
// };
