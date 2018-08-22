import { createAssetKindRepository } from "./asset.kind.repository.factory";
import { AssetKindRepository } from "./asset.kind.repository";
import { Observable } from "rxjs";
import { AssetKind } from "./asset.kind";

export class AssetOrchestrator {

  private assetKindRepository: AssetKindRepository;

  constructor() {
    this.assetKindRepository = createAssetKindRepository();
  }

  getAssetKinds(): Observable<AssetKind[]> {
    return this.assetKindRepository.getAssetKinds();
  }


}