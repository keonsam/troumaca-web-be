import { AssetKindRepository } from "../../repository/asset.kind.repository";
import { Observable } from "rxjs/Observable";
import { AssetKind } from "../../data/asset/asset.kind";

export class AssetKindRepositoryRestAdapter implements AssetKindRepository {
    getAssetKinds(): Observable<AssetKind[]> {
        return undefined;
    }

    getAssetKindById(assetKindId: string): Observable<AssetKind> {
        return undefined;
    }

}
