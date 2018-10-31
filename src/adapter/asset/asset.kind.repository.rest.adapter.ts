import {AssetKindRepository} from "../../repository/asset.kind.repository";
import {AssetKind} from "../../data/asset/asset.kind";
import {Observable} from "rxjs";

export class AssetKindRepositoryRestAdapter implements AssetKindRepository {
  getAssetKinds(): Observable<AssetKind[]> {
    return undefined;
  }

  getAssetKindById(assetKindId: string): Observable<AssetKind> {
    return undefined;
  }

}
