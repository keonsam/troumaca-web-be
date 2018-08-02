import Rx from "rxjs";
import { generateUUID } from "../../uuid.generator";
import { calcSkip } from "../../db.util";
import { assets } from "../../db";
import { Asset } from "./asset";
import { Observer } from "rxjs/Observer";
import { AssetRepository } from "./asset.repository";
import { Observable } from "rxjs/Observable";
import { RepositoryKind } from "../../repository.kind";



/**
 * Database Repository
 */
class AssetDBRepository {

}

/**
 * Rest Repository
 */
class AssetRestRepository {


}

// export function createAssetRepository(kind:RepositoryKind):AssetRepository {
//   switch (kind) {
//     case RepositoryKind.Nedb:
//       return new AssetDBRepository();
//     case RepositoryKind.Rest:
//       return new AssetRestRepository();
//     default:
//       return new AssetDBRepository();
//   }
// }