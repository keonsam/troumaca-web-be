import {Request, Response} from "express";
import {AssetOrchestrator} from "./asset.kind.orchestrator";
import {shapeAssetKindResponse2} from "./asset.kind.response.shaper";

const assetOrchestrator: AssetOrchestrator = new AssetOrchestrator();

export let getAssetKinds = (req: Request, res: Response) => {
  assetOrchestrator.getAssetKinds()
    .subscribe(assetKinds => {
      const body = JSON.stringify(shapeAssetKindResponse2("assetKinds", assetKinds));
      res.status(200);
      res.send(body);
    }, error => {
      res.status(500);
      res.send(JSON.stringify({message: "Error Occurred"}));
      console.log(error);
    });
};
