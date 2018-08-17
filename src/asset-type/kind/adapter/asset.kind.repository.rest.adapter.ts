import { AssetKindRepository } from "../asset.kind.repository";
import { Observable } from "rxjs/Observable";
import { AssetKind } from "../asset.kind";

export class AssetKindRepositoryRestAdapter implements AssetKindRepository {
    getAssetKinds(): Observable<AssetKind[]> {
        return undefined;
    }

    getAssetKindById(assetKindId: string): Observable<AssetKind> {
        return undefined;
    }

}
