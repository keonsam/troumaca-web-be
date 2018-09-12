import { createAssetKindRepository } from "../../adapter/asset/asset.kind.repository.factory";
import { AssetKindRepository } from "../../repository/asset.kind.repository";
import { Observable } from "rxjs/Observable";
import { AssetKind } from "../../data/asset/asset.kind";
import { RepositoryKind } from "../../repository.kind";

export class AssetOrchestrator {

  private assetKindRepository: AssetKindRepository;

  constructor() {
    this.assetKindRepository = createAssetKindRepository();
  }

  getAssetKinds(): Observable<AssetKind[]> {
    return this.assetKindRepository.getAssetKinds();
  }


}