import { createAssetKindRepository } from "../../adapter/asset/asset.kind.repository.factory";
import { AssetKindRepository } from "../../repository/asset.kind.repository";
import { AssetKind } from "../../data/asset/asset.kind";
import { Observable } from "rxjs";

export class AssetOrchestrator {

  private assetKindRepository: AssetKindRepository;

  constructor() {
    this.assetKindRepository = createAssetKindRepository();
  }

  getAssetKinds(): Observable<AssetKind[]> {
    return this.assetKindRepository.getAssetKinds();
  }


}