import { Page } from "../page/page";
import { AssetNameType } from "./asset.name.type";

export class AssetNameTypes {
    constructor(assetNameTypes: AssetNameType[], page: Page) {
        this.assetNameTypes = assetNameTypes;
        this.page = page;
    }

    assetNameTypes: AssetNameType[] = [];
    page: Page;
}
